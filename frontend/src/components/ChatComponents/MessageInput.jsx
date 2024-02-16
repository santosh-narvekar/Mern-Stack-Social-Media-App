import {BsEmojiSmile, BsFillImageFill, BsSend} from "react-icons/bs"
import { useDispatch, useSelector } from "react-redux";
import { sendMessage, setShowPicker } from "../../../features/userFeatures";
import { useState,useRef,useEffect } from "react";
import { toast } from "react-toastify";
import MessageModal from "./MessageModal";
import Picker from "emoji-picker-react";

const MessageInput = ({id}) => {

  const dispatch = useDispatch();
  const [message,setMessage]=useState({message:'',messageImg:''})
  const {buttonLoading}=useSelector(state=>state.loggedIn);
  const {showPicker}=useSelector(state=>state.loggedIn);
 // const [closePicker,setClosePicker]=useState(false)
  const pickerRef = useRef(null);

  const onEmojiClick = (e)=>{
    setMessage({...message,'message':message.message + e.emoji});
    dispatch(setShowPicker(false))
  }

  const handlePickerOpen = (e)=>{
    e.preventDefault();
    dispatch(setShowPicker(true))
  }

  const handleNewMessage=(e)=>{
    e.preventDefault();
    if(message){
      dispatch(sendMessage({id,message}));
    }
    setMessage({message:'',messageImg:''})
  }
  
  const handleImgMessage = (e)=>{
    e.preventDefault();

    if(e.target.name==='msg-resource'){
      if(e.target.files[0].type === 'image/jpeg' || e.target.files[0].type === 'image/png' 
      ||e.target.files[0].type === 'video/mp4')
      {

        const fileReader = new FileReader();
            fileReader.onload = (event) => {
            setMessage({...message,'messageImg':event.target.result})
            }
            fileReader.readAsDataURL(e.target.files[0]);
      }else{
        toast.error('only jpg or png or mp4 files allowed');
      }
    }
    setMessage({...message,'messageImg':e.target.value});
  }
  
  const handleClickOutside = (e) => {
    if(pickerRef.current && !pickerRef.current.contains(e.target)){
      dispatch(setShowPicker(false));
    }
  }


  useEffect(()=>{
    document.addEventListener('mousedown',handleClickOutside);
    return () => document.removeEventListener('mousedown',handleClickOutside)
  },[]);

  return (
    <>
     {
    <form className='px-4 my-3'>
      <div className="w-full relative inline-block">
        <input
        name="message"
        value={message.message}
        onChange = {(e)=>{
          setMessage({...message,[e.target.name]:e.target.value})}}
        type="text"
        className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white "
        placeholder="Send a message"
        />
        <button type="submit" 
        onClick={handleNewMessage}
        disabled={buttonLoading || !message.message}
        className="absolute inset-y-0 end-16 flex items-center pe-3">
          <BsSend/>
        </button>

        <button
        id="open-modal"
        onClick={(e)=>{
          e.preventDefault();
          document.getElementById('my_modal_3').showModal()}
        }
        className="absolute inset-y-0 end-8 flex items-center pe-3 hover:cursor-pointer">
          <BsFillImageFill />
        </button>

        <button 
         className="absolute inset-y-0 end-0 flex items-center pe-3 hover:cursor-pointer"
         onClick={handlePickerOpen}
        >
          <BsEmojiSmile/>
        </button>
        <div className="fixed top-10 z-10">
        {
          showPicker  && <div ref={pickerRef} >
            < Picker onEmojiClick={onEmojiClick}/>
           </div>
        }
        </div>
      </div>
    </form>
     }
     <MessageModal 
     id="my-modal-3"
     message={message}
     sendMessage={setMessage}
     handleImgMessage={handleImgMessage}
     handleNewMessage={handleNewMessage}
     />
    </>
  )
}

export default MessageInput
