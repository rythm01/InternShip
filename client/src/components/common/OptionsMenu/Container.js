import styled from "styled-components"

const Container = styled.button`
  outline: none;
  background: transparent;
  border: none;
  position:  ${props => props.position ? props.position : 'relative'};
  cursor: pointer;
  top: ${props => props.position ? '25px' : '0px'};
  right: ${props => props.position ? '25px' : '0px'};
  z-index:${props => props.position ? '11' : 'inherit'}
`
export default Container
