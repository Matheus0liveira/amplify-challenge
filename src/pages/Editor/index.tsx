import { InputRow } from "aws-amplify-react";
import { ChangeEvent, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import * as S from "./styles";

export default function Editor() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  function handleContentChange(text: string) {
    setContent(text);
  }
  function handleTitleChange(e: ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value);
  }

  return (
    <S.Container>
      <InputRow
        placeholder="Título"
        value={title}
        onChange={handleTitleChange}
      />
      <ReactQuill theme="snow" value={content} onChange={handleContentChange} />
    </S.Container>
  );
}
