import React, { useEffect } from 'react'
import { useState , useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { addProjectApi } from '../service/allapi';
import { addprojectResponceContext } from '../context/ContextAPI';

function Add() {

  const [project, setproject] = useState({
    title: "", description: "", languages: "", demo: "", github: "", image: ""
  })

  const [preview, setpreview] = useState('')

  const{addresponce , setAddresponce}=useContext(addprojectResponceContext)

  useEffect(() => {
    if (project.image) {
      setpreview(URL.createObjectURL(project.image))
    } else {
      setpreview("")
    }
  }, [project.image])

  const handleproject = async () => {
    console.log(project)
    const { title, description, languages, github, demo, image } = project
    if (!title || !description || !languages || !github || !demo || !image) {
      toast.warning('Enter valid inputs')
    }
    else {
      const fd = new FormData()
      fd.append('title', title)
      fd.append('description', description)
      fd.append('languages', languages)
      fd.append('github', github)
      fd.append('demo', demo)
      fd.append('image', image)

      const header = {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Token ${sessionStorage.getItem('token')}`
      }
      const res = await addProjectApi(fd, header)
      console.log(res)
      if(res.status == 200){
        toast.success("Project Added")
        handleClose()
        setAddresponce(res
          
        )
      }
      else{
        toast.error("Project adding failed")
      }
    }
  }

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setproject({
      title: "", description: "", languages: "", demo: "", github: "", image: ""
    })
    setpreview()
    setShow(false);
  }
  const handleShow = () => setShow(true);
  return (
    <>
      <button className='btn btn-warning' onClick={handleShow}>Add Projects</button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Projects</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Row>
            <Col>
              <label>
                <input type="file" onChange={(e) => setproject({ ...project, image: e.target.files[0] })} className='form-control' style={{ display: "none" }} />
                <img className='img-fluid' src={preview ? preview : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCZUEaaDAB6O39mSUxkx-oDzgaLZAsywAikw&s"} alt="" />
              </label>
            </Col>
            <Col>
              <div>
                <input type="text" onChange={(e) => setproject({ ...project, title: e.target.value })} className='form-control mb-3' placeholder='Enter Project Title' />
                <input type="text" onChange={(e) => setproject({ ...project, description: e.target.value })} className='form-control mb-3' placeholder='Enter Project Description ' />
                <input type="text" onChange={(e) => setproject({ ...project, languages: e.target.value })} className='form-control mb-3' placeholder='Enter Languages' />
                <input type="text" onChange={(e) => setproject({ ...project, github: e.target.value })} className='form-control mb-3' placeholder='Github URL' />
                <input type="text" onChange={(e) => setproject({ ...project, demo: e.target.value })} className='form-control mb-3' placeholder='Demo URL' />
              </div>
            </Col>
          </Row>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleproject}>Add</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Add