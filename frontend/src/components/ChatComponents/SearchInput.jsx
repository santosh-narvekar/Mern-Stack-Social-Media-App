import  { useState } from 'react'
import { IoSearchSharp } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux';

const SearchInput = ({handleInputChange}) => {
  const dispatch = useDispatch()
  const [search,setSearch]=useState("");
  const {chatUsers} = useSelector(state=>state.loggedIn);
  

  return (
    <form className='flex items-center gap-2'
     //onSubmit={handleSubmit}
      >
       <input
        type="text" placeholder='find your friends to chat' 
        value={search}
        onChange={(e)=>handleInputChange(e,search,setSearch)}
        className='input input-bordered rounded-full'
       />
       {/*<button 
       type='submit'
       className='btn btn-circle bg-sky-500 text-white'>
       <IoSearchSharp className='w-6 h-6 outline-none'/>
       </button>
       */}
    </form>
  )
}

export default SearchInput
