import React, { useEffect, useState } from 'react'
import { Row , Col } from 'react-bootstrap'
import Projects from '../components/Projects'
import { Link } from 'react-router-dom'
import { landingProject } from '../service/allapi'

function Landing() {

  const [lproject , setLproject ]= useState([])

  useEffect(()=>{
    getlproject()
  },[])

  const getlproject=async()=>{
    const res=await landingProject()
    console.log(res);
    if(res.status==200){
      setLproject(res.data)
    }
    
  }

  return (
   <>
    <div className='container-fluid bg-info d-flex justify-content-center align-items-center mt-5' style={{height:'80vh'}}>
        <Row className='p-4'>
            <Col className='d-flex justify-content-center flex-column'>
            <h4 className='text-light'>Project fair</h4>
            <p style={{textAlign:"justify"}} className='text-light'>            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nesciunt, accusamus soluta animi voluptas, libero doloremque illum magnam quo repellendus fuga corporis, molestias omnis velit tempora! Doloribus qui sequi aspernatur sint.
            </p>
            <Link className="btn btn-success" to={'/auth'}>Start To Explore..</Link>
            </Col>
            <Col>
            <img src="https://img.freepik.com/free-vector/exhibition-with-visitors-set-flat-icons-with-people-views-exhibit-racks-stands-vector-illustration_1284-77500.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1727049600&semt=ais_hybrid" alt="" width={'550px'}  height={'350px'} />
            </Col>
        </Row>
    </div>

    <div className='p-4'>
    <h3 className='text-center my-4'>Sample Projects</h3>
    <div className='d-flex justify-content-around'>
      {
        lproject.slice(0,3).map(item=>(
          lproject.length>0 ?
          <Projects project={item}/>
          :
          <h4 className='text-center text-danger'>No projects</h4>
        ))
      }

   
    
    </div>
    <div className='text-center mt-5'> 
             <Link to={'/allprojects'} > View More</Link>
             </div>
    </div>
   </>
  )
}

export default Landing