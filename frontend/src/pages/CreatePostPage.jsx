import { useState } from "react"
import { FaImage } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../features/postFeatures";
import { handleChangeForPosts } from "../../utils/handleChangeForPosts";
import TrendingTopics from "./TrendingTopics";
import {BsEmojiSmile} from "react-icons/bs"
import Picker from "emoji-picker-react";
import {useRef,useEffect} from "react"
import { setShowPicker } from "../../features/userFeatures";

const CreatePostPage = () => {
  const [data,setData]=useState({resource:'',postContent:''});
  const dispatch = useDispatch();
  const {postsButtonLoading}=useSelector(state=>state.post)
  const {showPicker}= useSelector(state=>state.loggedIn) 
  const pickerRefPost = useRef(null);
  const MAX_CHAR = 200;

  const handleSubmit=(e)=>{
    e.preventDefault();
     dispatch(createPost(data));
    setData({resource:'',postContent:''});
  }

  const handleClickOutside = (event) => {
    if (pickerRefPost.current && !pickerRefPost.current.contains(event.target)) {
      dispatch(setShowPicker(false))
    }
  };

  const onEmojiClickForPost = (e)=>{
    setData({...data,'postContent': data.postContent + e.emoji});
    dispatch(setShowPicker(false));
  }

  const handleEmoji = (e)=>{
    e.preventDefault();
    dispatch(setShowPicker(true));
  }

  useEffect(()=>{
     document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  },[])
  return (
        <section className="md:ml-20 ml-8">
          <div className="flex gap-28">

   <input type='file' name="resource"
   onChange = {(e) => handleChangeForPosts(e,data,setData)}
   id="post-img-btn" hidden />

   <div  className = "flex flex-col justify-center w-80">
    {
    data.resource.startsWith(`data:video/mp4`)?
    <video autoPlay={true}>
      <source src={data.resource} type="video/mp4" />
    </video>
    :(data.resource.startsWith('data:image/jpeg') || data.resource.startsWith('data:image/png'))
    ? 
    <img src = {data?.resource} id = "img" className = 'w-full h-40 '/>
    : 
    <FaImage className='w-full h-40 border-2'/>
    }
    <label htmlFor='post-img-btn' className = "btn btn-neutral my-2">Choose File</label>
    <div className = "flex justify-between items-center my-2">

    <button 
         className="ml-4 inset-y-0 end-0 flex items-center pe-3 hover:cursor-pointer"
         onClick={handleEmoji}
        >
          <BsEmojiSmile />
        </button>
        {
          showPicker &&  <div className="absolute z-10 mt-2" ref={pickerRefPost}><Picker  
          onEmojiClick={onEmojiClickForPost}
          />
          </div>
        }

     <p className='flex w-full justify-end '>{MAX_CHAR-data.postContent.length}/200 characters left</p>
      </div>
    <textarea  className='w-full h-40  border-2 border-gray-800 px-2  rounded-lg' placeholder='post Content(Max 200 characters) Use # for Better Reach of post'
    onChange={(e)=>handleChangeForPosts(e,data,setData)}
    value={data.postContent} 
    name="postContent"
    maxLength={200}
    />


    <div className="">      
      <form method="">
        <button htmlFor="btn" id="post-btn" type="submit" 
         className='btn btn-secondary mt-2 w-full'
      disabled={postsButtonLoading}
      onClick={handleSubmit}
        >{
          postsButtonLoading?<span className="loading loading-spinner "></span>:'POST'
        }</button>
       </form>
    </div>
</div>
<TrendingTopics/>
    </div>

    </section>

  )
}

export default CreatePostPage
