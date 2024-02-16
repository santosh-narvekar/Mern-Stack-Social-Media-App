import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const UserPost = ({postId,img}) => {
  const {_id:loggedInUserId}=useSelector(state=>state.loggedIn.loggedInUser)
  return (
    <div className="xl:w-96 xl:h-72  md:w-56 md:h-56 w-28 h-28 md:mb-2 ">
      {
        img?.includes('/video/upload')?
         <Link to={`/profile/${loggedInUserId}/post/${postId}`}>
        <video  className="md:w-full h-full w-full mt-2 border-2 "
         playsInline={true}  muted
        id={`video-container`}
      >
        <source src={img} type="video/mp4"/>
        </video>
        </Link>
      :
      <Link to={`/profile/${loggedInUserId}/post/${postId}`}>
        <img src={img}   className="  md:w-full h-full w-full mt-2 border-2 "/>
      </Link>
      }
    </div>
  )
}

export default UserPost
