import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { authContext } from '../context/ContextAPI';

function Header() {

  const nav=useNavigate()

  const {authContextStatus , setAuthContextStatus} = useContext(authContext)


  const handlelogout=()=>{
    sessionStorage.clear()
    toast.info("User Loged Out !!")
    setAuthContextStatus(false)
    nav('/')
  }
  return (
    <>
    <div >
    <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home" style={{fontSize:"30px"}}>
          <i className="fa-solid fa-diagram-project" style={{color: "#04010e",}} />
           {' '}
           PROJECT FAIR
          </Navbar.Brand>
          <button className="btn btn-danger" onClick={handlelogout}>LOGOUT</button>
        </Container>
      </Navbar>
      </div>
    </>
  )
}

export default Header