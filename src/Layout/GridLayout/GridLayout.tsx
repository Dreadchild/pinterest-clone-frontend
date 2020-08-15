import React, { useEffect, useState } from "react";
import { ImagesContainer, Col, SavePin } from "../../Components/MainPage";
import { BsCheck } from "react-icons/bs";
import { useQuery, useMutation, gql } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { SaveMutation } from "../../GraphQL/Mutations";
import { LOAD_PINS_QUERY, LOAD_SAVED_PINS_QUERY } from "../../GraphQL/Queries";
const { Image } = require("cloudinary-react");

const GridLayout: React.FC = () => {
  //Apollo Hooks
  const [savePin, { error }] = useMutation(SaveMutation);

  const { loading, data } = useQuery(LOAD_PINS_QUERY);
  const { loading: loadingSavedPin, data: dataSavedPin } = useQuery(
    LOAD_SAVED_PINS_QUERY,
    {
      variables: { googleId: sessionStorage.getItem("googleId") },
    }
  );

  const [loadedPins, setLoadedPins] = useState<string[]>([]);
  const [savedPins, setSavedPins] = useState<string[]>([]);

  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  let history = useHistory();

  useEffect(() => {
    if (!loading) {
      data.latestPins.map((val: number, key: number) => {
        setLoadedPins((loadedPins) => [
          ...loadedPins,
          data.latestPins[key].imageUrl as string,
        ]);
      });
    }
  }, [data]);

  useEffect(() => {
    if (!loadingSavedPin) {
      dataSavedPin.getSavedPins.map((val: number, key: number) => {
        setSavedPins((savedPins) => [
          ...savedPins,
          dataSavedPin.getSavedPins[key].imageUrl as string,
        ]);
      });
    }
  }, [dataSavedPin]);

  useEffect(() => {
    if (sessionStorage.getItem("loggedIn") === "true") {
      setLoggedIn(true);
    }
  }, []);

  const handleSavePin = async (imageUrl: string) => {
    if (error) {
      console.log(error.message);
    } else {
      await savePin({
        variables: {
          googleId: sessionStorage.getItem("googleId"),
          imageUrl: imageUrl,
        },
      });
      setSavedPins([...savedPins, imageUrl]);
    }
  };

  return (
    <ImagesContainer>
      {loadedPins.map((image: string, key: number) => {
        return (
          <Col key={key}>
            {loggedIn &&
              (!savedPins.includes(image) ? (
                <SavePin
                  onClick={() => {
                    handleSavePin(image);
                  }}
                >
                  Save
                </SavePin>
              ) : (
                <SavePin>
                  <BsCheck style={{ fontSize: 25 }}></BsCheck>
                </SavePin>
              ))}
            <Image
              cloudName={process.env.REACT_APP_CLOUD_NAME}
              publicId={image}
              onClick={() => {
                history.push(`/pin/${image}`);
              }}
            />
          </Col>
        );
      })}
      <Col>
        <img src="https://i.pinimg.com/474x/a6/26/20/a626209354c24c243a825c1d8f4be33b.jpg" />
      </Col>
      <Col>
        <img src="https://i.pinimg.com/474x/9f/c7/5c/9fc75c8b289d5630179d3bfa5f404a49.jpg" />
      </Col>
      <Col>
        <img src="https://i.pinimg.com/474x/45/68/86/456886e30ae298eb359aa837a6ca6c16.jpg" />
      </Col>
      <Col>
        <img src="https://i.pinimg.com/474x/45/68/86/456886e30ae298eb359aa837a6ca6c16.jpg" />
      </Col>
      <Col>
        <img src="https://i.pinimg.com/474x/db/a1/66/dba166619e3e15fba205fa9ceebea237.jpg" />
      </Col>
      <Col>
        <img src="https://i.pinimg.com/474x/ee/46/af/ee46af846ce854fc212a89af82e96d71.jpg" />
      </Col>
      <Col>
        <img src="https://i.pinimg.com/474x/f4/65/6c/f4656c06f4212849307832fc8faf8968.jpg" />
      </Col>
      <Col>
        <img src="https://i.pinimg.com/474x/64/49/20/64492016780b6a0839ad4a544330591a.jpg" />
      </Col>
      <Col>
        <img src="https://i.pinimg.com/474x/7b/0b/b4/7b0bb439aef933c87f446fb1cbb71212.jpg" />
      </Col>
      <Col>
        <img src="https://i.pinimg.com/474x/98/78/9f/98789f8e3eff1fb0a7b8b4e1de4c561f.jpg" />
      </Col>
    </ImagesContainer>
  );
};

export default GridLayout;
