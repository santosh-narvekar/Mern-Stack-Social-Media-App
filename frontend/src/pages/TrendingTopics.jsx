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
    <section className='w-80 h-3/4  border-4 fixed left-2/3 top-20 invisible xl:visible overflow-hidden overflow-y-scroll '>
      <p className='text-2xl font-bold mb-4 mt-2 ml-4 '>Top  Trending On SAPP</p>
      <hr />
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