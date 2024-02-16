import { useDispatch, useSelector } from "react-redux"
import { Post } from "../components";
import { useEffect } from "react";
import { Outlet, useParams } from "react-router";
import { getTrendingPost } from "../../features/postFeatures";
import TrendingTopics from "./TrendingTopics";

const TrendingPagePosts = () => {
  const {posts,postsLoading}=useSelector(state=>state.post);
  const dispatch = useDispatch();

  const params=useParams();
  
  const {trendingTopic}=params;
  console.log(trendingTopic)

  useEffect(()=>{
    dispatch(getTrendingPost(trendingTopic))
  },[trendingTopic])
  
  return (
    <>
    {
       !posts?
      <div className="md:w-96 w-80 h-80  flex items-center justify-center">
        <span className="loading loading-ring loading-lg h-20 "></span>
      </div>
      :
     <section className="mb-4 ml-4 ">
      <p className="text-2xl font-bold mb-4 text-wrap">
         TRENDING TOPICS FOR {trendingTopic}
      </p>
      <div className="flex gap-28">
    <div className="flex flex-col ">
      {
        posts && posts?.map((post)=>{   
          return <Post key={post._id} postData={post}  
          postId={post._id} 
        />})
      }
    </div>
          </div>
          <TrendingTopics/>
    </section>
    }
  </>
  )
}

export default TrendingPagePosts
