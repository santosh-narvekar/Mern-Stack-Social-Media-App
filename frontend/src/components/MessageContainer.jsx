import { useDispatch, useSelector } from "react-redux"
import startConversation from "../../hooks/startConversation"
import MessageInput from "./ChatComponents/MessageInput"
import Messages from "./ChatComponents/Messages"

import {TiMessages} from "react-icons/ti"
import { useParams } from "react-router"
import { useEffect } from "react"
import { getMessages } from "../../features/userFeatures"
const MessageContainer = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const {id}=params;
  const {chatUsers}=useSelector(state=>state?.loggedIn);

  let chatUser = chatUsers?.find((chatUser)=>chatUser._id === id);

  useEffect(()=>{
    if(id){
      dispatch(getMessages(id));
    }
  },[id]);
  
  return (
    <div className="md:min-w-[450px] flex flex-col overflow-auto ml-6 h-96  md:h-full  md:ml-0">
      {
        !id?<NoChatSelected/>:
        <>
        <div className="bg-slate-500 px-4 py-2 mb-2">
          <span className="label-text">
            To:
          </span>{" "}
          <span className="text-gray-900 font-bold">{chatUser?.username}</span>
        </div>

        <Messages/>
       <MessageInput id={chatUser?._id}/>
  </>
      }
    </div>
  )
}

export default MessageContainer

const NoChatSelected = ()=>{
  const {username} = useSelector(state=>state.loggedIn.loggedInUser);
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>welcome,{username}</p>
        <p>Select a message to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center"/>
      </div>
    </div>
  )
}