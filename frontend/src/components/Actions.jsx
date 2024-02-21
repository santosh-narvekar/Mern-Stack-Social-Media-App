import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {  likeUnlikePost } from '../../features/postFeatures';
import { toast } from 'react-toastify';
import {getPostTime} from '../../utils/getPostTime';
import { useState } from 'react';

const Actions = ({postData,postId,loggedInUserId,curIndex}) => {
  const dispatch = useDispatch();
  const {likeButtonLoading}=useSelector(state=>state.post);
  const [state,setState]=useState(false);
  
  const handlePostLikes=async()=>{
     const el = document.getElementById(`likeButton${curIndex+1}`);
     el.disabled = {likeButtonLoading}
     setState(el.disabled)
     try{
      const res = await dispatch(likeUnlikePost(postId));
      if(res.type==='/likeUnlikePost/fulfilled'){
        setState(false);
        el.disabled = state
      }
      if(res.type==='/likeUnlikePost/rejected'){
        setState(false);
        el.disabled= state
      }
     }catch(err){
      //
     }
  }

   const copyUrl=(e)=>{
    e.preventDefault();
    const currentURL = `${window.location.protocol}://${window.location.hostname}:${window.location.port}/profile/${postData.user._id}/post/${postId}`;
    navigator.clipboard.writeText(currentURL).then(()=>{
      toast.success('post link copied! Now you can share it')
    });
   }

    let curDate = new Date(Date.now());
 
  let postCreatedDate = new Date(postData?.createdAt);
  const divisionResult = getPostTime(postData?.createdAt);

  return (
    <div className=' '>
      <div className='w-full pt-2  flex items-center  justify-between   border-white  '> 
      <button onClick={handlePostLikes}  id={`likeButton${curIndex+1}`}>
        {
          //state?<span className='loading loading-spinner'></span>:
  <svg xmlns="http://www.w3.org/2000/svg" 
  fill={postData?.likes.includes(loggedInUserId)?'red':'transparent'} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"
 
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
  </svg>
    
}
</button>
<Link to={`/post/${postId}/comments`}>
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 hover:cursor-pointer"
>
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" />
</svg>
</Link>

<button onClick={copyUrl}>
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 hover:cursor-pointer">
  <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>
</button>
{
/*
  <div className='text-sm text-white ml-8  md:ml-12'>
      {
        divisionResult == 0 && `just posted now`
      }
        { 
         divisionResult < 24 && divisionResult !== 0 &&  ` ${divisionResult} hours ago` 
        }
        {
          divisionResult >= 24 && ` ${curDate.getDate()-postCreatedDate.getDate()} days ago` 
        }
    </div>
    */
}
      </div>
     
      <div className="flex sm:gap-20  gap-20 mt-2 sm:items-center  items-center  mb-2   ">
        <Link to={`/postLikes/${postData?._id}`}>
       <p className="hover:cursor-pointer pb-4">
       <span className='font-bold'>{postData.likes.length}</span> likes
       </p>
        </Link>
        <p className='pb-4'>
          <span className='font-bold'>{postData?.replies.length} </span> comments
        </p>
       </div>
     


  <div className=' mb-4  w-11/12  overflow-hidden '>
  <p className='font-bold md:align-middle hover:cursor-pointer    break-all text-wrap '>
       <Link to={`/profile/${postData?.user._id}`}>
        {postData.user.username}
       </Link>
 {   
   <Link to={`/post/${postId}/comments`}>
   <span className='hover:cursor-pointer  font-normal ml-2 overflow-scroll'
      id="content">
        {postData.postContent} 
        </span>
        </Link>
    }       
    </p>
    <div className='text-sm text-gray mt-2 flex justify-end '>
      {
        divisionResult == 0 && `just posted now`
      }
        { 
         divisionResult < 24 && divisionResult !== 0 &&  ` ${divisionResult} hours ago` 
        }
        {
          divisionResult >= 24 && ` ${curDate.getDate()-postCreatedDate.getDate()} days ago` 
        }
    </div>
  
    </div>
    </div>
  )
}

export default Actions
