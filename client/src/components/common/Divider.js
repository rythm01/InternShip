import styled from "styled-components";

const Divider = styled.h1`
  font-family: "TT Commons";
  font-style: normal;
  font-weight: ${(props) => (props.bold ? 600 : 400)};
  font-size: 16px;
  line-height: 26px;
  text-align: center;
  max-width: 500px;
  color: ${(props) => props.color ?? "rgba(0, 0, 0, 0.5)"};
  margin: 0 auto;
  position: relative;
  /* &:before {
    content: "";
    display: block;
    width: 120px;
    height: 2px;
    background: #000;
    position: absolute;
    left: 0;
    top: 50%;
  }
  &:after {
    content: "";
    display: block;
    width: 120px;
    height: 2px;
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    right: 0;
    top: 50%;
  } */
  @media (max-width: 900px) {
    font-size: 12px;
    line-height: 20px;
  }
  @media (max-width: 900px) {
    text-align: center;
    margin: 0;
  }
`;

export default Divider;
