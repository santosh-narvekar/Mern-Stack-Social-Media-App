import { useSelector } from 'react-redux'
import Message from './Message'
import { useEffect, useRef } from 'react';
import useListenMessages from '../../../hooks/useListenMessages';

const Messages = () => {

  const {messages,messagesLoading}=useSelector(state=>state.loggedIn)
   useListenMessages()
  const lastMessageRef = useRef();

  useEffect(()=>{
    setTimeout(()=>{
      lastMessageRef?.current?.scrollIntoView({behaviour:"smooth"})
    },150)
  },[messages])
  
  return (
    <div className='px-4 flex-1 overflow-auto'>
      
      {
      messagesLoading?<span className='loading loading-ring loading-lg items-center'></span> 
      :messages?.length == 0?<p className='ml-8 font-bold'>send a message to start conversation</p>:messages?.map((message)=>{
          return <div key = {message._id}
          ref={lastMessageRef}
          >
            <Message message={message.message} createdAt={message.createdAt} fullMessage = {message} ImgMessage={message.messageImg}/>    
          </div>  
        }) 

      }
    </div>
  )
}

export default Messages
