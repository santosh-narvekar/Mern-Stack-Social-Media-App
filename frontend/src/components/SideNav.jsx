import { AiOutlineHome } from "react-icons/ai";

import { IoSearch } from "react-icons/io5";
import { MdOutlineExplore } from "react-icons/md";
import { BiMessageSquareDetail } from "react-icons/bi";
import { FiPlusCircle } from "react-icons/fi";
import { Link } from 'react-router-dom'

const SideNav = () => {
  return (
    <aside className="h-screen  flex gap-12">
      <div className="sm:w-56  flex sm:flex-col fixed  mt-16
     sm:top-4  sm:h-full align-bottom  bottom-0  z-10  h-12 pt-2 pb-2 md:pb-0 md:pt-0 
     sm:gap-4 bg-base-300 sm:bg-base-100  w-full  flex-row justify-center       sm:justify-start pl-12">
    <Link to="/" className="flex sm:gap-4  items-center cursor-pointer  sm:px-4 sm:py-4 ">
        <AiOutlineHome  className="w-6 h-6  "/>
        <p className="sm:text-xl invisible sm:visible  ">
          Home
        </p>
    </Link>
    <Link to="/searchPage"  className="flex sm:gap-4 items-center cursor-pointer  sm:px-4   sm:py-4">
       <IoSearch className="w-6 h-6 "/>
       <p className="sm:text-xl invisible sm:visible ">
         Search
       </p>  
    </Link>
    <Link to="/explore" className="flex sm:gap-4    items-center cursor-pointer  sm:px-4 sm:py-4 ">
         <MdOutlineExplore className="w-6 h-6 "/>
        <p className="sm:text-xl invisible sm:visible" >
        Explore   
        </p>
    </Link>
    <Link to="/chats" className="flex sm:gap-4  items-center cursor-pointer  sm:px-4 sm:py-4">
      <BiMessageSquareDetail className="w-6 h-6"/>
      <p className="sm:text-xl invisible sm:visible ">  
        Chats
      </p>
     </Link>
  
     <Link to="/createNewPost" className="flex sm:gap-4  items-center cursor-pointer   sm:px-4 sm:py-4 " >
      <div className="flex sm:gap-4 items-center cursor-pointer ">
      <FiPlusCircle className="w-6 h-6"/>
      <p className="sm:text-xl invisible sm:visible ">Create</p>
      </div>
     </Link>
    </div>
      <div className="divider divider-neutral"></div>
  </aside>
  )
}

export default SideNav
