import { AiOutlineHome } from "react-icons/ai";

import { IoSearch } from "react-icons/io5";
import { MdOutlineExplore } from "react-icons/md";
import { BiMessageSquareDetail } from "react-icons/bi";
import { FiPlusCircle } from "react-icons/fi";

import { Link } from 'react-router-dom'

const SideNav = () => {
  return (
    <aside className="h-screen flex  ">
      <div className="md:w-64  flex md:flex-col md:gap-12 md:ml-12 fixed  
     md:mt-12 md:top-4  md:h-full align-bottom   bottom-0  pl-6   z-10  h-12  lg:pl-0 
      pb-4 bg-base-200 pt-2 items-center md:bg-base-100  
      ">
    <Link to="/" className="flex md:gap-4  items-center cursor-pointer md:mt-10  ">
        <AiOutlineHome  className="w-8 h-8 "/>
        <p className="md:text-2xl invisible md:visible  ">
          Home
        </p>
    </Link>
    <Link to="/searchPage"  className="flex md:gap-4 items-center cursor-pointer  ">
       <IoSearch className="w-8 h-8"/>
       <p className="md:text-2xl invisible md:visible ">
         Search
       </p>  
    </Link>
    <Link to="/explore" className="flex md:gap-4 items-center cursor-pointer">
         <MdOutlineExplore className="w-8 h-8"/>
        <p className="md:text-2xl invisible md:visible" >
        Explore   
        </p>
    </Link>
    <Link to="/chats" className="flex md:gap-4 items-center cursor-pointer  md:ml-8 ml-0">
      <BiMessageSquareDetail className="w-8 h-8 "/>
      <p className="md:text-2xl invisible md:visible ">  
        Messages
      </p>
     </Link>
  
     <Link to="/createNewPost">
      <div className="flex md:gap-4 items-center cursor-pointer">
      <FiPlusCircle className="w-8 h-8 "/>
      <p className="md:text-2xl invisible md:visible ">Create</p>
      </div>
     </Link>
    </div>
  </aside>
  
  )
}

export default SideNav
