import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import back from "../../../assets/images/arrow-left.png";



const BackContainer = styled.div`
  width: 64px;
  height: 55px;
  font-family: "TT Commons";
  font-style: normal;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  display: flex;
  align-items: center;
  justify-content: center;
  position: ${(props) => props.position ?? "absolute"};
  ${(props) =>
    props.position &&
    `
  top: 50px;
  left: 250px;
  `}
  border-radius: 10px;
  cursor: pointer;
  background: #ffffff;
  box-shadow: 0px 20px 50px rgba(0, 0, 0, 0.12);
  border-radius: 15px;
  cursor: pointer;
  font-weight: ${(props) => props.fontWeight ?? "600"};

  @media (max-width: 768px) {
    height: 40px;
    width: 40px;
  }
`;

export default function BackTransactions() {
  const navigate = useNavigate();

  return (
    <BackContainer onClick={() => navigate("/home/passwords")}>
      {/* <img height={25} src="https://icons.veryicon.com/png/o/miscellaneous/skent-icon/home-225.png" /> */}
      <img height={25} src={back} />
    </BackContainer>
  );
}
