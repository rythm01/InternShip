import styled from "styled-components";

const Container = styled.div`
  position: relative;
  display: flex;
  justify-self: center;
  flex-direction: column;
  justify-content: ${(props) => props.justifyContent ?? "center"};
  align-items: ${(props) => props.alignItems ?? "center"};
  width: ${(props) => props.width};
  height: ${(props) => props.height};

  background: ${(props) => props.background ?? "#ffffff"};
  border-radius: ${(props) => props.borderRadius ?? "10px"};

  margin: ${(props) => props.margin ?? "0"};
  padding: ${(props) => props.padding ?? "0"};
  flex-shrink: 0;

  @media (max-width: 1200px) {
    padding: 70px;
    width: -webkit-fill-available;
  }
  @media (max-width: 900px) {
    padding: 70px 50px;
    margin: 50px;
  }
  @media (max-width: 600px) {
    margin: 0;
    padding: 20px 20px;
    min-height: 70vh;
  }
`;

export default Container;
