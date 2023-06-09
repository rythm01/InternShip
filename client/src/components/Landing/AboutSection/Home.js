import styled from "styled-components";
import { homeImg } from "../../../assets/images";

const Home = styled.div`
  position: absolute;
  width: 500px;
  height: 350px;
  left: 100px;
  top: 250px;

  background: url(${homeImg});
  background-position: center center;
  background-size: contain;
  border: 5px solid #292d32;
  border-radius: 15px;
  transform: matrix(0.97, 0.14, 0.25, 0.99, 0, 0);

  @media (max-width: 1500px) {
    width: 400px;
    height: 300px;
    left: 50px;
    top: 250px;
  }
  @media (max-width: 1400px) {
    width: 300px;
    height: 250px;
    left: 100px;
  }
  @media (max-width: 1200px) {
    width: 450px;
    height: 350px;
    left: 50px;
    top: 100px;
  }
  @media (max-width: 1100px) {
    width: 350px;
    height: 250px;
    left: 150px;
    top: 100px;
  }
  @media (max-width: 1000px) {
    left: 50px;
  }
  @media (max-width: 850px) {
    width: 250px;
    height: 180px;
    left: 150px;
    top: 100px;
  }
  @media (max-width: 750px) {
    left: 50px;
    top: 80px;
  }
`;

export default Home;
