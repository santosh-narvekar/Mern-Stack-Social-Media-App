import axios from "axios";

export const usersFetch = axios.create({
  baseURL:"https://sapp-social-media-app.onrender.com/",
  headers:{
    "Content-Type":"application/json",
  },
  withCredentials:true
})

export const postsFetch = axios.create({
  baseURL:"http://localhost:3000",
  headers:{
    "Content-Type":"https://sapp-social-media-app.onrender.com/",
  },
  withCredentials:true
});
