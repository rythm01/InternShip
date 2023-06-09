import styled from "styled-components";

const Section = styled.section`
  position: relative;
  box-sizing: border-box;
  text-align: start;
  width: 100%;
  height: fit-content;
  background: #fff;
  padding: 80px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  .mt-15 {
    margin-top: 15px;
  }
  @media (max-width: 800px) {
    padding: 0;
    ul li {
      font-size: 12px;
    }
    .mt-15 {
      margin-top: 10px;
    }
  }
`;

export default Section;
