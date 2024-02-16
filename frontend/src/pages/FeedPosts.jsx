import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";
import { feedPosts, getSuggestedPosts, getTrendingTopics } from "../../features/postFeatures";
import Post from "../components/Post";
import TrendingTopics from "./TrendingTopics";
import { FaFire } from "react-icons/fa6";

const FeedPosts = () => {
  const dispatch = useDispatch();
  const {posts,postsLoading}=useSelector(state=>state.post);
  const {following}=useSelector(state=>state.loggedIn.loggedInUser);

  useEffect(()=>{
      dispatch(feedPosts());
  },[])

  return (
    <section className="mb-8 ml-4 ">
      <h1 className=" text-4xl font-bold  mb-4">FEED</h1>
      <div className="flex gap-28">
      {
        postsLoading || !posts?
        <div className="md:w-96 w-80 flex items-center h-full justify-center">
          <span className="loading loading-ring loading-lg h-20"></span>
        </div>

        :
    <div  className="flex flex-col ">
      {
       !posts || posts.length==0?<>
        <p className="text-2xl w-96 flex-wrap mb-4 ">
         'NO POSTS IN FEED! FOLLOW SOMEONE TO SEE MORE FEED POSTS' 
        </p>
        <div className="w-96 mt-2 "> 

      </div>
          </>
          :
          posts.map((post)=>{
          return <Post key={post._id} postData={post} postId={post._id} />
        })
      }
    </div>
      }
      <TrendingTopics/>
        </div>
    </section>
  )
}

export default FeedPosts
