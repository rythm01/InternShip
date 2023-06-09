import styled from "styled-components";

const PlanFeature = styled.li`
  width: 100%;
  font-family: "TT Commons";
  font-weight: 500;
  font-size: ${(props) => props.fontSize ?? "16px"};
  opacity: ${(props) => (props.active ? "1" : "0.3")};
  margin: 0;
  margin-bottom: 4px;

  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export default PlanFeature;
