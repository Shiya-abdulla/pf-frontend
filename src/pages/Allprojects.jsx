import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Projects from '../components/Projects'
import { landingProject } from '../service/allapi'

function Allprojects() {

  const [ data , setData]=  useState([])

  useEffect(()=>{
    if(sessionStorage.getItem('token')){
      getData()
    }
  },[])

  const getData=async()=>{
    const res=await landingProject()
    if(res.status==200){
      setData(res.data)
    }
  }

  return (
 <>
 <Header/>
 <div className="container-fluid p-3">
  <h3>All Projects</h3>
  <div className='container-fluid d-flex justify-content-around' style={{width:'100%'}}>
    {
      data.length>0 ?
      data.map(item=>(
        <Projects project={item}/>
      ))
      :
      <h3 className='text-center text-danger'>No project available ..check you are logged in !</h3>
    }
    
  </div>
 </div>
 </>
  )
}

export default Allprojects