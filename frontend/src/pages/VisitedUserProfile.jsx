import {  Outlet, useParams } from "react-router"
import { ProfileComponent } from "../components";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOneUser } from "../../features/userFeatures";
import { getUserPosts } from "../../features/postFeatures";

const VisitedUserProfile = () => {
  const params=useParams();
  const {userId:_id,postId,id} = params;
  const dispatch = useDispatch();
 const {posts}=useSelector(state=>state.post)
 
  useEffect(()=>{
    dispatch(getOneUser(_id));
    dispatch(getUserPosts(_id));
  },[]);

  const {visitedUserData,usersLoading}=useSelector(state=>state.loggedIn);

  return (
    <>
    {
 id || postId?
        <Outlet />: usersLoading?
        <div className="md:w-2/3 w-80 flex justify-center items-center">
          <span className="loading loading-ring loading-lg h-20"></span>
        </div>:
      <ProfileComponent
      username={visitedUserData.username}
      photo={visitedUserData.photo}
      bio={visitedUserData.bio}
      posts={posts}
      followers={visitedUserData.followers}
      following={visitedUserData.following}
      _id={visitedUserData._id}
      />
  }
    </>
  )
}

export default VisitedUserProfile
