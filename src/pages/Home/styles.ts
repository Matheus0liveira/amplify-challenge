import styled from "styled-components";

export const Container = styled.div`
  width: 80%;
  margin: 1rem 10%;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;

  margin-bottom: 1rem;
`;

export const BlogTitle = styled.h2``;

export const PostsContainer = styled.div`
  display: grid;
  justify-content: center;
  margin: 2rem 0;
  grid-template-columns: repeat(auto-fill, minmax(25rem, 1fr));
`;

export const Post = styled.div`
  margin-bottom: 0.5rem;

  img {
    width: 25rem;
    max-height: 12rem;
    margin-right: 2rem;
    object-fit: cover;

    border-radius: 6px;
  }

  h4 {
    font-size: 1rem;
  }

  cursor: pointer;
`;

export const HighlightPost = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 5%;
  padding-bottom: 10rem;
  border-bottom: 0.1rem solid #fff;

  img {
    width: 30rem;
    margin-right: 2rem;

    border-radius: 6px;
  }

  h2 {
    font-size: 3rem;
  }

  cursor: pointer;
`;
