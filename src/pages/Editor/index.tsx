import { withAuthenticator } from "@aws-amplify/ui-react";
import { API, Auth, graphqlOperation, Storage } from "aws-amplify";
import { Button, InputRow } from "aws-amplify-react";
import { ChangeEvent, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../graphql/mutations";
import { GraphQLResult } from "@aws-amplify/api-graphql";

import * as S from "./styles";
import { CreatePostMutation } from "../../API";

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
    console.log(file);
    setThumbnail({
      file,
      filename: file.name,
      fileUrl: URL.createObjectURL(file),
    });
  }

  async function handlePostCreation() {
    if (!thumbnail) return;
    try {
      const { key } = await Storage.put(thumbnail.filename, thumbnail.file);
      const user = await Auth.currentAuthenticatedUser();

      (await API.graphql(
        graphqlOperation(createPost, {
          input: {
            title,
            content,
            thumbnailKey: key,
            authorName: user.attributes.name,
            blogID: process.env.REACT_APP_BLOG_ID,
          },
        })
      )) as GraphQLResult<CreatePostMutation>;

      navigate("/posts");
    } catch (e) {
      console.log({ e });
    }
  }
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
        onChange={handleThumbnailChange}
        type="file"
        accept="image/png, image/jkpeg"
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
