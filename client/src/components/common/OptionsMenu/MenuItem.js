import styled from "styled-components"

const MenuItem = styled.div`
  width: ${props => props.width};
  height: 100%;

  padding: 10px;

  font-family: "TT Commons";
  font-size: 14px;
  text-align: left;
  color: #000;

  :hover {
    background: #ebebeb6b;
  }
`

export default MenuItem
