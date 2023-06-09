import styled from "styled-components";

const Section = styled.section`
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  background: #fff;
  padding: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;

  @media (max-width: 1000px) {
    padding: 50px;
  }
  @media (max-width: 600px) {
    padding: 30px;
  }
`;

export default Section;
