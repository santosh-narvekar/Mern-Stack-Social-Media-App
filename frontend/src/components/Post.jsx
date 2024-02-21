import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { followUnfollowUser, getLoggedInUser } from "../../features/userFeatures"
import {  useState } from "react"
import PostActions from "./PostActions"
import UserActions from "./UserActions"
import Actions from "./Actions"
import { FaHeart } from "react-icons/fa6"
import { likeUnlikePost } from "../../features/postFeatures"

const Post = ({postId,postData,curIndex}) => {
  const {_id:loggedInUserId,following} = useSelector(state=>state.loggedIn.loggedInUser);
  const {buttonLoading} = useSelector(state => state.loggedIn);
  const {postsButtonLoading} = useSelector(state => state.post);
  const [data,setData]=useState({resource:postData.resource,postContent:postData.postContent})
  const userId = postData?.user?._id;
  const params=useParams();
  const {postId:paramPostId} = params;
    
    let options={
      root:null, // needs to be the parent of the object we are observing
      rootMargin:'0px',
      threshold:0.5 // visible by 50% of its root(parent) area
    };

    let callBack=(entries,observer)=>{
      entries.forEach(entry=>{
          if(entry.isIntersecting){
            entry.target.play()
            
          }else{
            entry.target.pause();
        }  
      })
    }


    setTimeout(()=>{
    const observer = new IntersectionObserver(callBack,options)
    try{
      observer?.observe(document.querySelector(`#video-container${curIndex+1}`))
    }catch(err){
      //
    }
  },1000)
     
    const dispatch = useDispatch();

    const handleLikeByPost=()=>{
    dispatch(likeUnlikePost(postData._id));   
    const like = document.getElementById(`likeEffect${curIndex+1}`);
    like.style.opacity=1
     setTimeout(() => {
            like.style.opacity = 0;
     }, 1000); 
  }
  return (
    <>
      <div className="relative max-h-4/5  sm:w-96 w-11/12 mx-4  flex flex-col border-gray-200  border-2 p-8 mb-2 sm:p-6 pr-2 pl-2 rounded-lg">
       <div className="flex items-center justify-between mb-2">
          <div className="flex flex-row gap-2 items-center">
          {
            postData?.user?.photo?<img src={postData.user.photo} className="w-12 h-12 rounded-full" alt="userProfilePic"/>
            :<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-12 h-12"><path fill="#808389" d="M399 384.2C376.9 345.8 335.4 320 288 320H224c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z"/></svg>
          }
          <p className="font-bold hover:cursor-pointer text-wrap break-all">
            <Link to={`/profile/${postData?.user._id}`}>
            {postData.user.username}
            </Link>
          </p>
            </div>

         {
          postData.postedBy === loggedInUserId?<PostActions 
          postsButtonLoading={postsButtonLoading}
          postData={postData}
          userId={userId}
          postId = {postId}
          IdInParams = {paramPostId}
          data={data}
          setData={setData}
          />
          :<UserActions
           loggedInUserId={loggedInUserId} 
           buttonLoading={buttonLoading} 
           following={following} 
          _id={userId}
          postId={postId}
          curIndex={curIndex}
          />
  } 
      </div>

      <div
      id={`resource${curIndex+1}`} className="relative" 
      onDoubleClick={handleLikeByPost}
      >
      {
        postData.resource.includes('/video/upload')?
        <video  className="md:max-w-2/3 max-w-screen md:h-64 rounded-t-lg mt-2   "
        controls playsInline={true} 
        id={`video-container${curIndex+1}`}
      >
        <source src={postData?.resource} type="video/mp4"/>
        </video>
      
      :<img
      id="resource"
      src={postData.resource}   className="md:max-w-2/3 max-w-screen md:h-64 rounded-t-lg  mt-2 "/>
      }
        <div
        id={`likeEffect${curIndex+1}`}
        className="absolute left-1/2 top-1/2 text-6xl md:text-8xl 
            opacity-0 transition duration-500 ease-in-out transform -translate-x-1/2 -translate-y-1/2 scale-x-150 scale-y-150
            "><FaHeart fill ={
              postData.likes && postData?.likes.includes(loggedInUserId)?'#ff314a':'#ffffff'}/>
            </div>
</div>
{
paramPostId?
<Actions postData={postData} postId={paramPostId} loggedInUserId={loggedInUserId}  curIndex={curIndex}
/>
:
<Actions postData={postData} postId={postId}  loggedInUserId={loggedInUserId}   curIndex={curIndex}/>
}
{postId && <hr className="bg-black flex items-center"/>}
</div>
 </>   
  )
}

export default Post
