import { FaHeart, FaRegTrashCan } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux"
import { deletePostComment, likePostComment } from "../../features/postFeatures";
import { Link } from "react-router-dom";

const ReplyComponent = ({username,profilePhoto,userCommentText,userId,postId,replyId,curIndex,userComment}) => {
  const {_id}=useSelector(state=>state.loggedIn.loggedInUser);

  const dispatch = useDispatch();
  
  const handleLike=(e)=>{
    e.preventDefault();
    let commentId=replyId
    dispatch(likePostComment(commentId));
  }

  const handleDelete = (e)=>{
    e.preventDefault();
    const res= window.confirm('do you want to delete this comment?');
    if(res){
      dispatch(deletePostComment(replyId));  
    }
  }
  return (
<>
    <div className="flex gap-2  md:w-96  w-96  ">
      {
        profilePhoto?
        <img src={profilePhoto}
        className='w-14 h-14 rounded-full'
        alt='userProfilePhoto'/>
        :
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-14 h-14"><path fill="#808389" d="M399 384.2C376.9 345.8 335.4 320 288 320H224c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z"/></svg>
      }
      <div className="flex flex-wrap  gap-2  w-96">
        <p className="font-bold hover:cursor-pointer  ">
          
        <Link to={`/profile/${userId}`}>
        {username}  
        </Link>
        <span className="ml-2 font-normal hover:cursor-auto break-all">
         {userCommentText}
         </span>
        </p>
      </div>

      <div className="flex flex-col  items-center gap-2">
      <div className="flex   items-center">
<button onClick={handleLike}>
{
  <svg xmlns="http://www.w3.org/2000/svg" fill={userComment?.likes?.includes(_id)?'red':'transparent'} viewBox="0 0 24 24" strokeWidth={1.0} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
</svg>
  }
</button>
  </div>
<div className="flex gap-2"><p className="text-gray">
  {userComment?.likes?.length} 
  </p><p> likes</p>
    </div>
      <button onClick={handleDelete}>
      {userId==_id?<FaRegTrashCan className="" />:<></>}
      </button>
      </div>
    </div>
  <div className="divider  md:w-96 w-80"></div>
    </>
  )
}

export default ReplyComponent
