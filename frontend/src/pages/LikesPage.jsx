import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useParams } from 'react-router';
import { getLikedPosts } from '../../features/postFeatures';
import { SearchUserComponent } from '../components';
import TrendingTopics from './TrendingTopics';

const LikesPage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const {postId}=params
  const {postLikes,postsLoading}=useSelector(state=>state.post)
  useEffect(()=>{
    dispatch(getLikedPosts(postId));
  },[postId])
  
  return (
    <div >
      
      {
        postsLoading?<div className='flex w-96 h-96 justify-center items-center'>
          <span className='loading loading-ring loadidng-lg'></span>
        </div>:
        postLikes?.length === 0?
        <p className='text-2xl font-bold'>
          'NO MORE LIKES ON THIS POST'
        </p>:
        <div className='flex flex-col '>
        {
          postLikes && postLikes?.map((postLike)=>{
            return <SearchUserComponent key = {postLike._id} userProfile={postLike.photo} username={postLike.username} _id={postLike._id}
            followers={postLike.followers}
            />
          })
        } 
        </div>
      }
      
    <TrendingTopics />
    </div>
  )
}

export default LikesPage
