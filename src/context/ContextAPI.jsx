import React, { useState } from 'react'
import { createContext } from 'react'

export const addprojectResponceContext=createContext()
export const editprojectResponceContext=createContext()
export const authContext=createContext()

function ContextAPI({children}) {

const [addresponce , setAddresponce]=useState('')
const [editresponce , setEditresponce]=useState('')
const [authContextStatus , setAuthContextStatus] = useState(false)

  return (
    <>
    <addprojectResponceContext.Provider value={{addresponce , setAddresponce}}>
    <editprojectResponceContext.Provider value={{editresponce , setEditresponce}}>
      <authContext.Provider value={{authContextStatus , setAuthContextStatus}}>
      {children}
      </authContext.Provider>
      </editprojectResponceContext.Provider>
    </addprojectResponceContext.Provider>
    </>
  )
}

export default ContextAPI