import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TrendingComponent from '../components/TrendingComponent';

const TrendingTopics = () => {
  const dispatch = useDispatch();
  const {TrendingTopicsLoad,trendingTopics}=useSelector(state=>state.post)
  
  return (
    <section className='xl:visible invisible fixed top-20 left-2/3   border-2 border-gray-500 overflow-visible h-5/6 overflow-y-scroll
    '>
      <p className='text-2xl font-bold mb-4 mt-2 ml-4 z-10'>Trending#</p>
       {
        TrendingTopicsLoad?
        <div className='w-full flex items-center justify-center'>
          <span className='loading loading-ring '></span>
        </div>
        :trendingTopics.length==0?
        <p className='text-2xl ml-4'> No Trend Started Yet Now! </p>
        :trendingTopics?.map((topic,i)=>{
          return <TrendingComponent key={topic._id} curIndex={i+1} trendName={topic._id}
          NoOfPosts={topic.count}
          /> 
        })
       }
    </section>
  )
}

export default TrendingTopics