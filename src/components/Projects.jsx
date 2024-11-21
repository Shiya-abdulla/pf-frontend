import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Row , Col } from 'react-bootstrap';
import base_url from '../service/base_url';

function Projects({project}) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

  return (
   <>
   <div>
    <Card style={{ width: '18rem' }}>
      <Card.Img onClick={handleShow} style={{cursor:"pointer"}} variant="top" src={`${base_url}/uploads/${project.image}`} />
      <Card.Body>
        <Card.Title>{project.title}</Card.Title>
      </Card.Body>
    </Card>

    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{project.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Row>
            <Col className='p-3'>
            <img src={`${base_url}/uploads/${project.image}`} alt="" className='img-fluid' />
            </Col>
            <Col>
            <h6><span className='text-info'> Description :</span>{project.description} </h6>
            <p><span className='text-info'> Languages :</span>{project.languages} </p>

            <div className='mt-3 d-flex justify-content-between'>
                <a href={project.github}>
                <i className="fa-brands fa-github" />
                </a>
                <a href={project.demo}>
                    <i className="fa-solid fa-link"></i>
                    </a>
            </div>
            
            </Col>

        </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Understood</Button>
        </Modal.Footer>
      </Modal>

    </div>
   </>
  )
}

export default Projects