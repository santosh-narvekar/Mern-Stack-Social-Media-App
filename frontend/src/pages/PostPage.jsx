import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  useParams } from "react-router"
import { getOnePost } from "../../features/postFeatures";
import Post from "../components/Post";

const PostPage = () => {
  const params = useParams();
  const {postId} = params;
  const {loggedInUserId}=params
  const {postData,postsLoading}  = useSelector(state=>state.post)
  const dispatch = useDispatch();
  

  useEffect(()=>{
     dispatch(getOnePost(postId)); 
  },[postId])

  return (
<>    
{
  postsLoading?<div className="md:w-96 w-80 flex justify-center items-center">
    <span className="loading loading-ring loading-lg h-20"></span>
    </div>
    :'_id' in postData && <div className="ml-4">
      <Post postData={postData}   />       
    </div> 
}
</>
  )
}

export default PostPage
