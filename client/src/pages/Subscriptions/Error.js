import React from 'react'
import XCircle from '../../assets/images/XCircle.svg'
import { Button } from '../../components/common'
import { useNavigate } from 'react-router-dom'

function Error(props) {
  const navigate = useNavigate();

  return (
    <div style={{ width: '100vw', height: "100vh", display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ width: '165.5px', height: '165.5px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img style={{ width: '100%', height: "100%", objectFit: 'cover', objectPosition: 'center' }} src={XCircle} />
      </div>
      <h1 style={{ fontFamily: 'TT Commons', fontWeight: 700, fontSize: '36px', lineHeight: '42px' }}>Ooops!</h1>
      <p style={{ fontFamily: 'TT Commons', fontWeight: 700, fontSize: '20px', lineHeight: '42px' }}>{props.paymentAlreadyDone ? `${props.paymentAlreadyDone}.` : 'Your payment has failed.'}</p>
      <Button color="#F7941D" onClick={() => props.handleError()} width='190px'>
        Try Again
      </Button>
    </div>
  )
}

export default Error