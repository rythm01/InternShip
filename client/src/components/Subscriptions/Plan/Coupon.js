import styled from "styled-components"

const Coupon = styled.input.attrs({ type: "text" })`
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  margin-bottom: 28px;
  color: #00000080;
  font-family: "TT Commons";
  font-size: 14px;
  width: 100%;
  padding-bottom: 7px;
  :focus {
    outline: none;
  }
`

export default Coupon
