import UpdateModal from './UpdateModal';
import { FaRegTrashCan } from 'react-icons/fa6';
import { TiPencil } from 'react-icons/ti';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost, getOnePost } from '../../features/postFeatures';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { handleChangeForPosts } from '../../utils/handleChangeForPosts';

const PostActions = ({postsButtonLoading,postId,postData,IdInParams,userId,data,setData}) => {
  const dispatch = useDispatch();
  const handlePostDelete=async()=>{
    const postId=IdInParams;
    const res = window.confirm('are you sure you want to delete this post');
    console.log(res);
    
    if(res){
      try{
       const response= await dispatch(deletePost(postId));
       if(response.type===`/deletePost/fulfilled`){
        window.history.back()
       }
      }catch(err){
        //
      }
    }
}

return (
    <div className='flex flex-row  gap-2 items-center '>
      {
        !IdInParams?
        <Link to={`/profile/${userId}/post/${postId}`}>
        <button className='w-28 h-10 justify-end bg-base-300 rounded-lg px-2 border-white'>
          <p
          className=" font-bold" 
          >
          Visit Post
          </p>
        </button>
            </Link>
      :
      <>
      {
        postsButtonLoading ?
        <button 
        disabled={postsButtonLoading}
        className='w-12 h-10 justify-end bg-base-300 rounded-lg px-2'>
          <span className="loading loading-spinner"></span>
        </button>
       :<button onClick={()=>{
        setData({resource:postData.resource,postContent:postData.postContent})
        document.getElementById('my_modal_5').showModal();
        }}
        disabled={postsButtonLoading}>
        <div className='flex gap-4'>
              <TiPencil  className='h-10 w-12 bg-base-200 py-2 px-2 hover:cursor-pointer' />
        </div>
       
      </button>
      }

{
  postsButtonLoading?
        <button 
        disabled={postsButtonLoading}
        className='w-12 h-10 justify-end bg-base-300 rounded-lg px-2'>
          <span className="loading loading-spinner"></span>
        </button>
  
  :<button
  onClick={handlePostDelete}
  >
         <FaRegTrashCan className='h-10 w-12 bg-base-200 py-2 px-2 hover:cursor-pointer'/> 
      </button>
}

 <UpdateModal 
   id={'my_modal_5'}
   postData={postData}
   data={data}
   setData={setData}
   />

   </>
      }
          </div>
  )
}

export default PostActions
