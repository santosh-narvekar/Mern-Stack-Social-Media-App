import MessageContainer from "../components/MessageContainer"
import Sidebar from "../components/Sidebar"

const Chats = () => {
  return (
    <div className="flex flex-col lg:flex-row max-h-[520px] mt-2 sm:mt-8  md:h-[750px] rounded-lg overflow-hidden  min-w-[350px] 
    md:w-full bg-opacity-0 ">
      
      <Sidebar  />
      <MessageContainer />
    </div>
  )
}

export default Chats
