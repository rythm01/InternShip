import styled from "styled-components";

const SwitchButton = styled.div`
  width: 208.5px;
  height: 65px;
  border-radius: 50px;

  display: flex;
  justify-content; center;
  align-items; center;

  background: ${(props) => (props.active ? "#00A652" : "")};

  font-family: "TT Commons";
  font-size: 24px;
  color: ${(props) => (props.active ? "#fff" : "#00A652")};

  cursor: pointer;

  transition: all 0.15s;

  @media (max-width: 600px){
    height: 50px;
  }

  
`;

export default SwitchButton;
