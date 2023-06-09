import React from 'react'
import CheckCircle from '../../assets/images/CheckCircle.svg'
import { Button } from '../../components/common'
import { useNavigate } from 'react-router-dom'

function Success() {
  const navigate = useNavigate();

  return (
    <div style={{ width: '100vw', height: "100vh", display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ width: '165.5px', height: '165.5px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img style={{ width: '100%', height: "100%", objectFit: 'cover', objectPosition: 'center' }} src={CheckCircle} />
      </div>
      <h1 style={{ fontFamily: 'TT Commons', fontWeight: 700, fontSize: '36px', lineHeight: '42px' }}>Success!</h1>
      <p style={{ fontFamily: 'TT Commons', fontWeight: 700, fontSize: '20px', lineHeight: '42px' }}>Your payment was successful.</p>
      <Button color="#00A652" onClick={() => navigate('/home')} width='190px'>
        Homepage
      </Button>
    </div>
  )
}

export default Success