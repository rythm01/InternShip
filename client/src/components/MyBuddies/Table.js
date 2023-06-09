import styled from "styled-components";

const Table = styled.table`
  background: #fff;
  border-radius: ${(props) =>
    props.borderRadius ? props.borderRadius : "10px"};
  border-collapse: collapse;
  overflow: visible;
  width: 100%;
`;

export default Table;
