import styled from "styled-components"

const TableBodyRow = styled.tr`
  text-align: left;
  font-size: 16px;
  font-weight: 400;
  font-family: "TT Commons";
  color: #000000;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  border:  ${props => props.share && "1px solid #00A652"};
  &:hover {
    cursor:pointer
    }
  td {
    padding:${props => props.shared ? "8px" : '18px'};
  }
`

export default TableBodyRow
