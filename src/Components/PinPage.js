import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 70px;
  padding-bottom: 105px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #efefef;
`;

export const Pin = styled.div`
  width: 800px;
  height: auto;
  border-radius: 20px;
  background-color: #ffffff;
  box-shadow: 0.5px 0.5px 10px rgba(50, 50, 50, 0.3);
  display: flex;
  flex-direction: row;
  align-items: center;

  @media (max-width: 800px) {
    flex-direction: column;
    height: 700px;
    width: 600px;
  }
`;

export const PinImage = styled.div`
  height: auto;
  border-radius: 5px;
  flex: 50%;
  img,
  #images {
    width: 100%;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }
`;

export const PinInfo = styled.div`
  flex: 50%;
  height: 350px;
  border-radius: 5px;
  margin-left: 30px;
  width: 100%;
  border-radius: 10px;

  & h1 {
    text-align: flex-start;
  }

  @media (max-width: 800px) {
    margin-right: 0;
    text-align: center;
  }
`;
