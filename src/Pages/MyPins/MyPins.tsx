import React, { useEffect, useState } from "react";
import { ImagesContainer, Col, DeletePin } from "../../Components/MainPage";
import { BsFillTrashFill } from "react-icons/bs";
import { useQuery, useMutation, gql } from "@apollo/client";
import { LOAD_MY_PINS_QUERY } from "../../GraphQL/Queries";
import { SaveMutation, DeleteMutation } from "../../GraphQL/Mutations";
import { useHistory } from "react-router-dom";
const { Image } = require("cloudinary-react");

const MyPins: React.FC = () => {
  //Apollo Hooks
  const [deletePin] = useMutation(DeleteMutation);

  const { loading, error, data } = useQuery(LOAD_MY_PINS_QUERY, {
    variables: { userId: sessionStorage.getItem("googleId") },
  });

  const [loadedPins, setLoadedPins] = useState<string[]>([]);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  let history = useHistory();

  useEffect(() => {
    if (sessionStorage.getItem("loggedIn") === "true") {
      setLoggedIn(true);
    } else {
      history.push("/login");
    }
  }, []);

  useEffect(() => {
    if (!loading) {
      data.myPins.map((val: number, key: number) => {
        setLoadedPins((loadedPins) => [
          ...loadedPins,
          data.myPins[key].imageUrl as string,
        ]);
      });
    }
  }, [data]);

  const handleDeletePin = async (imageUrl: string) => {
    await deletePin({
      variables: {
        imageUrl: imageUrl,
      },
    });
    const indexOfElem = await loadedPins.indexOf(imageUrl);
    setLoadedPins(loadedPins.splice(indexOfElem, 1));
  };
  return (
    <ImagesContainer>
      {loadedPins.map((image, key) => {
        return (
          <Col>
            <DeletePin
              onClick={() => {
                handleDeletePin(image);
              }}
            >
              <BsFillTrashFill style={{ fontSize: 17 }}></BsFillTrashFill>
            </DeletePin>
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

export default MyPins;
