import React, { useState, useEffect } from "react";
import Logo from "./Images/MLogo.png";
import "./Header.css";

import { ButtonSmall } from "../../Components/Button";

const Header: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState<Boolean>(
    sessionStorage.getItem("loggedIn") === "true"
  );

  useEffect(() => {
    setLoggedIn(sessionStorage.getItem("loggedIn") === "true");
  });

  return (
    <div className="Header">
      <div className="leftSide">
        <a href="/">
          <img src={Logo} />
        </a>
      </div>
      <div className="center">
        {loggedIn === true && (
          <>
            <a href="/mypins" style={{ marginLeft: 30 }}>
              <h1>My Pins</h1>
            </a>

            <a href="/savedpins" style={{ marginLeft: 30 }}>
              <h1>Saved Pins</h1>
            </a>
          </>
        )}
      </div>
      <div className="rightSide">
        <div id="profilePicture">
          {loggedIn === true ? (
            <img src={sessionStorage.getItem("imageUrl") as string} />
          ) : (
            <a href="/login">
              <ButtonSmall>Login</ButtonSmall>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
