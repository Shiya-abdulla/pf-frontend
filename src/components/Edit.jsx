import React, { useEffect } from 'react'
import { useState  , useContext} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Row, Col } from 'react-bootstrap';
import { editProject } from '../service/allapi';
import base_url from '../service/base_url';
import { toast } from 'react-toastify';
import { editprojectResponceContext } from '../context/ContextAPI';


function Edit({project}) {

  const [data , setData]=useState({...project})

  const [preview , setPreview ]= useState("")

  const{editresponce , setEditresponce}= useContext(editprojectResponceContext)


  useEffect(()=>{
    if(data.image.type){
      setPreview(URL.createObjectURL(data.image))
    }else{
      setPreview("")
    }
  },[data.image])

  const handleEdit=async()=>{
    console.log(data)
    const {title , description , languages , github , demo , image} = data
    if(!title || !description || ! languages || !demo || !github || ! image){
      toast.warning("Invalid Inputs")
    }
    else{
      if(data.image.type){
        const fd=new FormData()
        fd.append('title' , title)
        fd.append('description' , description)
        fd.append ('languages' , languages)
        fd.append('github' , github)
        fd.append('demo' , demo)
        fd.append('image' , image)

            const header = {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Token ${sessionStorage.getItem('token')}`
    }
        const res=await editProject(fd , project._id , header)
    console.log(res)
    if(res .status == 200){
      toast.success("Project updated")
      handleClose()
      setEditresponce(res)
    }else{
      toast.error("updation failed")
    }

      }else{
        console.log("no file")
        const header = {
          'Content-Type': 'application/json',
          'Authorization': `Token ${sessionStorage.getItem('token')}`
        }
        const body={title , description , languages , github , demo , image}
        const res=await editProject(body ,project._id , header)
        console.log(res)
        if(res .status == 200){
          toast.success("Project updated")
          handleClose()
          setEditresponce(res)
        }else{
          toast.error("updation failed")
        }

      }
    }
  }

  const [show, setShow] = useState(false);

  const handleClose = () =>{
    setData({...project})
    setPreview('')
    setShow(false)};
  const handleShow = () => setShow(true);
  return (
    <>
      <button className='btn ' onClick={handleShow} >
        <i className="fa-solid fa-pen-to-square fa-xl" style={{ color: "#217bc0", }} />
      </button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Projects</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Row>
            <Col>
              <label>
                <input type="file" onChange={(e)=>setData({...data,image:e.target.files[0]})} className='form-control' style={{ display: "none" }} />
                <img className='img-fluid' src={preview ? preview :`${base_url}/uploads/${project.image}`} alt="" />
              </label>
            </Col>
            <Col>
              <div>
                <input type="text" defaultValue={project.title}  onChange={(e)=>setData({...data,title:e.target.value})}  className='form-control mb-3' placeholder='Enter Project Title' />
                <input type="text" defaultValue={project.description} onChange={(e)=>setData({...data,description:e.target.value})}   className='form-control mb-3' placeholder='Enter Project Description ' />
                <input type="text" defaultValue={project.languages} onChange={(e)=>setData({...data,languages:e.target.value})}  className='form-control mb-3' placeholder='Enter Languages' />
                <input type="text" defaultValue={project.github} onChange={(e)=>setData({...data,github:e.target.value})}  className='form-control mb-3' placeholder='Github URL' />
                <input type="text" defaultValue={project.demo} onChange={(e)=>setData({...data,demo:e.target.value})}  className='form-control mb-3' placeholder='Demo URL' />
              </div>
            </Col>
          </Row>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEdit}>Update</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Edit