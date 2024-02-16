import { useDispatch, useSelector } from "react-redux";
import { followUnfollowUser, getLoggedInUser } from "../../features/userFeatures";

const UserActions = ({loggedInUserId,buttonLoading,following,_id}) => {
 const dispatch = useDispatch();

const handleUserFollowers = (e) => {
    e.preventDefault();
    const userId = _id;
    dispatch(getLoggedInUser(loggedInUserId));
    dispatch(followUnfollowUser(userId));   
  } 
 
  return (
      <div>
      {
<button className="w-28 h-10 justify-end bg-base-300 rounded-lg px-2 "
  onClick={handleUserFollowers}
 disabled={buttonLoading}
  id="follow-btn"
  >
           <p className="font-bold">  
            { 
             following?.includes(_id)?'following':'follow'
            }
           </p> 
                      </button>

          }

    </div>
  )
}

export default UserActions
