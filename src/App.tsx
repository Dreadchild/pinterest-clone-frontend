import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";

//Components Imports
import Header from "./Layout/Header/Header";
import Login from "./Pages/Login/Login";
import MainPage from "./Pages/MainPage/MainPage";
import CreatePin from "./Pages/CreatePin/CreatePin";
import PinPage from "./Pages/PinPage/PinPage";
import MyPins from "./Pages/MyPins/MyPins";
import SavedPins from "./Pages/SavedPins/SavedPins";

function App() {
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.map(({ message, locations, path }) =>
        alert(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      );

    if (networkError) alert(`[Network error]: ${networkError}`);
  });

  const link = from([
    errorLink,
    new HttpLink({ uri: "https://mpinterestclone.herokuapp.com/graphql" }),
  ]);

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: link,
  });

  return (
    <ApolloProvider client={client}>
      <Header />
      <Router>
        <Route path="/" exact render={(props) => <MainPage />} />
        <Route path="/login" render={(props) => <Login />} />
        <Route path="/create-pin" render={(props) => <CreatePin />} />
        <Route path="/pin/:id" render={(props) => <PinPage />} />
        <Route path="/mypins" render={(props) => <MyPins />} />
        <Route path="/savedpins" render={(props) => <SavedPins />} />
      </Router>
    </ApolloProvider>
  );
}

export default App;
