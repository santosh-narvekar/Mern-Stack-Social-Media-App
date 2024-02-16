import { useContext, useEffect, useState } from "react"
import { SocketContext } from "../src/context/SocketContext"
import { useDispatch, useSelector } from "react-redux";
import { updateMessages } from "../features/userFeatures";
import notificationSound from "../src/assets/sounds/notification.mp3"
const useListenMessages = () => {
  const {socket,onlineUsers}=useContext(SocketContext);
  const {messages}=useSelector(state=>state.loggedIn);
  const dispatch = useDispatch()
  useEffect(()=>{
    socket?.on("newMessage",(newMessage)=>{
      console.log(newMessage);
      newMessage.shouldShake = true
      const sound=new Audio(notificationSound);
      sound.play();
      dispatch(updateMessages(newMessage))
    })
    
    return ()=>socket?.off("newMessage")
  },[socket,messages])

}

export default useListenMessages
