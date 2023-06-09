import styled from "styled-components";

const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => props.justifyContent};
  height: ${(props) => props.height ?? "100%"};
  /* overflow: ${(props) => props.overflow ?? "auto"}; */
  /* flex-basis: ${(props) => props.width}; */
  width: ${(props) => props.width ?? "0"};
  flex-grow: 0;
  flex-shrink: 0;
  padding: ${(props) => props.padding ?? "0"};
  margin: ${(props) => props.margin ?? "0"};
  box-sizing: border-box;
  overflow-y: scroll;
  ${(props) =>
    props.hideScrollBar ? "::-webkit-scrollbar {display: none;}" : ""};
  @media (max-width: 1400px) {
    width: 75%;
    margin: 0 auto;
  }
  @media (max-width: 1100px) {
    width: 70%;
  }
  @media (max-width: 800px) {
    width: 73%;
  }
  @media (max-width: 600px) {
    width: 90%;
    margin: 0 10px;
  }
  @media (max-width: 400px) {
  }
`;

export default Column;
