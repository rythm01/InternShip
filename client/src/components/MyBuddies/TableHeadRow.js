import styled from "styled-components";

const TableHeadRow = styled.tr`
  text-align: left;
  font-size: 16px;
  font-weight: 400;
  font-family: "TT Commons";
  color: #00000080;
  border-bottom: ${(props) =>
    props.hideBottomBorder ? "none" : "1px solid rgba(0, 0, 0, 0.05)"};
  th,
  td {
    padding: 18px;
  }

  @media (max-width: 500px) {
    th,
    td {
      padding: 10px 15px;
    }
  }
`;

export default TableHeadRow;
