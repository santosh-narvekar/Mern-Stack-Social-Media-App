import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Link, useNavigate } from 'react-router-dom'
import { logTheUser } from '../../features/userFeatures'
import { toast } from 'react-toastify'

const Login = () => {  
  const {buttonLoading}=useSelector(state=>state.loggedIn)
  const [userData,setUserData]=useState({email:'',password:''});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e)=>{
    e.preventDefault();
    setUserData({...userData,[e.target.name]:e.target.value});
  }

  const logUser=async(e)=>{
    e.preventDefault();  
    try{
      const res = await dispatch(logTheUser(userData));
      if(res.type === '/logUser/fulfilled'){
        navigate(`/`);
      }
      setUserData({email:'',password:''});
    }catch(err){
      toast.error('something went wrong');
    }
  }  
  
  return (
   <section className="card rounded-lg border-2  shadow-xl bg-base-100   sm:mt-4 mt-8 w-80 sm:w-96 mx-auto my-10">
  <Form method="post" className="mx-auto sm:w-80 w-72 px-1" id="login-form">
    <h1 className="font-lg italic  font-bold  text-gray-700  text-center my-5 text-5xl">SAPP</h1>
    <h4 className="italic my-3 text-center">Login to see the activity from your friends.</h4>
     <input placeholder="Email"
     value={userData.email} 
     onChange={handleChange}
     name="email"
     required
     className="rounded-lg border-0 px-4 py-2 my-1 w-full mx-auto bg-base-200">
    </input>
     <input
     value={userData.password}
     onChange={handleChange}
     name="password"
     required
     placeholder="Password" className="rounded-lg border-0 px-4 py-2 my-1 w-full mx-auto bg-base-200">
    </input>    
     <button 
     className="btn btn-secondary w-full h-30 rounded-lg px-4  my-1 " 

     onClick={logUser}
     disabled={buttonLoading}
     >
       {
         buttonLoading?<span className="loading loading-spinner"></span>: 
         <h4 className="text-xl">Log In</h4>
       }  
     </button>
     </Form>
    <h4 className="text-center my-5">New Member?<Link to="/signUp" >Sign Up</Link></h4>
  </section>

  )
}

export default Login
