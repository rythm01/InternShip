import styled from "styled-components";

const Label = styled.p`
  font-family: "TT Commons";
  font-weight: 600;
  font-size: 20px;
  line-height: 30px;
  margin: 5px 0;
  color: #000000;

  @media (max-width: 1200px) {
    font-size: 18px;
    line-height: 27px;
  }
  @media (max-width: 900px) {
    font-size: 16px;
    line-height: 24px;
  }
  @media (max-width: 600px) {
    font-size: 14px;
    line-height: 22px;
  }
`;

export default Label;
