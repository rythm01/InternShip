import styled from "styled-components";

const Container = styled.div`
  box-sizing: border-box;
  padding: 10px;
  width: 180px;
  height: 56px;
  margin: auto 0 auto 10px;

  background: #ffffff;
  border-radius: 5px;

  display: flex;
  justify-content: flex-start;
  align-items: center;

  cursor: pointer;

  @media (max-width: 500px) {
    width: 120px;
  }
`;

export default Container;
