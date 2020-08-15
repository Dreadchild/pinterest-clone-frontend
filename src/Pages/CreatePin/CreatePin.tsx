import React, { useState } from "react";
import {
  Container,
  Form,
  FormInputs,
  InvalidInput,
} from "../../Components/CreatePin";
import { BsArrowRepeat } from "react-icons/bs";
import { useHistory } from "react-router-dom";

import { ButtonSmall } from "../../Components/Button";
import { CreatePinMutation } from "../../GraphQL/Mutations";

import axios from "axios";
import { useMutation, gql } from "@apollo/client";

const CreatePin: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageName, setSelectedImageName] = useState(null);

  //Input Validation
  const [titleError, setTitleError] = useState<string>("");
  const [descriptionError, setDescriptionError] = useState<string>("");
  const [invalidLinkError, setInvalidLinkError] = useState<string>("");
  const [imageUrlError, setImageUrlError] = useState<string>("");

  //Apollo Hooks
  const [createPin, { error }] = useMutation(CreatePinMutation);

  //LoadingAnimation
  const [loadingAnimation, setLoadingAnimation] = useState<boolean>(false);

  let history = useHistory();

  const UploadPin = async () => {
    const invalidInputs = await validateInputs();

    if (error) {
      console.log(error.message);
    } else {
      //Validate Inputs
      if (invalidInputs === 0) {
        uploadImage();
      }
    }
  };

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("file", selectedImage as any);
    formData.append(
      "upload_preset",
      process.env.REACT_APP_UPLOAD_PRESET as string
    );

    setLoadingAnimation(true);
    axios
      .post(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,
        formData
      )
      .then((response) => {
        createPin({
          variables: {
            imageUrl: response.data.public_id,
            title: title,
            description: description,
            link: link,
            userId: sessionStorage.getItem("googleId"),
          },
        });
        setLoadingAnimation(false);

        history.push(`/mypins`);
      });
  };

  const validateInputs = () => {
    var errorAmount = 0;
    if (title.length < 2) {
      setTitleError("Title must be longer than 1 character");
      errorAmount++;
    } else {
      setTitleError("");
    }

    if (description.length < 2) {
      setDescriptionError("Title must be longer than 1 character");
      errorAmount++;
    } else {
      setDescriptionError("");
    }

    if (link != "") {
      try {
        new URL(link);
        setInvalidLinkError("");
      } catch {
        setInvalidLinkError(
          "Invalid Link Format. Try adding 'http:// or https://"
        );
        errorAmount++;
      }
    }

    if (selectedImage == null) {
      setImageUrlError("No Image Was Selected");
      errorAmount++;
    } else {
      setImageUrlError("");
    }

    return errorAmount;
  };

  return (
    <Container>
      {!loadingAnimation ? (
        <Form>
          <FormInputs>
            <input
              type="text"
              placeholder="Enter A Title"
              onChange={(e: any) => {
                setTitle(e.target.value);
              }}
            />
            {titleError && <InvalidInput> {titleError}</InvalidInput>}
            <input
              type="text"
              placeholder="Describe Your Pin"
              onChange={(e: any) => {
                setDescription(e.target.value);
              }}
            />
            {descriptionError && (
              <InvalidInput> {descriptionError}</InvalidInput>
            )}
            <input
              type="text"
              placeholder="Link Your Pin (optional)"
              onChange={(e: any) => {
                setLink(e.target.value);
              }}
            />
            {invalidLinkError && (
              <InvalidInput> {invalidLinkError}</InvalidInput>
            )}
            <input
              type="file"
              id="uploadInput"
              accept="image/gif, image/jpeg, image/png"
              onChange={(e: any) => {
                setSelectedImage(e.target.files[0]);
                setSelectedImageName(e.target.files[0].name);
              }}
            />

            <label htmlFor="uploadInput">
              {selectedImageName === null ? "Upload Image" : selectedImageName}
            </label>
            {imageUrlError && <InvalidInput> {imageUrlError}</InvalidInput>}

            <ButtonSmall style={{ marginTop: 50 }} onClick={UploadPin}>
              Submit
            </ButtonSmall>
          </FormInputs>
        </Form>
      ) : (
        <>
          <BsArrowRepeat id="loadingArrow"></BsArrowRepeat>
          <h1>Uploading...</h1>
        </>
      )}
    </Container>
  );
};

export default CreatePin;
