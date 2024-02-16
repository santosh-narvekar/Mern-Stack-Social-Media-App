import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router"
import { CommentOnPost, getAllPostComments, getOnePost } from "../../features/postFeatures";
import ReplyComponent from "../components/ReplyComponent";
import { Link } from "react-router-dom";
import { setShowPicker } from "../../features/userFeatures";
import { BsEmojiSmile } from "react-icons/bs";
import Picker  from "emoji-picker-react";

const CommentLayout = () => {
  const params=useParams();
  const {postId}=params;
  const {postData,postComments,commentLoading} = useSelector(state=>state.post); 
  const dispatch = useDispatch();
  const [comment,setComment]=useState({userComment:''});
  const {showPicker}=useSelector(state=>state.loggedIn);
  const messageRef=useRef(null);
  useEffect(()=>{
    dispatch(getOnePost(postId));
   dispatch(getAllPostComments(postId));
      // document.addEventListener('mousedown',handleClickOutside);
 //   return () => document.removeEventListener('mousedown',handleClickOutside)

  },[postId])


  const onEmojiClickForMessage=(e)=>{
    //e.preventDefault();
    setComment({userComment:comment.userComment+e.emoji})
    dispatch(setShowPicker(false))
  }

  const handlePickerOpen=(e)=>{
    e.preventDefault()
    dispatch(setShowPicker(true))
  }
  

  const handlePostComment = (e)=>{
    e.preventDefault();
    setComment({...comment,[e.target.name]:e.target.value});
  }

  const handleComment = (e) => {
    e.preventDefault();
    dispatch(CommentOnPost({postId,comment}));
    setComment({...comment,userComment:''});
  }

  return (
    <section className="">
{
 !postData?
<div className="md:w-96 w-80 flex items-center justify-center">
<span className="loading loading-ring loading-lg h-20"></span>
</div>
:
<>
       <div className="flex   gap-2  ">
        {
          postData && postData?.user?.photo?
          <img src={postData && postData?.user.photo} className="w-14 h-14 rounded-full "/>
          :
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-14 h-14"><path fill="#808389" d="M399 384.2C376.9 345.8 335.4 320 288 320H224c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z"/></svg>

        }

      <div className="flex flex-wrap md:w-80 w-72 overflow-hidden  ">
        <p className=" font-bold hover:cursor-pointer">
          <Link to={`/profile/${postData?.user?._id}`}>
          {postData && postData?.user?.username}
          </Link>
        <span className="font-normal ml-2 hover:cursor-auto break-all">
          {postData?.postContent}
        </span>
        </p>
      </div>
      </div>
         <hr className="mt-2 bg-blue-600 w-96"/>


<>
{
  commentLoading?
  <div className="md:w-96 w-80 flex justify-center items-center mt-8">
    <span className="loading loading-ring loading-lg"></span>
  </div>
  :
<div className="bg-base-100 xl:h-80 h-4/5 w-full   mt-2">
      <div className="grid grid-cols-2 w-32  mt-8">
        {
          
          postComments?.length === 0?
          <div className="flex flex-row w-96">
                <p className="flex justify-center  font-bold ">
                  NO COMMENTS YET ON THIS POST
                </p>  
              </div>
                  :
                  <section className="flex flex-col h-full">
                  {
                    postComments?.map((userComment,i)=>{
                      return <ReplyComponent key={userComment._id}
                      userId={userComment.userId}
                      postId={userComment.postId}
                      replyId={userComment._id}
                      username={userComment.username}
                      profilePhoto={userComment.userProfile}
                      userCommentText={userComment.text}
                      userComment ={userComment}
                      curIndex={i}
                      />
                    })
                  }
                  </section>
        }
      </div>

</div>
}
</>
<div className="flex   md:fixed xl:top-3/4 fixed top-3/4 sm:top-3/4   lg:mt-20 md:mt-20   mt-12  justify-center md:w-96 w-80  md:ml-2 ml-4 ">
      <input type="text" placeholder="Comment here(Max 200 Characters)" className="input  input-secondary  
      w-full" 
      name='userComment'
      onChange = {handlePostComment}
      value={comment.userComment}
      />
      <button className="bg-base-300  w-12 flex items-center justify-center"
      onClick={handlePickerOpen}
      >
        <BsEmojiSmile/>
      </button>
      {
          showPicker  && <div ref={messageRef} className="z-10 mt-2 fixed top-48 " >
            <Picker onEmojiClick={onEmojiClickForMessage}/>
           </div>
        }
      <button className="text-white pl-2 bg-blue-500 pr-2 w-12"
      onClick={handleComment}
      disabled={commentLoading || comment.userComment==''}
      > Post</button>
      </div>
</>
}      
    </section>
  )
}

export default CommentLayout
