import styled from "styled-components";

const IconButton = styled.div`
  width: 64px;
  height: 56px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  margin: 10px 5px;
  background-color: ${(props) =>
    props.backgroundColor ? props.backgroundColor : ""};

  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  @media (max-width: 1000px) {
    width: 60px;
    height: 60px;
  }
  @media (max-width: 800px) {
    width: 50px;
    height: 50px;
  }
  @media (max-width: 600px) {
    width: 40px;
    height: 40px;
  }
  @media (max-width: 400px) {
    width: 35px;
    height: 35px;
  }
`;

export default IconButton;
