import styled from "styled-components"

const PlanFeatures = styled.ul`
  width: ${props => props.width};
  height: ${props => props.height};
  list-style: none;
  padding: 0;
  margin-bottom: 2px;

  display: flex;
  flex-direction: column;
  align-items: start;

  overflow: auto;
`

export default PlanFeatures
