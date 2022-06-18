import { API, graphqlOperation } from "aws-amplify";
import { useEffect, useState } from "react";
import { getBlog } from "../../graphql/queries";
import { GraphQLResult } from "@aws-amplify/api-graphql";

import * as S from "./styles";
import { GetBlogQuery } from "../../API";
import { Button } from "aws-amplify-react";
import { useNavigate } from "react-router-dom";
import AwsS3Image from "../../components/AwsS3Image";

export default function Home() {
  const [blog, setBlog] = useState<GetBlogQuery["getBlog"]>();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const { data } = (await API.graphql(
        graphqlOperation(getBlog, { id: process.env.REACT_APP_BLOG_ID })
      )) as GraphQLResult<GetBlogQuery>;

      setBlog(data?.getBlog);
    })();
  }, []);

  function handleGoToHome() {
    navigate("/");
  }
  function handleGoToPostCreation() {
    navigate("/new-post");
  }
  function handleGoToPostById(id: string) {
    navigate(`/post/${id}`);
  }

  const [firstPost, ...posts] = blog?.Posts?.items || [];
  return (
    <S.Container>
      {" "}
      <S.ButtonContainer>
        <Button onClick={handleGoToHome}>Voltar aos posts</Button>
        <Button onClick={handleGoToPostCreation}>Criar post</Button>
      </S.ButtonContainer>
      <S.BlogTitle>{blog?.name}</S.BlogTitle>
      <S.HighlightPost onClick={() => handleGoToPostById(firstPost.id)}>
        <AwsS3Image
          awsKey={firstPost?.thumbnailKey || ""}
          alt={`Capa do post ${firstPost?.title}`}
        />

        <div>
          <h2>{firstPost?.title}</h2>
          <span>{firstPost?.authorName}</span>
        </div>
      </S.HighlightPost>
      <S.PostsContainer>
        {posts.map((post) => (
          <S.Post
            key={`Home-Post-${post?.id}`}
            onClick={() => handleGoToPostById(post.id)}
          >
            <AwsS3Image
              awsKey={post.thumbnailKey || ""}
              alt={`Capa do post ${post.title}`}
            />

            <h4>{post?.title}</h4>
            <span>{post?.authorName}</span>
          </S.Post>
        ))}
      </S.PostsContainer>
    </S.Container>
  );
}
