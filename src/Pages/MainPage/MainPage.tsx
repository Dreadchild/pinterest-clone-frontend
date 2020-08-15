import React from "react";
import GridLayout from "../../Layout/GridLayout/GridLayout";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { useHistory } from "react-router-dom";

import "./MainPage.css";

const MainPage: React.FC = () => {
  const history = useHistory();

  return (
    <div className="MainPage">
      <GridLayout />
      <BsFillPlusCircleFill
        id="addPin"
        onClick={() => {
          history.push("/create-pin");
        }}
      />
    </div>
  );
};

export default MainPage;
