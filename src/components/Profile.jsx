import React, { useEffect, useState , useContext } from 'react'
import { toast } from 'react-toastify'
import { profileUpdate } from '../service/allapi'
import base_url from '../service/base_url'
import { useNavigate } from 'react-router-dom'
import { authContext } from '../context/ContextAPI'


function Profile() {
    const [status, setstaus] = useState(false)
    const {authContextStatus , setAuthContextStatus} = useContext(authContext)


    const [userData, setUserdata] = useState({
        profile: "", username: "", github: "", linkedln: ""
    })

    const [preview, setPreview] = useState('')

    const nav=useNavigate()

    useEffect(() => {
        console.log(sessionStorage.getItem('username'))
        if (sessionStorage.getItem('username')) {
            setUserdata({ ...userData, username: sessionStorage.getItem('username') , github :sessionStorage.getItem('github') ,
                 linkedln:sessionStorage.getItem('linkedln'), profile:sessionStorage.getItem('profile')})
        }
    }, [])

    useEffect(() => {
        if (userData.profile &&  userData.profile.type) {
            setPreview(URL.createObjectURL(userData.profile))
        }
        else {
            setPreview('')
        }
    }, [userData.profile])

    const handleProfileUpdate = async () => {
        console.log(userData)
        const { username, github, linkedln, profile } = userData
        if (!username || !github || !linkedln || !profile) {
            toast.warning('enter valid inputs')
        }
        else {
            if (userData.profile.type) {
                const fd = new FormData()
                fd.append('username', username)
                fd.append('github', github)
                fd.append('linkedln', linkedln)
                fd.append('profile', profile)

                const header = {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${sessionStorage.getItem('token')}`
                }

                const res = await profileUpdate(fd,header)
                console.log(res)
                if(res.status==200){
                    toast.success("Profile updated successfully")
                    changestatus()
                    sessionStorage.clear()
                    setAuthContextStatus(false)
                    nav('/auth')
                }else{
                    toast.error("Profile updated")
                }

            } else {
                const header = {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${sessionStorage.getItem('token')}`
                }
                const res=await profileUpdate(userData , header)
                console.log(res)
                if(res.status==200){
                    toast.success("Profile updated successfully")
                    changestatus()
                    sessionStorage.clear()
                    setAuthContextStatus(false)

                    nav('/auth')
                }else{
                    toast.error("Profile updated")
                }
            }
        }

    }


    const changestatus = () => {
        setstaus(!status)
    }
    return (
        <>
            <div className="container-fluid mt-5 p-3 d-flex justify-content-center align-items-center " >
                {
                    status ?

                        <div className="border shadow border-dark p-3">
                            <h5 className="text-center">Profile</h5>
                            <div>
                                <label>
                                    <input type="file" style={{ display: "none" }} onChange={(e) => setUserdata({ ...userData, profile: e.target.files[0] })} />
                                    <img src={preview ? preview :sessionStorage.getItem('profile')?`${base_url}/uploads/${sessionStorage.getItem('profile')}`: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0J_Zvt3w2VyOOjPzdAesOLDzrs0FKw3N4Fw&s"}
                                        className='img-fluid' alt="" />
                                </label>
                                <input type="text" defaultValue={userData.username} onChange={(e) => setUserdata({ ...userData, username: e.target.value })} placeholder='Username' className="form-control mb-3" />
                                <input type="text" defaultValue={userData.github} onChange={(e) => setUserdata({ ...userData, github: e.target.value })} placeholder='Github URL' className="form-control mb-3" />
                                <input type="text" defaultValue={userData.linkedln} placeholder='Linkedln URL' onChange={(e) => setUserdata({ ...userData, linkedln: e.target.value })} className="form-control mb-3" />
                                <div className='d-flex justify-content-between'>
                                    <button className='btn btn-success' onClick={handleProfileUpdate}>Upload</button>
                                    <button className='btn btn-danger' onClick={changestatus}>Cancel</button>
                                </div>
                            </div>
                        </div>

                        :
                        <h5 onClick={changestatus} style={{ textDecoration: "underline", color: "blue", cursor: "pointer" }}>Edit user profile</h5>

                }

            </div>
        </>
    )
}

export default Profile