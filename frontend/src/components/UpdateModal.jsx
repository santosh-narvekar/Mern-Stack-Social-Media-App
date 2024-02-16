import { FaImage } from "react-icons/fa6"
import { handleChangeForPosts } from "../../utils/handleChangeForPosts";
import { useRef,useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePost } from "../../features/postFeatures";
import { BsEmojiSmile } from "react-icons/bs"
import { setShowPicker } from "../../features/userFeatures";
import Picker from "emoji-picker-react";
const MAX_CHAR = 200;
const UpdateModal = ({id,data,setData}) => {
  const dispatch = useDispatch();
  const postId=useSelector(state=>state.post.postData._id);
  const {showPicker} = useSelector(state=>state.loggedIn);
  const pickerRefUpdate = useRef(null);
  const length=MAX_CHAR;

  
  const handleEmoji = (e)=>{
    e.preventDefault();
    dispatch(setShowPicker(true));
  }

  const handleEmojiForUpdate=(e)=>{
    setData({...data,'postContent':data.postContent + e.emoji});
    dispatch(setShowPicker(false))
  }

  const handleClickOutside=(e)=>{
    if(pickerRefUpdate.current && !pickerRefUpdate.current.contains(e.target)){
      dispatch(setShowPicker(false));
    }
  }

  useEffect(()=>{
    document.addEventListener('mousedown',handleClickOutside);
    return () => document.removeEventListener('mousedown',handleClickOutside)
  },[]);



  const handlePostUpdate = () => {
    dispatch(updatePost({postId,data}));
  }
  
  const {postsButtonLoading}=useSelector(state=>state.post)
  return (
    <div>
    <input type='file' name="resource" 
    onChange={(e) => handleChangeForPosts(e,data,setData)} 
    id="post-update-btn" hidden />
   <dialog  id={id} className = "modal" >
    <div className="modal-box" >
    {
    data.resource?.startsWith(`data:video/mp4`) || data.resource?.includes('/video/upload')?
    <video autoPlay={true} className="w-full h-60 my-5 mb-5">
      <source src={data.resource} type="video/mp4" />
    </video>
    :(data.resource?.startsWith('data:image/jpeg') || data.resource?.startsWith('data:image/png')
     || data.resource
    )
    
    ?
    <img src ={data.resource}  className = 'w-full h-60 my-5 mb-5' />
    : <FaImage className='w-full h-40 my-2'/>}
    
    <div className="flex items-center justify-between">
    <label htmlFor='post-update-btn' className = "btn btn-neutral my-2">Choose File</label>
    <button 
         className="ml-4 inset-y-0 end-0 flex items-center pe-3 hover:cursor-pointer"
         onClick={handleEmoji}
        >
          <BsEmojiSmile />
        </button>
        {
          showPicker &&  <div className="absolute z-10 mt-2" ref={pickerRefUpdate}><Picker  
          onEmojiClick={handleEmojiForUpdate}
          />
          </div>
        }
    </div>
    <p className='flex w-full justify-end mt-4'>{length-data.postContent.length}/200 characters left</p>
    
    <textarea  className='w-full mt-2 border-2 border-gray-800 px-2 py-2 rounded-lg' placeholder='post Title(Max 200 characters)' 
    name = "postContent"
    onChange = {(e) => handleChangeForPosts(e,data,setData)}
    value = {data.postContent}
    maxLength={MAX_CHAR}
    />

    <div className="modal-action">
      <form method="dialog" >
        <button  id="btn" className="btn hidden" hidden>Close</button>
        <label
        htmlFor="btn"
        disabled={postsButtonLoading}
        className='btn btn-secondary mx-2'
        onClick={handlePostUpdate}
    >UPDATE</label>
        <button 
        className="btn btn-alert">Close</button>
      </form>
    </div>
  </div>
</dialog>
    </div>
)}

export default UpdateModal
