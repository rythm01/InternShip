import styled from "styled-components";

const Button = styled.button`
  width: ${(props) => props.width ?? "254px"};
  height: ${(props) => props.height ?? "60px"};
  background: ${(props) => props.color};
  border-radius: ${(props) => props.borderRadius ?? "5px"};
  ${(props) => props.border && "border: 1px solid #000000;"}

  display: flex;
  justify-content: center;
  align-items: center;

  color: ${(props) => props.textColor ?? "#ffffff"};
  border: 1px solid rgba(0, 0, 0, 0.05);

  font-family: "TT Commons";
  font-size: 18px;
  font-weight: 600;

  margin: ${(props) => props.margin ?? "8px"};

  cursor: pointer;

  @media (max-width: 1200px) {
    width: 180px;
    height: 50px;
    font-size: 17px;
  }
  @media (max-width: 900px) {
    width: 160px;
    height: 45px;
    font-size: 15px;
  }
  @media (max-width: 600px) {
    width: 120px;
    height: 40px;
    font-size: 12px;
  }
  @media (max-width: 400px) {
    width: 100px;
    height: 37px;
    font-size: 11px;
  }
`;

export default Button;
