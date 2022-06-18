import styled from "styled-components";

export const Container = styled.div`
  width: 80%;
  margin: 1rem 10%;

  .ql-toolbar.ql-snow:first-of-type {
    display: none;
  }
  .ql-editor {
    height: 80vh;
    background-color: #ffff;
  }

  img {
    max-width: 20rem;
    max-height: 20rem;
  }

  input {
    margin-bottom: 0.5rem;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;

  margin-bottom: 1rem;
`;
