import { Link } from "react-router-dom"
import UserPost from "./UserPost"
import { useDispatch, useSelector } from "react-redux"
import { followUnfollowUser } from "../../features/userFeatures";
import { FaPlus } from "react-icons/fa6";
import { BiGrid } from "react-icons/bi";

const ProfileComponent = ({photo,username,posts,followers,following,bio,_id}) => {
  const {_id:loggedInUserId} = useSelector(state => state.loggedIn.loggedInUser);
  const {buttonLoading} = useSelector(state=>state.loggedIn);
  const dispatch = useDispatch();

  const handleUserFollowing = (e) => {
    e.preventDefault();
    dispatch(followUnfollowUser(_id));
  }

  return (
     <section className="mt-8 h-full w-full">
        <div className="flex md:gap-8 gap-4 xl:ml-20  ml-2 mb-8  md:items-center  ">
          {
            !photo?
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="md:w-32 lg:w-40  md:h-40 w-28 h-28"><path fill="#808389" d="M399 384.2C376.9 345.8 335.4 320 288 320H224c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z"/></svg>
            :
            <img src={photo} className="md:w-32 lg:w-40  md:h-40 w-28 h-28 rounded-full" alt='userProfilePhoto' />
          }
     
     <div className="flex flex-col md:gap-6 gap-2 mt-0    ">
        <div className="flex md:gap-4  md:items-center xl:flex-row md:h-16  
        flex-col h-16 mb-4
        ">
          <p className="text-2xl font-bold  ">{username}</p>
        
        <div  className="flex gap-4 md:gap-2   items-center">

          {
            loggedInUserId==_id?
            <Link to={`/profile/${loggedInUserId}/loggedInUser/:updateProfile`}>  
              <button className="py-2 bg-base-300 sm:w-28 h-10 mt-2 w-24 rounded-lg">
                <p className="font-bold">
                Edit Profile
                </p>
                </button>
          </Link>:
              <button 
              disabled={buttonLoading}
              onClick={handleUserFollowing}
              className="py-2  bg-base-300 sm:w-28 h-10 mt-2 w-24 rounded-lg">
               {
                buttonLoading?
                <span className="loading loading-spinner "></span>
                :<p className="font-bold">
                {
                  followers?.includes(loggedInUserId)?
                  'following':'follow'
                }
                </p>
               }
            </button>    
          }
        
          <button className="px-4 bg-base-300 py-2  
          mt-2 l md:w-28 md:h-10 rounded-lg w-28 h-10
          "
          onClick={(e)=>{
            e.preventDefault();
            document.getElementById('my_modal_5').showModal()
          }}>
           <p className="font-bold">
            About Me
            </p>

          </button>
            </div>


        </div>

<dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
  <div className="modal-box">
    <form method="dialog">
      <button className="btn btn-sm btn-circle  absolute right-2 top-2">✕</button>
         <textarea
        className='w-full mt-2 border-2 border-gray-800 px-2 py-2 rounded-lg'
        value={bio || 'SAPP USER'} 
        readOnly={true}
        />
        </form>
  </div>
</dialog>

        <div className="flex md:gap-8  flex-row  md:items-center mt-2  md:mt-0 gap-2 items-center  ">


          <p className="font-normal "><span className="font-bold">
            {posts?.length}
            </span> posts</p>
            <Link to={`/followers/${_id}`}>
          <p className="font-normal hover:cursor-pointer">
            <span className="font-bold">
            {followers?.length} 
            </span> followers
            </p>
            </Link>
            
            <Link to={`/following/${_id}`}>
          <p className="font-normal hover:cursor-pointer">
            <span className="font-bold">
            {following?.length}
            </span> following</p>
            </Link>
        </div>
      </div>
     </div>

<div className="w-1/3 flex justify-center lg:ml-28 md:ml-16 md:w-72 ml-32 ">
<BiGrid className="w-8 h-8"/>
</div>

{
  loggedInUserId===_id && posts.length==0?
  <div className="flex flex-col  md:w-1/2 gap-2 md:justify-center w-80  ml-6   md:ml-24 items-center  md:mt-24 mt-12 
  lg:ml-32
  ">
      <h4 className='text-3xl font-bold '>Profile</h4>
      <p className='text-1xl font-bold text-gray-400'>Share your first post</p>
      
      <Link to={'/createNewPost'}>
      <button  className='btn btn-neutral py-2 px-4 mb-5'
      >
        <FaPlus></FaPlus>
        </button>
        </Link>
      
   </div>
  :posts?.length==0?
  <div className="flex w-96  
  
  md:justify-center ml-4   items-center  md:mt-20 mt-12">
   <p className=" font-bold ">
   NO POSTS FROM THIS USER YET!
  </p>
  </div>
  :<div className="grid  sm:grid-cols-2  grid-cols-3  gap-0 h-full 
    mx-4
    lg:ml-0 md:ml-2 mb-8 ">
     {
      posts?.map((post)=>{
         return <UserPost key={post._id}
         img={post.resource} 
         postId={post._id}
         />
      })
     }
</div>
}

     </section>
  )
}

export default ProfileComponent
