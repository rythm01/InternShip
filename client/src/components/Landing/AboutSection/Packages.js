import styled from "styled-components";
import { packagesImg } from "../../../assets/images";

const Packages = styled.div`
  box-sizing: border-box;

  position: absolute;
  width: 500px;
  height: 350px;
  left: 500px;
  top: 250px;

  background: url(${packagesImg});
  background-position: center center;
  background-size: contain;
  border: 5px solid #292d32;
  border-radius: 15px;
  transform: matrix(0.98, -0.14, -0.18, 0.99, 0, 0);
  @media (max-width: 1500px) {
    width: 400px;
    height: 310px;
    left: 350px;
    top: 250px;
  }
  @media (max-width: 1400px) {
    width: 300px;
    height: 260px;
  }
  @media (max-width: 1200px) {
    width: 450px;
    height: 360px;
    left: 400px;
    top: 100px;
  }
  @media (max-width: 1100px) {
    width: 350px;
    height: 260px;
    left: 400px;
    top: 100px;
  }
  @media (max-width: 1000px) {
    left: 300px;
  }
  @media (max-width: 850px) {
    width: 250px;
    height: 190px;
  }
  @media (max-width: 750px) {
    left: 200px;
    top: 80px;
  }
`;

export default Packages;
