import { useEffect, useState } from 'react';
import { FaCircleUser } from 'react-icons/fa6'
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../features/userFeatures';
import { SearchUserComponent } from '../components';
import TrendingTopics from './TrendingTopics';

let filteredUsers=[];
const SearchPage = () => {
  const {users}=useSelector(state=>state.loggedIn);
  const [userSearch,setUserSearch]=useState('');
  // const userSearch='';
  
    useEffect(()=>{
      dispatch(getAllUsers());
    },[])
 
    const handleSearch=(e)=>{
      e.preventDefault();
      const searchEle = e.target.value.slice(-1).toLowerCase();
      setUserSearch(e.target.value);
      
      if(searchEle=="" || searchEle==" "){
        return filteredUsers=[]
      }else{
        filteredUsers = users?.filter((user)=>{
          return user.username.toLowerCase().startsWith(searchEle) || user.username.toLowerCase().includes(searchEle);
        })
      }
    
  }
  const dispatch = useDispatch();

  return (
    <section className='flex flex-col h-4/5'>
      <div className='flex gap-28'>

    <div className=" md:justify-center
    md:w-96 w-72  justify-start items-center  
    ">
     <input type="search" 
     value={userSearch}
     onChange = {handleSearch}
     placeholder="Search" 
     className="input input-bordered md:w-96 w-80 md:ml-12 ml-4  max-w-full"
    />
     <div className="overflow overflow-hidden overflow-y-scroll md:ml-12 ml-8 md:w-96 max-w-full md:h-96 h-80 flex flex-col mt-8 ">
      {
       filteredUsers?.map((user)=>{
          return <SearchUserComponent key={user._id} _id={user._id} userProfile={user.photo} username={user.username} />
        })
      }
    </div>
    </div>
    <TrendingTopics/>
      </div>
    </section>
  )
}

export default SearchPage
