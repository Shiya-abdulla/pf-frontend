import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Footer() {
  return (
   <>
   <div className='container-fluid bg-primary p-3'>
    <Row>
        <Col>
        <h4>Project Fair 2024</h4>
        <p style={{textAlign:"justify"}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente natus cupiditate eveniet accusantium modi pariatur velit quibusdam fuga incidunt error eligendi libero commodi officia assumenda quasi vitae ipsam, sequi maiores?</p>

        </Col>
        <Col>
        <h4>Links</h4>
        <div className='d-flex flex-column'>
            <Link to={'/'} className='text-dark'>Landing</Link>
            <Link to={'/auth'} className='text-dark'>Login</Link>
            <Link to={'/allprojects'} className='text-dark'>All Projects</Link>
        </div>
        </Col>
        <Col>
        <h4>Feedback</h4>
        <textarea name="" id="" className='mt-4 form-control'></textarea>
        <button className='btn btn-dark my-3'>Submit</button>
        </Col>
    </Row>
   </div>
   </>
  )
}

export default Footer