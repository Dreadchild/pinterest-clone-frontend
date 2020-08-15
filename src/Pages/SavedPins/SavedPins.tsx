import React, { useEffect, useState } from "react";
import { ImagesContainer, Col } from "../../Components/MainPage";
import { useQuery } from "@apollo/client";
import { LOAD_SAVED_PINS_QUERY } from "../../GraphQL/Queries";
import { useHistory } from "react-router-dom";
const { Image } = require("cloudinary-react");

const SavedPins: React.FC = () => {
  const { loading, error, data } = useQuery(LOAD_SAVED_PINS_QUERY, {
    variables: { googleId: sessionStorage.getItem("googleId") },
  });

  const [savedPins, setSavedPins] = useState<string[]>([]);

  let history = useHistory();

  useEffect(() => {
    if (!loading) {
      data.getSavedPins.map((val: number, key: number) => {
        setSavedPins((savedPins) => [
          ...savedPins,
          data.getSavedPins[key].imageUrl as string,
        ]);
      });
    }
  }, [data]);

  return (
    <ImagesContainer>
      {savedPins.map((image, key) => {
        return (
          <Col>
            <Image
              key={key}
              cloudName={process.env.REACT_APP_CLOUD_NAME}
              publicId={image}
              onClick={() => {
                history.push(`/pin/${image}`);
              }}
            />
          </Col>
        );
      })}
    </ImagesContainer>
  );
};

export default SavedPins;
