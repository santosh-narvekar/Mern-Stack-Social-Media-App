
import { Outlet, useNavigate, useParams } from "react-router"
import { ProfileComponent, UserPost } from "../components"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getLoggedInUser } from "../../features/userFeatures";
import { getUserPosts } from "../../features/postFeatures";

const Profile = () => {
  const params = useParams();
  const {postId,updateProfile,id} = params;
  const {username,followers,following,photo,_id,bio}=useSelector(state => state.loggedIn.loggedInUser);
  const {posts}=useSelector(state=>state.post)

  const {usersLoading}=useSelector(state=>state.loggedIn)
  const dispatch = useDispatch();
  console.log(params)

  useEffect(()=>{
     dispatch(getLoggedInUser(_id));
     dispatch(getUserPosts(_id));
  },[])

  return (
    <>
    {
      updateProfile || postId || id?
        <Outlet />:usersLoading || !posts?
        <div className="md:w-96  w-80 h-80 flex items-center justify-center">
          <span className="loading loading-ring loading-lg"></span>
        </div>
        :<ProfileComponent photo={photo} 
        username={username} 
        posts={posts}
        followers={followers}
        following={following}
        _id={_id} 
        bio={bio}
      />
}
 </>
  )
}

export default Profile
