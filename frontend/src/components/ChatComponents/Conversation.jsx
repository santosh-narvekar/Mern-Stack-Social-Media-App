import { useContext } from "react"
import { Link } from "react-router-dom";
import { SocketContext } from "../../context/SocketContext";

const Conversation = ({photo,username,lastIndex,curIndex,id}) => {
  const {onlineUsers} = useContext(SocketContext);

 return (
    <>
    <Link to={`messages/${id}`}>

        <div className={`flex gap-2 items-center hover:bg-sky-500 rounded md:px-2 py-1 cursor-pointer`}
        >
          <div className={`avatar ${onlineUsers?.includes(id)?'online':''}`}>
            <div className='w-12 h-12 rounded-full'>
              {
                photo?<img src={photo} alt="user photo"/>
               : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#808389" d="M399 384.2C376.9 345.8 335.4 320 288 320H224c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z"/></svg>
              }
            </div>
          </div>

          <div className='flex flex-col flex-1'>
            <div className='flex gap-3 justify-between'>
              <p className='font-bold text-gray-200'>{username}</p>
              <span className='text-xl'>#</span>
            </div>

          </div>

        </div>
          </Link>

{
  !lastIndex &&   <div className='divider my-0 py-0 h-1'></div>

}       
    </>
  )
}

export default Conversation
