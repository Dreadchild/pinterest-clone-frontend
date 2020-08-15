import { gql } from "@apollo/client";

export const LOAD_PINS_QUERY = gql`
  query latestPins {
    latestPins {
      imageUrl
      title
      description
    }
  }
`;

export const LOAD_MY_PINS_QUERY = gql`
  query myPins($userId: String!) {
    myPins(userId: $userId) {
      title
      imageUrl
    }
  }
`;

export const LOAD_SAVED_PINS_QUERY = gql`
  query getSavedPins($googleId: String!) {
    getSavedPins(googleId: $googleId) {
      imageUrl
    }
  }
`;
