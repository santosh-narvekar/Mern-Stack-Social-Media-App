import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router"
import { getFollowers, getFollowing } from "../../features/userFeatures";
import { SearchUserComponent } from "../components";
import TrendingTopics from "./TrendingTopics";

const FollowersFollowing = () => {
  const params = useParams();
  console.log(params)
  const {followersfollowing,id}=params;
  const dispatch = useDispatch();
  const {usersLoading,users}=useSelector(state=>state.loggedIn)
  useEffect(()=>{
    if(followersfollowing=='followers'){
      dispatch(getFollowers(id));
    }else{
      dispatch(getFollowing(id)); 
    }
  },[])
  
  return (
  <div >
      
      {
        usersLoading?<div className='flex w-96 h-96 justify-center items-center'>
          <span className='loading loading-ring loadidng-lg'></span>
        </div>:
        users?.length === 0?
        <p className='text-2xl font-bold'>
           {
            followersfollowing ==='followers' && 'NO Followers yet for this user'
          }
          {
          followersfollowing === 'following' && 'No Following for this user'
          }
        </p>:
        <div className='flex flex-col '>
        {
          users && users?.map((user)=>{
            return <SearchUserComponent key = {user._id} userProfile={user.photo} username={user.username} _id={user._id}
            followers={user.followers} 
            />
          })
        } 
        </div>
      }
      
    <TrendingTopics />
    </div>
  
  )
}

export default FollowersFollowing
