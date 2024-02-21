import  { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TrendingComponent from '../components/TrendingComponent';
import { getTrendingTopics } from '../../features/postFeatures';

const MediumSScreenTrendingPage = () => {
  const dispatch = useDispatch();
  const {TrendingTopicsLoad,trendingTopics}=useSelector(state=>state.post)
  useEffect(()=>{
    dispatch(getTrendingTopics())
  },[])

  return (
    <section className='w-80 mt-4 mr-4 h-3/4  border-4 fixed left-8 md:left-80 md:h-2/4  top-20 visible overflow-hidden overflow-y-scroll lg:h-4/5 md:ml-0  xl:invisible'>
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

export default MediumSScreenTrendingPage