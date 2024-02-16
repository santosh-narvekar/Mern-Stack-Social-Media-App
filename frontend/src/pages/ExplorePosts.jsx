import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";
import { getAllPosts } from "../../features/postFeatures";
import Post from "../components/Post";
import TrendingTopics from "./TrendingTopics";
import { Outlet, useParams } from "react-router";
import TrendingPagePosts from "./TrendingPagePosts";

const ExplorePosts = () => {
  const dispatch = useDispatch();
  const {posts,postsLoading}=useSelector(state=>state.post);
 const params = useParams();
 //const {trendingTopic}=params;
  useEffect(()=>{
    dispatch(getAllPosts());
  },[])

  return (
    <>
    {
//      trendingTopic?<Outlet/>:
      postsLoading || !posts?
      <div className="md:w-96 w-80 h-80  flex items-center justify-center">
        <span className="loading loading-ring loading-lg h-20 "></span>
      </div>
    
      :
     <section className="mb-4 ml-4 ">
      <div className="flex gap-28">
    <div className="flex flex-col ">
      {
        posts && posts?.map((post,i)=>{   
          return <Post key={post._id} postData={post}  
          postId={post._id} curIndex={i} 
        />})
      }
    </div>
          </div>

    </section>
      }
      <TrendingTopics />
      </>
  )
}

export default ExplorePosts
