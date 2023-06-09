import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const BackContainer = styled.div`
  width: 64px;
  height: 55px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 40px;
  left: 40px;
  background: #ffffff;
  box-shadow: 0px 20px 50px rgba(0, 0, 0, 0.12);
  border-radius: 15px;
  cursor: pointer;

  @media (max-width: 900px) {
    width: 54px;
    height: 45px;
    top: 35px;
    left: 35px;
  }
  @media (max-width: 500px) {
    width: 44px;
    height: 43px;
    top: 30px;
    left: 30px;
  }
`;

export default function Back({ onClick }) {
  const navigate = useNavigate();

  return (
    <BackContainer onClick={() => (onClick ? onClick() : navigate(-1))}>
      {/* <MdKeyboardBackspace /> */}
      <svg
        width={25}
        height={25}
        viewBox="0 0 25 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.07 6.43005L4 12.5001L10.07 18.5701M21 12.5001H4.17"
          stroke="#00A652"
          strokeWidth="1.5"
          strokeMiterlimit={10}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </BackContainer>
  );
}
