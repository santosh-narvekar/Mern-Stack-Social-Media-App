import { useSelector } from "react-redux"
import { useParams } from "react-router";
import { extractTime } from "../../../utils/ExtractTime";
import { useRef } from "react";


const Message = ({createdAt,message,fullMessage,ImgMessage}) => {

  const params = useParams();
  const {id}=params;
  const {_id,photo} = useSelector(state => state.loggedIn.loggedInUser);
  const {chatUsers} = useSelector(state => state.loggedIn);
  const formattedTime = extractTime(createdAt);
  const fromMe = fullMessage.senderId == _id;
  const {photo:receiverPhoto} = chatUsers?.find((user)=>user._id === id);
  const bubbleBgColor = fromMe?'bg-blue-500':'';
  const shakeClass = message.shouldShake?'shake':'' 
  return (
    <div className= {`chat ${fromMe?'chat-end':'chat-start'}`}  >
       <div className="chat-image avatar">
        <div className="w-10 rounded-full">
        {
           fromMe && photo?<img src={photo} alt="myphoto"/>:
           receiverPhoto && !fromMe?<img src={receiverPhoto} alt="receiverPhoto"/>:
         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#808389" d="M399 384.2C376.9 345.8 335.4 320 288 320H224c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z"/></svg>
               
         }
       
        </div>
       </div>
       {ImgMessage?
       <div className="flex mt-5 w-48">
        <img src={ImgMessage} alt="Message Image"  className="br-4"/>
        </div>
       :
       <div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass}`}>{message}</div>
       }
       <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">{formattedTime}</div>
    </div>
  )
}

export default Message
