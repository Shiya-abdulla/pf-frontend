import React , {useState , useEffect , useContext} from 'react'
import Header from '../components/Header'
import { Row , Col } from 'react-bootstrap'
import Add from '../components/Add'
import Edit from '../components/Edit'
import Profile from '../components/Profile'
import { delProject, getprojectlistApi } from '../service/allapi'
import { addprojectResponceContext , editprojectResponceContext , authContext } from '../context/ContextAPI'
import { toast } from 'react-toastify'

function Dashboard() {
  const [view , setView]= useState(false)
  const [data , setData ]= useState([])

  const{addresponce , setAddresponce}= useContext(addprojectResponceContext)
  const{editresponce , setEditresponce}= useContext(editprojectResponceContext)


  useEffect(()=>{
    getData()
  },[addresponce , editresponce])

  const getData=async()=>{
    const header = {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Token ${sessionStorage.getItem('token')}`
    }
    const res=await getprojectlistApi(header)
    console.log(res)
    if(res.status== 200){
      setData(res.data)
    }else{
      console.log(res)
    }
  }

  const handledelete=async(id)=>{
    const header = {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Token ${sessionStorage.getItem('token')}`
    }
    const res=await delProject(id , header)
    if(res.status==200){
      toast.success("Project deleted successfully")
      getData()
    }
   else{
    toast.warning("Someting went wrong ")
   }
  }


  return (
   <>
   <Header/>
   <div className="container-fluid">
    <h3>User Projects</h3>
    <Row>
      <Col md={8} sm={12}>
      <div className="w-100 border shadow border-dark p-3 m-3">
        <Add/>

        {/* projectlist */}
        <div className="m-2 px-1 py-2  bg-light border">
          {
            data.length>0 ?
            <>
            {
             
              data.map(item=>(
                <div className="border shadow border-2 d-flex justify-content-between p-3">
                <h4>{item.title}</h4>
              
            <div>
              <a href={item.github} target='_blank' className='btn text-dark'><i className="fa-brands fa-github fa-xl" /></a>
     
            <Edit project={item}/>
    
              <button className='btn'>
              <i className="fa-solid fa-trash fa-xl" onClick={(id)=>{handledelete(item._id)}} style={{color: "#f01505",}} />
              </button>
              </div>
              </div>
              ))
            }
          
            
           </>
            
            :
            <h3>No project added</h3>
          
          }
        </div>
      </div>

      </Col>
      <Col md={4} sm={12}>
      <Profile/>
      </Col>
    </Row>
   </div>
   </>
  )
}

export default Dashboard