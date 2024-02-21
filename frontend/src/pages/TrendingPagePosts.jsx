import { useDispatch, useSelector } from "react-redux"
import { Post } from "../components";
import { useEffect } from "react";
import {  useParams } from "react-router";
import TrendingTopics from "./TrendingTopics";
import { getTrendingPagePosts } from "../../features/postFeatures";

const TrendingPagePosts = () => {
  const {posts,postsLoading}=useSelector(state=>state.post);
  const dispatch = useDispatch();

  const params = useParams();
  
  const {trendingTopic}=params;
  console.log(trendingTopic)

  useEffect(()=>{
    dispatch(getTrendingPagePosts(trendingTopic))
  },[trendingTopic])
  
  return (
    <>
    {
       !posts?
      <div className="md:w-96 w-80 h-80  flex items-center justify-center">
        <span className="loading loading-ring loading-lg h-20 "></span>
      </div>
      :
     <section className="mb-4 ">
      <p className="text-2xl font-bold mb-4 text-wrap">
         #{trendingTopic}
      </p>
      <div className="flex gap-28">
    <div className="flex  flex-col w-full sm:w-96 ml-0
     sm:ml-0">
      {
        postsLoading?
        <span className="loading loading-ring"></span>
        :posts && posts?.map((post)=>{   
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
