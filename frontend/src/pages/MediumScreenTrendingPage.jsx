import  { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTrendingTopics } from '../../features/postFeatures';
import TrendingComponent from '../components/TrendingComponent';

const MediumSScreenTrendingPage = () => {
  const dispatch = useDispatch();
  const {trendingTopics,trendingTopicsLoad}=useSelector(state=>state.post)
  useEffect(()=>{
     dispatch(getTrendingTopics());
  },[])

  return (
    <section className='w-80 h-3/4  border-4 fixed left-8 md:left-80 md:h-2/4  top-20 visible overflow-hidden overflow-y-scroll lg:h-4/5 md:ml-0 ml-2 xl:invisible'>
      <p className='text-2xl font-bold mb-4 mt-2 ml-4 z-10'>Trending#</p>
      <hr/>
      {
        trendingTopicsLoad?<span className='loading loading-ring'></span>:
        trendingTopics.length==0?<p className='text-2xl font-bold'>NO TREND STARTED YET!</p>:
        trendingTopics?.map((topic,i)=>{
          return <TrendingComponent 
          curIndex={i}
          key = {topic.word} trendName={topic.word} postCount = {topic.count}/>
        })
      }
      
    </section>
  )
}

export default MediumSScreenTrendingPage