import styled from "styled-components";

const Image = styled.img`
  width: ${(props) => props.width ?? "320px"};
  height: ${(props) => props.height};
  object-fit: ${(props) => props.objectFit ?? "contain"};
  margin: ${(props) => props.margin ?? "5px"};
  border-radius: ${(props) => props.borderRadius};

  @media (max-width: 1200px) {
    width: 300px;
  }
  @media (max-width: 900px) {
    width: 270px;
  }
  @media (max-width: 600px) {
    width: 250px;
  }
  @media (max-width: 400px) {
    width: 220px;
  }
`;

export default Image;
