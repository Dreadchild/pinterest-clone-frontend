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

  const [loadedPins, setLoadedPins] = useState<string[]>([]);
  const [savedPins, setSavedPins] = useState<string[]>([]);

  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  const { loading: loadingSavedPin, data: dataSavedPin } = useQuery(
    LOAD_SAVED_PINS_QUERY,
    {
      variables: { googleId: sessionStorage.getItem("googleId") },
      skip: !loggedIn,
    }
  );
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
    if (!loadingSavedPin && loggedIn) {
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
    </ImagesContainer>
  );
};

export default GridLayout;
