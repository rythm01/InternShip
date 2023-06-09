import styled from "styled-components"

const PlanName = styled.div`
  width: 135px;
  height: 45px;

  background: ${props => props.color ?? "#FBBC05"};
  border-radius: 22.5px;

  display: flex;
  justify-content: center;
  align-items: center;

  color: #fff;
  font-family: "TT Commons";
  font-weight: 700;
  font-size: 20px;

  margin: 24px;
`

export default PlanName
