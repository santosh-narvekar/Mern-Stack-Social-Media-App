
import SearchInput from './ChatComponents/SearchInput'
import Conversations from './ChatComponents/Conversations'
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const Sidebar = () => {
  const {chatUsers}=useSelector(state=>state.loggedIn);

  let [filteredUsers,setFilteredUsers]=useState([]);

  const handleInputChange=(e,search,setSearch)=>{
    e.preventDefault();
    setSearch(e.target.value);
    setFilteredUsers(chatUsers?.filter(user=>user.username.toLowerCase().includes(e.target.value.toLowerCase()))) 
  } 

  return (
    <div className='lg:border-r border-slate-500 
    h-80 lg:h-full
    p-4 flex flex-col ml-6 md:ml-4 lg:ml-2 md:w-full '>
      <SearchInput  handleInputChange={handleInputChange} />
      <Conversations filteredUsers={filteredUsers} />
    </div>
  )
}

export default Sidebar
