import { useDispatch, useSelector } from "react-redux";
import { followUnfollowUser, getLoggedInUser } from "../../features/userFeatures";
import { useState } from "react";

const UserActions = ({loggedInUserId,buttonLoading,following,_id,curIndex}) => {
 const dispatch = useDispatch();
 const [disable,setDisable]=useState(false);

const handleUserFollowers = async(e) => {
    let followButton = document.querySelectorAll(`#follow-btn${_id}`);  
    console.log(followButton)
    followButton.forEach(fb=>fb.disabled={buttonLoading});
    setDisable(true);
    e.preventDefault();
    const userId = _id;
    const res  = await dispatch(followUnfollowUser(userId));   
    try{
      if(res.type==`/followUnfollowUser/fulfilled`){
        setDisable(false)
        followButton.forEach(fb=>fb.disabled=disable)
      }
      if(res.type==`/followUnfollowUser/rejected`){
        setDisable(false);
        followButton.forEach(fb=>fb.disabled=disable)      
      }
    }catch(err){
      //
    }
  } 
 
  return (
      <div>
      {
<button className="w-28 h-10 justify-end bg-base-300 rounded-lg px-2 "
  onClick={handleUserFollowers}
 //disabled={buttonLoading}
  id={`follow-btn${_id}`}
  >
      {
        disable?<span className="loading loading-ring"></span>:
           <p className="font-bold">  
            { 
             following?.includes(_id)?'following':'follow'
            }
           </p> 
      }
                      </button>

          }

    </div>
  )
}

export default UserActions
