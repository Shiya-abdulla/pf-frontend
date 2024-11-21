import React , {useState , useContext} from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginApi, registerApi } from '../service/allapi';
import { useNavigate } from 'react-router-dom';
import { authContext } from '../context/ContextAPI';


function Auth() {

const[ authstatus , setauthstatus] = useState(false)

const [user , setUser ] = useState({
  email:"" , username :"",password:""
})

const nav = useNavigate()

const {authContextStatus , setAuthContextStatus} = useContext(authContext)

const chnageAuth=()=>{
  setauthstatus(!authstatus)
  setUser({
    email:"" , username:"", password:""
  })
}

const handleregister=async()=>{
  console.log(user)
  const {email , username , password} = user
  if(!email || !username || !password){
    toast.warning("Enter Valid Inputs")
  }else{
    const res=await registerApi(user)
    console.log(res)
    if(res.status == 200){
      toast.success("Registered Successfully")
      setUser({
        email:"" , username:"", password:""
      })
      chnageAuth()
    }
    else{
      toast.error("Registration failed")
    }
  
  }
}

const handlelog=async()=>{
  const {email , password}= user 
  if(!email || !password){
    toast.warning("Enter valid inputs")

  }else{
    const res= await loginApi(user)
    console.log(res)
    if (res.status==200){
      toast.success("Login successfull")
      setUser({
        email:"" , username:"", password:""
      })
      sessionStorage.setItem('token', res . data .token)
      sessionStorage.setItem('username', res . data .username)
      sessionStorage.setItem('github', res . data .github)
      sessionStorage.setItem('linkedln', res . data .linkedln)
      sessionStorage.setItem('profile', res . data .profile)
      setAuthContextStatus(true)
      nav('/dash')
    }
    else{
      toast.error(res.response.data)
    }
  }
}
    return (
        <>
            <div className='container-fluid d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>
                <div className='w-75 border shadow row'>
                    <div className="col-md-6 col-sm-12">
                        <img src="https://img.freepik.com/free-vector/tablet-login-concept-illustration_114360-7883.jpg?t=st=1727248976~exp=1727252576~hmac=68bab54f553e497ba5f7cd952b26ff7849f28530499a8f29899f8f9d1c0ba7bd&w=1060" alt="" width={'100%'} />
                    </div>
                    <div className="col-md-6 col-sm-12 p-5">
                      {
                        authstatus ?
                        <h2>User Registration</h2>
                        :
                        <h2>Login</h2>
                      }
                        <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
                            <Form.Control type="email" value={user.email} onChange={(e)=>setUser({...user,email:e.target.value})} placeholder="name@example.com" className='mt-2'/>
                        </FloatingLabel>
                        {
                          authstatus &&
                          <FloatingLabel controlId="floatingInput" label="Username" className="mb-3">
                          <Form.Control type="text" value={user.username} onChange={(e)=>setUser({...user,username:e.target.value})} placeholder="name" />
                      </FloatingLabel>
                        }
                       
                        <FloatingLabel controlId="floatingPassword" label="Password">
                            <Form.Control type="password" value={user.password} onChange={(e)=>setUser({...user,password:e.target.value})} placeholder="Password" />
                        </FloatingLabel>


                        <div className='d-grid'>
                          {
                            authstatus ?
                            <button className="btn btn-secondary my-3" onClick={handleregister}>Register</button>
                            :
                            <button className='btn btn-success my-3' onClick={handlelog}>Login</button>
                          }
                        
                        {
                          authstatus ?
                          <button className='btn btn-info' onClick={chnageAuth}>Already a  User?</button>
                          :
                          <button className='btn btn-info' onClick={chnageAuth}>New User?</button>
                        }
                
                           
                        </div>
                </div>
            </div>
        
        </div >
        
    </>
  )
}

export default Auth