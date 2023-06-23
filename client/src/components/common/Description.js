import styled from "styled-components";

const Description = styled.p`
  width: ${(props) => props.width};
  font-family: "TT Commons";
  font-style: normal;
  font-weight: ${(props) => props.fontWeight ?? "600"};
  line-height: ${(props) => props.lineHeight ?? "auto"};
  font-size: ${(props) => props.fontSize ?? "25px"};
  text-align: ${(props) => props.textAlign ?? "center"};
  color: "#00000";
  margin: ${(props) => props.margin ?? "0"};
  display: ${(props) => props.display};
  overflow-wrap: break-word; /* Updated to use overflow-wrap for text wrapping */

  @media (max-width: 1200px) {
    width: 80%; /* Set a responsive width for screens up to 1200px */
    font-size: ${(props) => props.fontSize ?? "20px"};
    margin: ${(props) => props.margin ?? "0"};
  }

  @media (max-width: 900px) {
    width: 90%; /* Set a responsive width for screens up to 900px */
    font-size: 18px;
  }

  @media (max-width: 600px) {
    width: 200px; /* Set a responsive width for screens up to 600px */
    font-size: 16px;
    white-space: ${(props) => props.whiteSpace ?? "wrap"};
  }
`;

export default Description;


