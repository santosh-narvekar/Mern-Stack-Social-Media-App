
import { useDispatch, useSelector } from "react-redux"
import { Form, Link } from "react-router-dom"
import { createNewUser } from "../../features/userFeatures";
import { useState } from "react";

const SignUp = () => {
  const {buttonLoading}=useSelector(state=>state.loggedIn);
  const dispatch = useDispatch();
  const [userData,setUserData] = useState({name:'',username:'',email:'',password:''});

   const handleChange = (e) => {
    e.preventDefault();
    setUserData({...userData,[e.target.name]:e.target.value})
  }

  const handleSignUp = (e) => {
    e.preventDefault();
    dispatch(createNewUser(userData));  
    setUserData({name:'',username:'',email:'',password:''});
  }

  return (
    <section className="card rounded-lg border-2 shadow-xl bg-base-100 sm:w-96 w-80 mx-auto  mt-8 sm:mt-4 my-10">
  <Form method="post" className="mx-auto  sm:w-80 w-72  px-1" id="my-form">
    <h1 className="font-lg italic  font-bold  text-gray-700  text-center my-5 text-5xl">SAPP</h1>
    <h4 className="italic my-3 text-center">Sign up to see photos and videos from your friends.</h4>
    <input placeholder="Username" 
    value={userData.username}
    onChange={handleChange}
    name='username'
    required
    className="rounded-lg border-0 px-4 py-2 my-1 w-full mx-auto bg-base-200">
    </input>
     <input placeholder="Name"
     value={userData.name}
     onChange={handleChange}
     name="name"
     required
     className="rounded-lg border-0 px-4 py-2 my-1 w-full mx-auto bg-base-200">
    </input>
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
     placeholder="Password" 
     className="rounded-lg border-0 px-4 py-2 my-1 w-full mx-auto bg-base-200">
    </input>    
     <button 
     className="btn btn-secondary w-full h-30 rounded-lg px-4  my-1 " 
     onClick={handleSignUp}
     disabled={buttonLoading}
     >
       {
        buttonLoading?<span className="loading loading-spinner"></span>:
         <h4 className="text-xl " 
         >Sign Up</h4>
       }  
     </button>
     </Form>
    <h4 className="text-center my-5">Already Registered?<Link to="/login"> Login</Link></h4>
  </section>

  )
}

export default SignUp
