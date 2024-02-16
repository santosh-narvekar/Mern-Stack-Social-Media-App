import { useDispatch, useSelector } from "react-redux";
import Conversation from "./Conversation"
import {  useEffect } from "react";
import { getUsersForChat } from "../../../features/userFeatures";

const Conversations = ({filteredUsers}) => {
  
  const {chatsLoading,chatUsers}=useSelector(state => state.loggedIn);
  const dispatch = useDispatch();
 
  useEffect(()=>{
    dispatch(getUsersForChat());
  },[]);
  
  return (
    <div className="py-2 flex flex-col overflow-auto">
      {
        chatsLoading?<span className="loading loading-ring loading-lg"></span>
       : filteredUsers?.map((chatUser,i)=><Conversation key={chatUser._id} photo={chatUser?.photo} username={chatUser?.username} CurIndex={i}
          lastIndex={i==chatUsers?.length-1} id={chatUser._id}
       />)
       }
    </div>
  )
}

export default Conversations
