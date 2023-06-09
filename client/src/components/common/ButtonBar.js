import styled from "styled-components";

const ButtonBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin: 10px auto;
  @media (max-width: 900px) {
    margin: 20px auto;
  }
  @media (max-width: 600px) {
    width: 100%;
    & img {
      margin-right: 10px;
    }
  }
`;

export default ButtonBar;
