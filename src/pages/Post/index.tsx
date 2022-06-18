import { API, graphqlOperation, Storage } from "aws-amplify";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPost } from "../../graphql/queries";
import * as S from "./styles";
import DOMPurify from "dompurify";
import { Button } from "aws-amplify-react";
import { GraphQLResult } from "@aws-amplify/api-graphql";
import { GetPostQuery } from "../../API";

const sanitize = DOMPurify.sanitize;

export default function Post() {
  const [post, setPost] = useState<GetPostQuery["getPost"]>();
  const [thumbnailUrl, setThumbnailUrl] = useState<string>("");
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const { data } = (await API.graphql(
          graphqlOperation(getPost, { id: params.id })
        )) as GraphQLResult<GetPostQuery>;

        if (!data || !data?.getPost?.thumbnailKey) return;

        const thumbnail = await Storage.get(data?.getPost.thumbnailKey);
        setPost(data.getPost);
        setThumbnailUrl(thumbnail);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [params.id]);

  function handleGoToHome() {
    navigate("/");
  }
  function handleGoToPostCreation() {
    navigate("/new-post");
  }

  return (
    <S.Container>
      <S.ButtonContainer>
        <Button onClick={handleGoToHome}>Voltar aos posts</Button>
        <Button onClick={handleGoToPostCreation}>Criar post</Button>
      </S.ButtonContainer>
      <img src={thumbnailUrl} alt="Capa" />
      <h1>{post?.title}</h1>
      {post?.content && (
        <div
          dangerouslySetInnerHTML={{
            __html: sanitize(post?.content),
          }}
        ></div>
      )}
    </S.Container>
  );
}
