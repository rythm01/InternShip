import { IoCheckmarkSharp } from "react-icons/io5";
import styled from "styled-components";

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  align-self: flex-start;
  margin: 9.5px 0;
  cursor: pointer;
`;

const Container = styled.div`
  box-sizing: border-box;
  width: 20px;
  height: 20px;
  padding: 2px;
  margin: 0 10px 0 6px;
  border-radius: 25%;
  background: ${(props) => (props.selected ? "#00A652" : "#fff")};
  border: ${(props) => (props.selected ? "none" : "1.5px solid #00A652")};
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 800px) {
    width: 15px;
    height: 15px;
  }
`;

const Text = styled.span`
  font-family: "TT Commons";
  font-size: 16px;
  color: black;
  margin: auto 0;
  @media (max-width: 800px) {
    font-size: 14px;
  }
`;

const CheckBox = ({ checked, onChange, text }) => (
  <Row onClick={onChange}>
    <Text>{text}</Text>
    <Container selected={checked}>
      {checked && <IoCheckmarkSharp style={{ color: "#fff" }} />}
    </Container>
  </Row>
);

export default CheckBox;
