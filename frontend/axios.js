import axios from "axios";

export const usersFetch = axios.create({
  baseURL:"https://sapp-social-media-j5aw.onrender.com",
  headers:{
    "Content-Type":"application/json",
  },
  withCredentials:true
})

export const postsFetch = axios.create({
  baseURL:"https://sapp-social-media-j5aw.onrender.com",
  headers:{
    "Content-Type":"application/json",
  },
  withCredentials:true
});
