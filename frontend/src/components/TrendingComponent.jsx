import { Link } from "react-router-dom"
import TrendingTopics from "../pages/TrendingTopics"

const TrendingComponent = ({trendName,postCount,curIndex}) => {

  return (
    <div className='w-80 h-12 flex flex-col gap-6 mb-2    '>
        <div className='flex gap-2 h-8 ml-4 '>
          <svg xmlns="http://www.w3.org/2000/svg" fill="#fdcf58	" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 rounded">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z" />
</svg>

          <div className="badge badge-primary badge-sm mt-2">{curIndex}</div>
        <div className='flex flex-col'>    
     
     <Link to = {`/trending/${trendName?.split('').splice(1).join('')}`}>
        <p className='font-bold hover:cursor-pointer '>
          {trendName}</p>
     </Link>
        <p>{postCount} tags</p>
        </div>
        </div>
      </div>

  )
}

export default TrendingComponent
