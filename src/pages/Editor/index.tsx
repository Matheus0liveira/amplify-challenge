import { withAuthenticator } from "@aws-amplify/ui-react";
import { Button, InputRow } from "aws-amplify-react";
import { ChangeEvent, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";

import * as S from "./styles";

type Thumbnail = {
  filename: string;
  file: File;
  fileUrl: string;
};

function Editor() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState<Thumbnail>({} as Thumbnail);

  const navigate = useNavigate();

  function handleContentChange(text: string) {
    setContent(text);
  }
  function handleTitleChange(e: ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value);
  }
  function handleThumbnailChange(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files?.length) return;
    const file = e.target.files[0];
    setThumbnail({
      file,
      filename: file.name,
      fileUrl: URL.createObjectURL(file),
    });
  }

  function handlePostCreation() {}
  function handleGoToHome() {
    navigate("/");
  }

  return (
    <S.Container>
      <S.ButtonContainer>
        <Button onClick={handleGoToHome}>Voltar aos posts</Button>
        <Button onClick={handlePostCreation}>Salvar post</Button>
      </S.ButtonContainer>
      {!!thumbnail.fileUrl && (
        <img src={thumbnail.fileUrl} alt={`Capa - ${thumbnail.filename}`} />
      )}
      <InputRow
        placeholder="Capa"
        value={title}
        onChange={handleThumbnailChange}
        type="file"
      />
      <InputRow
        placeholder="Título"
        value={title}
        onChange={handleTitleChange}
      />
      <ReactQuill theme="snow" value={content} onChange={handleContentChange} />
    </S.Container>
  );
}

export default withAuthenticator(Editor, { socialProviders: ["google"] });
