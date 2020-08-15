import styled from "styled-components";

//ScreenSizes
const large = 1200;
const mediumm = 900;
const small = 600;

export const ImagesContainer = styled.section`
  max-width: 100vw;
  height: auto;
  margin: 40px;
  column-count: 6;

  @media (max-width: ${large}px) {
    column-count: 4;
  }

  @media (max-width: ${mediumm}px) {
    column-count: 3;
  }

  @media (max-width: ${small}px) {
    column-count: 1;
  }
`;

export const Col = styled.div`
  height: auto;
  border-radius: 5px;
  margin-bottom: 10px;
  break-inside: avoid-column;
  overflow: hidden;
  img,
  #images {
    width: 100%;
    border-radius: 10px;
  }

  &:hover {
    -webkit-filter: brightness(70%);
    -webkit-transition: all 1s ease;
    -moz-transition: all 1s ease;
    -o-transition: all 1s ease;
    -ms-transition: all 1s ease;
    transition: all 1s ease;
    cursor: zoom-in;
  }

  &:hover button {
    display: block;
  }
`;

export const SavePin = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 15px;
  background-color: #1e82ed;
  color: #ffffff;
  width: 60px;
  height: 35px;
  border: none;
  border-radius: 15px;
  display: none;

  &:hover {
    cursor: pointer;
  }
`;
