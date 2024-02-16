import { createContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

export const SocketContext = createContext();

export const SocketContextProvider = ({children})=>{

  const [socket,setSocket]=useState(null);
  const [onlineUsers,setOnlineUsers]=useState([]);
  const {_id}=useSelector(state=>state.loggedIn.loggedInUser) || ''
  console.log(onlineUsers)

  useEffect(()=>{
    if(_id){
      const socket = io("http://localhost:3000",{
        query:{
          userId:_id
        }
      });
      console.log(socket)
      setSocket(socket);


      socket.on("getOnlineUsers",(users)=>{
        setOnlineUsers(users);
      });
      return ()=>socket.close()
    }else{
      if(socket){
        socket.close();
        setSocket(null)
      }
    }
  },[_id])

  return <SocketContext.Provider value={{socket,onlineUsers}}>
    {children}
  </SocketContext.Provider>
}