import styled from "styled-components";

export const Container = styled.div`
  width: 80%;
  margin: 1rem 10%;

  img {
    margin-bottom: 2rem;
    width: 100%;
    max-width: 100%;
    max-height: 400px;
    object-fit: cover;
  }
  h1 {
    margin-bottom: 1rem;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;

  margin-bottom: 1rem;
`;
