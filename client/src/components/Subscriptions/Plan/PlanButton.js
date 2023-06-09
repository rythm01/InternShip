import styled from "styled-components"

const PlanButton = styled.button`
  outline: none;
  width: 190px;
  height: 57px;

  margin-bottom: 18px;

  border: 1px solid #000000;
  border-radius: 10px;

  display: flex;
  justify-content: center;
  align-items: center;

  font-family: "TT Commons";
  font-size: 16px;
  color:  ${props => props.color ? '#fff' : '#000000'};
  background: ${props => props.background ? '#00A652' : '#fff'};
  border: ${props => props.border ? 'none' : '1px solid #000000'};
  cursor: pointer;
  transition: 0.1s;

  :hover {
    border: none;
    background: #00A652;
    color: #fff;

  }
`

export default PlanButton
