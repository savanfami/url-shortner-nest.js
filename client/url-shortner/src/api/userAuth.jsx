import {axiosInstance} from '../constants/axiosInstance'
import { config } from '../constants/configurations'

export const signup=async(data)=>{
    return await axiosInstance.post('/auth/signup',data)
}


export const signIn=async(formData)=>{
    return await axiosInstance.post("/auth/login",formData)
}

export const CreateUrl=async(url)=>{
    return await axiosInstance.post("/auth/createUrl",{url},config)
}

export const getUrl=async(id)=>{    
    return await axiosInstance.get(`/auth/${id}`,config)
}