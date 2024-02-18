import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTrendingTopics } from '../../features/postFeatures';
import TrendingComponent from '../components/TrendingComponent';

const TrendingTopics = () => {
  const dispatch = useDispatch();
  const {trendingTopics,trendingTopicsLoad}=useSelector(state=>state.post)

  useEffect(()=>{
     dispatch(getTrendingTopics());
  },[])

  return (
    <section className='xl:visible invisible fixed top-20 left-2/3   border-2 border-gray-500 overflow-visible h-5/6 overflow-y-scroll
    
    '>
      <p className='text-2xl font-bold mb-4 mt-2 ml-4 z-10'>Trending#</p>
      {
        trendingTopicsLoad?<span className='loading loading-ring'></span>:
        trendingTopics.length === 0 ?'NO TREND STARTED YET':trendingTopics?.map((topic,i)=>{
          return <TrendingComponent 
          curIndex={i+1}
          key = {topic.word} trendName={topic.word} postCount = {topic.count}/>
        })
      }
      
    </section>
  )
}

export default TrendingTopics