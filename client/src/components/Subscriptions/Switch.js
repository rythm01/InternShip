import styled from "styled-components";

const Switch = styled.div`
  width: 421px;
  height: 50px;
  flex-grow: 0;
  flex-shrink: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 50px;
  background: #00a6520d;
  margin: 0 0 30px 0;

  @media (max-width: 600px) {
    max-width: 250px;
    height: 50px;
  }
`;

export default Switch;
