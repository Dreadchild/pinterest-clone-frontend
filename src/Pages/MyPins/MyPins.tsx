import React, { useEffect, useState } from "react";
import { ImagesContainer, Col } from "../../Components/MainPage";
import { useQuery, gql } from "@apollo/client";
import { LOAD_MY_PINS_QUERY } from "../../GraphQL/Queries";
import { useHistory } from "react-router-dom";
const { Image } = require("cloudinary-react");

const MyPins: React.FC = () => {
  const { loading, error, data } = useQuery(LOAD_MY_PINS_QUERY, {
    variables: { userId: sessionStorage.getItem("googleId") },
  });

  const [loadedPins, setLoadedPins] = useState([{ imageUrl: "", title: "" }]);

  let history = useHistory();

  useEffect(() => {
    if (!loading) {
      console.log(data);
      data.myPins.map((val: number, key: number) => {
        setLoadedPins((loadedPins) => [
          ...loadedPins,
          {
            imageUrl: data.myPins[key].imageUrl,
            title: data.myPins[key].title,
          },
        ]);
      });
    }
  }, [data]);

  useEffect(() => {
    if (sessionStorage.getItem("loggedIn") != "true") {
      history.push("/login");
    }
  }, []);

  return (
    <ImagesContainer>
      {loadedPins.map((image, key) => {
        return (
          <Col>
            <Image
              key={key}
              cloudName={process.env.REACT_APP_CLOUD_NAME}
              publicId={image.imageUrl}
              onClick={() => {
                history.push(`/pin/${image.imageUrl}`);
              }}
            />
          </Col>
        );
      })}
    </ImagesContainer>
  );
};

export default MyPins;
