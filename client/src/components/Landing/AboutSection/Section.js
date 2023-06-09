import styled from "styled-components";

const Section = styled.section`
  position: relative;
  width: -webkit-fill-available;
  min-height: 683px;
  height: 100%;
  box-sizing: border-box;
  padding: 82px 80px;

  background: #ffffff;

  overflow: hidden;
  display: flex;
  .left_area {
    width: 40%;
  }
  .right_area {
    width: 60%;
  }

  @media (max-width: 1200px) {
    flex-direction: column;
    .left_area {
      width: 100%;
    }
    .right_area {
      width: 100%;
      height: 500px;
    }
  }
  @media (max-width: 1100px) {
    .right_area {
      height: 400px;
    }
  }
  @media (max-width: 850px) {
    .right_area {
      height: 300px;
    }
  }
  @media (max-width: 800px) {
    padding: 50px;
  }
  @media (max-width: 600px) {
    .right_area {
      height: 100%;
      display: none;
    }
  }
  @media (max-width: 500px) {
    padding: 50px 30px;
  }
`;

export default Section;
