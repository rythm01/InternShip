import styled from "styled-components";

const Title = styled.p`
  width: ${(props) => props.width};
  font-family: "TT Commons";
  font-style: normal;
  font-weight: ${(props) => props.fontWeight ?? "600"};
  line-height: ${(props) => props.lineHeight ?? "auto"};
  font-size: ${(props) => props.fontSize ?? "32px"};
  text-align: ${(props) => props.textAlign ?? "center"};
  color: "#00000";
  margin: ${(props) => props.margin ?? "0"};
  display: ${(props) => props.display};
  @media (max-width: 1200px) {
    font-size: ${(props) => props.fontSize ?? "28px"};
    margin: ${(props) => props.margin ?? "0"};
  }
  @media (max-width: 900px) {
    font-size: 23px;
  }
  @media (max-width: 600px) {
    font-size: 18px;
    white-space: ${(props) => props.whiteSpace ?? "nowrap"};
  }
`;

export default Title;
