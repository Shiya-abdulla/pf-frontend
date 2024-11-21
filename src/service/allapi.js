import base_url from "./base_url";
import commonApi from "./commonApi";

export const registerApi=async(data)=>{
    return await commonApi(`${base_url}/reg`,"POST","", data)
}

export const loginApi=async(data)=>{
    return await commonApi(`${base_url}/log`,'POST',"", data)
}

export const addProjectApi=async(data , header)=>{
    return await commonApi(`${base_url}/addproject`,"POST",header, data)
}

export const getprojectlistApi=async( header)=>{
    return await commonApi(`${base_url}/projectlist`,"GET",header, "")
}

export const delProject=async( id , header)=>{
    return await commonApi(`${base_url}/delproject/${id}`,"DELETE",header, {})
}

export const editProject=async(data , id , header)=>{
    return await commonApi(`${base_url}/editproject/${id}`,"PUT",header, data)
}

export const profileUpdate=async(data , header)=>{
    return await commonApi(`${base_url}/profileupdate`,"PUT",header, data)
}

export const landingProject=async()=>{
    return await commonApi(`${base_url}/landingproject`,"GET","", "")
}


