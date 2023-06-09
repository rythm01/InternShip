import styled from "styled-components";

const Row = styled.div`
  display: flex;
  flex-direction: ${(props) => props.flexDirection ?? "row"};
  justify-content: ${(props) => props.justifyContent};
  align-items: ${(props) => props.alignItems};
  height: ${(props) => props.height};
  padding: ${(props) => props.padding};
  width: ${(props) => props.width};
  margin: ${(props) => props.margin};
  gap: ${(props) => props.gap};
  ${(props) => props.link && "cursor:pointer;"}

  @media (max-width:400px) {
    width: 245px;
  }
`;

export default Row;
