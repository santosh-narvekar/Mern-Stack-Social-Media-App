import {  useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Form, useNavigate } from 'react-router-dom'
import { updatePassword } from '../../features/userFeatures';

const data = {
  password:'',
  confirmPassword:'',
  newPassword:''
}

const UpdatePassword = () => {
  const [auth,setAuth]=useState(data);
  const {buttonLoading}=useSelector(state=>state.loggedIn.loggedInUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const updateMyPassword = async()=>{
    try{
      const res = await dispatch(updatePassword(auth));
      if(res.type===`/updatePassword/fulfilled`){
        navigate('/login');
      }
    }catch(err){
      //
    }
  }

  const handlePasswordChange = (e) => {
    e.preventDefault();
    setAuth({...auth,[e.target.name]:e.target.value});
  }
  

  return (
    <div className='my-20 flex flex-col gap-2 w-full'>
      <div role="alert" className="alert alert-error w-1/2 mx-auto flex justify-center" >
  <span>Note: You will be immediately logged Out after successful password update.</span>
</div>
      <p className='text-2xl font-bold w-full flex justify-center mb-4'>UPDATE PASSWORD</p>
        <Form className='flex flex-col w-full h-full items-center px-20' >
          <input type="password" placeholder='current password'
          className='border-2 border-primary-100  p-2 w-64'
          name="password"
          onChange = {handlePasswordChange}
          value={auth.password}
          ></input>
          <input type="password" placeholder='confirmPassword'
          className=' input-bordered p-2 w-64  border-2 border-primary-100'
          onChange={handlePasswordChange}
          value={auth.confirmPassword}
          name="confirmPassword"
         ></input>
          <input type="password" placeholder='New Password'
          className='border-2 border-primary-100 input-bordered p-2 w-64  '
          onChange={handlePasswordChange}
          value={auth.newPassword}
          name="newPassword"
          ></input>
          
          <button  className='btn btn-error mt-4' onClick={updateMyPassword}
          disabled={buttonLoading}
          >
            {
            buttonLoading?<span className='loading loading-spinner'>
            </span>:<p>
            UPDATE PASSWORD
  
            </p>
            
            }</button>
      
          <button  className='btn btn-success mt-4 w-28'
          onClick={()=>{window.history.back()}} 
         disabled={buttonLoading}
         >
            <p className='text-white'>
              GO BACK

              </p>
              </button>
        </Form>


    </div>
  )
}

export default UpdatePassword
