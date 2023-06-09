import React from 'react'
import styled from "styled-components"

const LoadingSpinner = ({height}) => {
  const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: ${height ?? '70vh'};
`

const Spinner = styled.div`
  border: 5px solid #00A652;
  border-top: 5px solid #f3f3f3;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 0.7s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`
  return (
    <Container>
      <Spinner />
    </Container>
  )
}

export default LoadingSpinner

