import { Form, useNavigate } from "react-router-dom"
import { FaCircleUser, FaPlus, FaRegTrashCan } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { fileUpload } from "../../utils/FileUpload";
import { toast } from "react-toastify";
import { updateTheUser } from "../../features/userFeatures";

const UpdateProfile = () => {
  const {email,username,name,bio ,photo,_id}=useSelector(state=>state.loggedIn.loggedInUser);
  const {buttonLoading}=useSelector(state=>state.loggedIn);
  const {_id:loggedInUserId}=useSelector(state=>state.loggedIn.loggedInUser);
  const [data,setData]=useState({username,name,bio:bio || 'SAPP USER',photo});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    if(e.target.name === 'photo'){
      e.preventDefault();
      if(e.target.files[0].type==='image/jpeg' || e.target.files[0].type==='image/png'
      || e.target.files[0].type==='image/gif'
      ){
        fileUpload(e,setData,data);
      }else{
        toast.error('only jpg or png files allowed');
      }
    }
    e.preventDefault();
    setData({...data,[e.target.name]:e.target.value});
  }

  const handleUserDataUpdate=async(e)=>{
    e.preventDefault();
    try{
      const res = await dispatch(updateTheUser({_id,userData:data}));
      if(res.type === '/updateUser/fulfilled'){
        navigate(`/profile/${loggedInUserId}/loggedInUser`);
      }
    }catch(err){
      toast.error('something went wrong');
    }
  }

  return (
    <div className="xl:w-96 w-72" >
      <Form className=" rounded  w-6/3  py-12  pt-6    w-96 border-4">
          <div  className="mb-6 flex bg-base-100 justify-center items-center align-top gap-4  my-2">
     {
      data.photo.startsWith('data:image/jpeg') || data.photo.startsWith('data:image/png')  || data.photo
      ?
      <img src={data.photo} className="w-28 h-28 rounded-full " alt='userProfilePage'/>
      :<FaCircleUser  className="btn-neutral w-28 h-28 rounded-full avatar"
       />

      }


     <div className="flex flex-col  gap-1 justify-center  items-start">
    <p className="font-bold mb-2 italic flex items-center">{email}</p>
     <input type="file" id="file-btn" name="photo"
     onChange={handleChange} 
     hidden />

     <label htmlFor = "file-btn"   className="btn h-15 flex justify-center items-center">
     <FaPlus  />
     <h4 >
      Add Photo
      </h4>
      {
        data.photo && <button className="ml-4" onClick={(e)=>{
          e.preventDefault();
          const res= window.confirm('do you want to delete Profile Photo');
          if(res){
            setData({...data,photo:''})
          }
        }}>
          <FaRegTrashCan />
          </button>
      }

     </label>


    </div>
     </div>
      
     
     <input type="text" placeholder="username" 
     value={data.username}
     onChange={handleChange}
     name="username"
     className="pl-4 pr-4   border-2 border-base-300  w-full  h-12 " />
     <input type="text"
     value={data.name}
     onChange={handleChange}
     name="name"
     placeholder="name" className="pl-4 pr-4   border-2 border-base-300  w-full  h-12" />
     <input type="text"

     onChange={handleChange}
     value={data.bio}
     name="bio"
     placeholder="bio (MAX 30 CHARACTERS)" className="pl-4 pr-4   border-2 border-base-300  w-full  h-12" />
     
      <button className="btn btn-primary w-full mt-4"
      onClick={handleUserDataUpdate}
      disabled={buttonLoading}
      >
        {
          buttonLoading?
          <span className="loading loading-spinner"></span>
          :<p className=" text-white">Save Changes</p>
        }
        </button>

      </Form>

    </div>
  )
}

export default UpdateProfile
