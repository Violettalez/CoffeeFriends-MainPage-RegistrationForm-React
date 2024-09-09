import React from "react";
import shortLogo from "../../shortLogo.svg";
import shortLogoLight from "../../shortLogoLight.png";
import styled, { keyframes } from "styled-components";
import { rotateInDownLeft } from "react-animations";
import { rotateInDownRight } from "react-animations";
import { rotateInUpLeft } from "react-animations";

const rInDownRight = keyframes`${rotateInDownRight}`;
const rInDownLeft = keyframes`${rotateInDownLeft}`;
const rInUpLeft = keyframes`${rotateInUpLeft}`;

const RotateCircleInDownLeft = styled.div`
  animation: 1s ${rInDownLeft};
`;
const RotateCircleInUpLeft = styled.div`
  animation: 4s ${rInUpLeft};
`;
const RotateCircleInDownRight = styled.div`
  animation: 2s ${rInDownRight};
`;

interface MainPartProps {
  darkMode: boolean;
}

const buttonClick = () => {
  window.location.href = '/createProfilePage';
};

const MainPart: React.FC<MainPartProps> = ({ darkMode }) => {
  return (
    <main>
      <RotateCircleInDownLeft className="circle1"></RotateCircleInDownLeft>
      <RotateCircleInUpLeft className="circle2"></RotateCircleInUpLeft>
      <RotateCircleInDownRight className="circle3"></RotateCircleInDownRight>
      <RotateCircleInUpLeft className="circle4"></RotateCircleInUpLeft>
      <div className="entry">
        <img
          className="shortLogo"
          src={darkMode ? shortLogoLight : shortLogo}
          alt="shortLogo"
          draggable="false"
        />
        <button className="createProfileButton" onClick={buttonClick}>Створити профіль</button>
      </div>
    </main>
  );
};

export default MainPart;
