import { API, graphqlOperation, Storage } from "aws-amplify";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPost } from "../../graphql/queries";
import * as S from "./styles";
import DOMPurify from "dompurify";
import { Button } from "aws-amplify-react";
const sanitize = DOMPurify.sanitize;

export default function Post() {
  const [post, setPost] = useState<any>({ content: "", thumbnailUrl: "" });
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const { data } = (await API.graphql(
          graphqlOperation(getPost, { id: params.id })
        )) as any;
        const thumbnail = await Storage.get(data.getPost.thumbnailKey);
        setPost({ ...data.getPost, thumbnailUrl: thumbnail });
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
      <img src={post.thumbnailUrl} alt="" />
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: sanitize(post?.content) }}></div>
    </S.Container>
  );
}
