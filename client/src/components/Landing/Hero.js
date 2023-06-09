import styled from "styled-components";

import { homeImg } from "../../assets/images";

const Hero = styled.div`
  width: 1016px;
  height: 723px;
  z-index: 50;
  background: url(${homeImg});
  background-position: center center;
  border: 17px solid #ffffff;
  filter: drop-shadow(0px 4px 25px rgba(133, 133, 133, 0.18));
  border-radius: 15px;
  margin: 0 100px 100px;
  background-size: contain;
  background-repeat: no-repeat;

  @media (max-width: 1200px) {
    width: 600px;
    height: 440px;
  }

  @media (max-width: 800px) {
    width: 500px;
    height: 360px;
    margin: 0 50px 50px;
    border-radius: 12px;
    border: 14px solid #ffffff;
  }

  @media (max-width: 600px) {
    width: 300px;
    height: 220px;
    margin: 0 20px 50px;
    border-radius: 10px;
    border: 10px solid #ffffff;
  }

  @media (max-width: 400px) {
    width: 275px;
    height: 200px;
    border-radius: 10px;
    border: 10px solid #ffffff;
  }
`;

export default Hero;
