import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import { InvalidURLError } from "../../Components/Error";
import { Container, Pin, PinInfo, PinImage } from "../../Components/PinPage";
import { ButtonMedium } from "../../Components/Button";
const { Image } = require("cloudinary-react");

const LOAD_PIN_QUERY = gql`
  query getPinByImageURL($imageUrl: String!) {
    getPinByImageURL(imageUrl: $imageUrl) {
      title
      description
      link
    }
  }
`;

const PinPage: React.FC = () => {
  let { id } = useParams();
  let history = useHistory();
  const [errorLoading, setErrorLoading] = useState<Boolean>(false);
  const [pinTitle, setPinTitle] = useState<string>("");
  const [pinDescription, setPinDescription] = useState<string>("");
  const [pinLink, setPinLink] = useState<string>("");

  const { loading, error, data } = useQuery(LOAD_PIN_QUERY, {
    variables: { imageUrl: id },
  });

  //QUERY BY IMAGE URL
  useEffect(() => {
    if (!loading) {
      let pin = data.getPinByImageURL[0];
      setPinTitle(pin.title);
      setPinDescription(pin.description);
      setPinLink(pin.link);
    }
  }, [data]);

  return (
    <Container>
      <Pin>
        <PinImage>
          {!errorLoading ? (
            <Image
              cloudName={process.env.REACT_APP_CLOUD_NAME}
              publicId={id}
              onError={() => {
                setErrorLoading(true);
              }}
            />
          ) : (
            <InvalidURLError>Error Loading Image / Invalid URL</InvalidURLError>
          )}
        </PinImage>
        <PinInfo>
          <h1>{pinTitle}</h1>
          <p>{pinDescription}</p>
          {pinLink != "" ? (
            <ButtonMedium
              style={{ marginTop: 20 }}
              onClick={() => {
                window.location.href = pinLink;
              }}
            >
              {" "}
              Visit {pinLink.substring(0, 25)}
            </ButtonMedium>
          ) : (
            <ButtonMedium
              onClick={() => {
                history.push("/");
              }}
            >
              Return To Main Page
            </ButtonMedium>
          )}
        </PinInfo>
      </Pin>
    </Container>
  );
};

export default PinPage;
