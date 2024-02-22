import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";
import { feedPosts, getSuggestedPosts } from "../../features/postFeatures";
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
    <section className="mb-4">
      <h1 className="sm:text-4xl text-2xl font-bold ml-4 mb-4 ">FEED</h1>
      <div className="flex gap-28">
      {
        postsLoading || !posts?
        <div className="md:w-96 w-80 flex items-center h-full justify-center">
          <span className="loading loading-ring loading-lg h-20"></span>
        </div>

        :
    <div  className="flex  flex-col w-96 sm:w-96 
     sm:ml-0  ">
      {
       !posts || posts.length==0?<>
        <p className="flex-wrap text-2xl text-wrap ml-4 ">
          YOUR FEED IS EMPTY! FOLLOW SOMEONE TO SEE FEED POSTS!
        </p>
          </>
          :
          posts.map((post,i)=>{
            return <Post key={post._id} postData={post}
                     curIndex={i}
                     postId={post._id} />
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
