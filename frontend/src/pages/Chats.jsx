import MessageContainer from "../components/MessageContainer"
import Sidebar from "../components/Sidebar"

const Chats = () => {
  return (
    <div className="flex flex-col lg:flex-row sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 w-96 md:w-full
    bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 ">
      
      <Sidebar  />
      <MessageContainer />
    </div>
  )
}

export default Chats
