import React from 'react'
import { FaCircleUser } from 'react-icons/fa6'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { followUnfollowUser, getLoggedInUser } from '../../features/userFeatures'
import { likeUnlikePost } from '../../features/postFeatures'

const SearchUserComponent = ({userProfile,username,_id,followers}) => {
  const dispatch = useDispatch();
  const {_id:loggedInUserId}=useSelector(state=>state.loggedIn.loggedInUser);
  const {likeButtonLoading}=useSelector(state=>state.post);
 const {loggedInUser,buttonLoading}=useSelector(state=>state.loggedIn)
  const {postId,id}=useParams()
 
  const handleLike = (e)=>{
    e.preventDefault();
    //dispatch(getLoggedInUser(_id));
    dispatch(likeUnlikePost(postId))
  }

  const handleFollowers=(e)=>{
    e.preventDefault();
    const userId=_id
    //dispatch(getLoggedInUser(_id));
    dispatch(followUnfollowUser(userId));
  }
  return (
    <Link to={`/profile/${_id}`}>
    <div className='flex  flex-row  items-center justify-between w-80 md:w-96 mb-2 '>
      <div className='flex flex-row items-center hover:bg-base-200 active:bg-base-300 px-2  mt-2 mb-2 w-96'>
      <div className='w-20'>
    {
      !userProfile?
      <FaCircleUser className='bg-base-100 w-12 h-12 rounded-full btn-neutral'/>
      :<img src={userProfile}  className="w-12 h-12 rounded-full " alt="userphoto" />
    }
    </div>
    
     <div className='text-1xl font-bold -ml-6'>{username}</div>

      </div>
    {
     postId   && loggedInUserId === _id?
    <button className='w-28 h-10 justify-end bg-base-300 rounded-lg mx-4 px-4 '
    onClick={handleLike}
    disabled={likeButtonLoading}
    >
      <p className=' font-bold  '>
        Remove
      </p>
      </button>
      :loggedInUserId === _id?<></>:
    <button className='w-28 h-10 bg-blue-400 rounded-lg mx-4 px-4'
    onClick={handleFollowers}
    disabled={buttonLoading}
    >
      <p className='font-bold'>
      {loggedInUser?.following?.includes(_id)?'following':'follow'}
      </p>
      </button>
    }
    </div>
    </Link>
  )
}

export default SearchUserComponent
