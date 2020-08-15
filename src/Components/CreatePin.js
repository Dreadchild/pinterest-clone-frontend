import styled, { keyframes } from "styled-components";

const medium = 800;

const spinAnimation = keyframes`
from {
  transform: rotate(0deg);
}
to {
  transform: rotate(360deg);
}
`;

export const Container = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 70px;
  padding-bottom: 105px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #efefef;

  #loadingArrow {
    font-size: 100px;
    color: #1e82ed;
    animation: ${spinAnimation} 2s linear infinite;
  }
`;

export const Form = styled.div`
  width: 800px;
  height: 600px;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0.5px 0.5px 10px rgba(50, 50, 50, 0.3);
  display: flex;
  flex-direction: row;

  @media (max-width: ${medium}px) {
    width: 500px;
  }
`;

export const FormInputs = styled.div`
  flex: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & input:not(#uploadInput) {
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    outline: none;
    display: block;
    width: 70%;
    padding: 7px;
    border: none;
    border-bottom: 1px solid #ddd;
    background: transparent;
    margin-bottom: 10px;
    font: 20px Arial, Helvetica, sans-serif;
    height: 65px;
  }

  & input:not(#uploadInput):focus {
    border-bottom: 2px solid #1e82ed;
    -webkit-transition: all 0.7s ease;
    -moz-transition: all 0.7s ease;
    -o-transition: all 0.7s ease;
    -ms-transition: all 0.7s ease;
    transition: all 0.7s ease;
  }

  & #uploadInput {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }

  & #uploadInput + label {
    width: 70%;
    height: 40px;
    border: none;
    text-align: center;
    padding-top: 20px;
    margin-top: 20px;
    border-radius: 10px;
    border 3px solid #1e82ed;
    background-color: transparent;
    color: #1e82ed;
    font-size: 20px;
  }

  & #uploadInput:focus + label,
  #uploadInput + label:hover {
    background-color: #1e82ed;
    cursor: pointer;
    color: #ffffff;
    -webkit-transition: all 0.3s ease;
    -moz-transition: all 0.3s ease;
    -o-transition: all 0.3s ease;
    -ms-transition: all 0.3s ease;
    transition: all 0.3s ease;

  }
`;

export const InvalidInput = styled.div`
  -webkit-transition: all 0.3s ease;
  -moz-transition: all 0.3s ease;
  -o-transition: all 0.3s ease;
  -ms-transition: all 0.3s ease;
  transition: all 0.3s ease;
  background-color: #ff4336;
  width: 70%;
  border-radius: 10px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  color: #ffffff;
`;
