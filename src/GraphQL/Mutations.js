import { gql } from "@apollo/client";

export const CreateUserMutation = gql`
  mutation createUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $googleId: String!
  ) {
    createUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      googleId: $googleId
    ) {
      id
      firstName
    }
  }
`;

export const CreatePinMutation = gql`
  mutation createPin(
    $imageUrl: String!
    $title: String!
    $description: String!
    $link: String!
    $userId: String!
  ) {
    createPin(
      imageUrl: $imageUrl
      title: $title
      description: $description
      link: $link
      userId: $userId
    ) {
      id
    }
  }
`;

export const SaveMutation = gql`
  mutation savePin($googleId: String!, $imageUrl: String!) {
    savePin(googleId: $googleId, imageUrl: $imageUrl) {
      id
    }
  }
`;

export const DeleteMutation = gql`
  mutation deletePin($imageUrl: String!) {
    deletePin(imageUrl: $imageUrl) {
      id
    }
  }
`;
