import styled from "styled-components"

const UploadButton = styled.label`
  width: ${props => props.width ?? "66px"};
  height: ${props => props.height ?? "66px"};
  object-fit: scale-down;
  border-radius: 50%;
  margin: 0 auto;
  background: #00a652;
  position: absolute;
  top: 100px;
  left: 132px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`

export default UploadButton
