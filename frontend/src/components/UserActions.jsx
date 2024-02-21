import { useDispatch, useSelector } from "react-redux";
import { followUnfollowUser, getLoggedInUser } from "../../features/userFeatures";
import { useState } from "react";

const UserActions = ({loggedInUserId,buttonLoading,following,_id,curIndex}) => {
 const dispatch = useDispatch();
 
const handleUserFollowers = async(e) => {
    let followButton = document.querySelectorAll(`#follow-btn${_id}`);  
    followButton.forEach(fb=>{
     fb.disabled=true;
     fb.classList.add('loading');
     fb.classList.add('loading-ring');
    });
 
    setDisable(true);
    e.preventDefault();
    const userId = _id;
    const res  = await dispatch(followUnfollowUser(userId));   
    try{
      if(res.type==`/followUnfollowUser/fulfilled`){
        followButton.forEach(fb=>{
          fb.disabled=false;
          fb.classList.remove('loading');
          fb.classList.remove('loading-ring');
        })
      }
      if(res.type==`/followUnfollowUser/rejected`){
        followButton.forEach(fb=>{
          fb.disabled=false;
          fb.classList.remove('loading');
          fb.classList.remove('loading-ring');
        })      
      }
    }catch(err){
      //
    }
  } 
 
  return (
      <div>
<button className="w-28 h-10 justify-end bg-base-300 rounded-lg px-2 "
  onClick={handleUserFollowers}
  id={`follow-btn${_id}`}
  >
          <p className="font-bold">  
            { 
             following?.includes(_id)?'following':'follow'
            }
           </p> 
      </button>

    </div>
  )
}

export default UserActions
