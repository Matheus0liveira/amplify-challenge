import { Storage } from "aws-amplify";
import { useEffect, useState } from "react";

type AwsS3ImageProps = {
  awsKey: string;
  alt?: string;
};

export default function AwsS3Image({ awsKey, alt }: AwsS3ImageProps) {
  const [url, setUrl] = useState("");

  useEffect(() => {
    (async () => setUrl(await Storage.get(awsKey)))();
  }, [awsKey]);

  return <img src={url || ""} alt={alt} />;
}
