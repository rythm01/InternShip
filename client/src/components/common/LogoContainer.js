import styled from "styled-components";

const LogoContainer = styled.div`
  position: absolute;
  top: ${(props) => (props.top ? props.top : "-50px")};
  width: 110px;
  height: 110px;
  background-color: ${(props) =>
    props.backgroundColor ? props.backgroundColor : "#ffffff"};
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;

  border-style: solid;
  border-width: 14px;
  border-color: #fafafa;

  @media (max-width: 1200px) {
    width: 100px;
    height: 100px;
  }
  @media (max-width: 900px) {
    width: 90px;
    height: 90px;
    border-width: 12px;
  }
  @media (max-width: 600px) {
    width: 70px;
    height: 70px;
    border-width: 10px;
    top: ${(props) => (props.top ? props.top : "0px")};
  }

  @media (max-width: 440px) {
    width: 70px;
    height: 70px;
    border-width: 10px;
    top: ${(props) => (props.top ? props.top : "10px")};
  }
`;

export default LogoContainer;
