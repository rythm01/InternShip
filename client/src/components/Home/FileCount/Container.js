import styled from "styled-components"

const Container = styled.div`
  width: 202px;
  height: 118px;

  background: ${props => props.color ?? "#DFF9EC"};
  border-radius: 10px;

  display: flex;
  flex-direction: column;
  align-items: start;
  box-sizing: border-box;
  padding: 20px;
  margin: 12px 0 12px 0;

  box-sizing: border-box;

  position: relative;
`

export default Container
