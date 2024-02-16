import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import {usersFetch} from '../axios'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { BsFillTabletLandscapeFill } from 'react-icons/bs';


const setItem = (key,value) => {
    localStorage.setItem(key,JSON.stringify(value));
}

const getItem=(key)=>{
  return JSON.parse(localStorage.getItem(key));
}

export const createNewUser = createAsyncThunk('/createNewUser',async(userData,thunkAPI)=>{
  try{
    const user = await usersFetch.post('/signUp',userData);
    return user;
  }catch(err){
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
})

export const logTheUser = createAsyncThunk('/logUser',async(userData,thunkAPI)=>{
  try{
    
    const user = await usersFetch.post('/login',userData);
    return user;
  }catch(err){
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
});

export const updateTheUser = createAsyncThunk('/updateUser',async({_id,userData},thunkAPI)=>{
  try{
    if(!_id) return
    const updatedUser = await usersFetch.patch(`/updateUser/${_id}`,userData);
    return updatedUser
  }catch(err){
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
})

export const getAllUsers = createAsyncThunk('/getAllUsers',async(_,thunkAPI)=>{
  try{
    const users = await usersFetch.get('/getAllUsers');
    return users;
  }catch(err){
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
});


export const getOneUser = createAsyncThunk('/getOneUser',async(userId,thunkAPI)=>{
  try{
    if(!userId) return
    const user  = await usersFetch.get(`/getOneUser/${userId}`);
    return user
  }catch(err){
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
})


export const followUnfollowUser = createAsyncThunk('/followUnfollowUser',async(userId,thunkAPI)=>{
  try{
    if(!userId) return
    const res = await usersFetch.post(`/followUnfollowUser/${userId}`);
    return res;
  }catch(err){
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
});

export const getLoggedInUser=createAsyncThunk('/getLoggedInUser',async(_id,thunkAPI)=>{
  try{
    const loggedInUser=await usersFetch.get('/getLoggedInUser');
    return loggedInUser
  }catch(err){
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
});

export const logOutUser=createAsyncThunk('/logOutUser',async(_id,thunkAPI)=>{
  try{
    if(!_id) return
    const res = await usersFetch.post(`/logoutUser/${_id}`);
    return res
  }catch(err){
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
})

export const updatePassword = createAsyncThunk('/updatePassword',async(auth,thunkAPI)=>{
  try{
   const res = await usersFetch.patch(`/updatePassword`,auth);
   return res
  }catch(err){
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
});

export const getUsersForChat = createAsyncThunk('/getUserForChat',async(_,thunkAPI)=>{
  try{
    const data = await usersFetch.get('/getUsersForSidebar');
    return data;
  }catch(err){
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
})

export const sendMessage = createAsyncThunk('/sendMessage',async(messageData,thunkAPI)=>{
  const {id,message}=messageData;
  try{
    const messageSent = await usersFetch.post(`/sendMessage/${id}`,message);
    return messageSent;
  }catch(err){
    return thunkAPI.rejectWithValue(err.response.data.message)
  }
})

export const getMessages = createAsyncThunk('/getMessages',async(id,thunkAPI)=>{
  try{
    if(!id) return;
    const getMessages = await usersFetch.get(`/getMessages/${id}`);
    return getMessages
  }catch(err){
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
})

export const getFollowers = createAsyncThunk('/getFollowers',async(id,thunkAPI)=>{
  try{
    const followers = await usersFetch.get(`/getFollowers/${id}`);
    return followers
  }catch(err){
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
})

export const getFollowing = createAsyncThunk('/getFollowing',async(id,thunkAPI)=>{
  try{
    const following = await usersFetch.get(`/getFollowing/${id}`);
    return following
  }catch(err){
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
})

const state={
  loggedInUser:getItem('user'),
  visitedUserData:{},
  buttonLoading:false,
  usersLoading:false,
  users:[],
  chatsLoading:false,
  chatUsers:[],
  messagesLoading:false,
  messages:[],
  showPicker:false,
  closePicker:true
}

const userSlice = createSlice({
    name:'user',
    initialState:state,
    reducers:{
      updateMessages:(state,{payload})=>{
        state.messages.push(payload)
      },
      setShowPicker:(state,{payload})=>{
        state.showPicker = payload
      }
    },
    extraReducers:(builder)=>{
  builder.addCase(createNewUser.pending,(state,action)=>{
    state.buttonLoading = true
  }).addCase(createNewUser.fulfilled,(state,action)=>{
    state.buttonLoading = false;
    toast.success(action.payload.data.message);
  }).addCase(createNewUser.rejected,(state,action)=>{
    state.buttonLoading=false;
    toast.error(action.payload);
  }).addCase(logTheUser.pending,(state,action)=>{
    state.buttonLoading=true
  }).addCase(logTheUser.fulfilled,(state,action)=>{
    state.buttonLoading = false;
    state.loggedInUser = action.payload.data.user;
    setItem('user',action.payload.data.user);
    toast.success('welcome ')
  }).addCase(logTheUser.rejected,(state,action)=>{
    state.buttonLoading=false;
    console.log(action.payload)
    toast.error(action.payload);
  }).addCase(updateTheUser.pending,(state,action)=>{
    state.buttonLoading=true;
  }).addCase(updateTheUser.fulfilled,(state,action)=>{
    state.buttonLoading = false;
    console.log(action.payload);
    state.loggedInUser = action.payload.data.user;
    setItem('user',action.payload.data.user);
    toast.success(action.payload.data.message);
  }).addCase(updateTheUser.rejected,(state,action)=>{
    state.buttonLoading = false;
    toast.error(action.payload)
  }).addCase(getAllUsers.pending,(state,action)=>{
    state.usersLoading=true
  }).addCase(getAllUsers.fulfilled,(state,action)=>{
    state.usersLoading=false
    state.users = action.payload.data
  }).addCase(getAllUsers.rejected,(state,action)=>{
    state.usersLoading = false;
  }).addCase(getOneUser.pending,(state,action)=>{
    state.usersLoading = true;
  }).addCase(getOneUser.fulfilled,(state,action)=>{
    state.usersLoading = false;
    state.visitedUserData = action.payload.data;
  }).addCase(getOneUser.rejected,(state,action)=>{
    state.usersLoading = false;
    toast.error('user doesn\'t exist')
  }).addCase(followUnfollowUser.pending,(state,action)=>{
    state.buttonLoading = true;
  }).addCase(followUnfollowUser.fulfilled,(state,action)=>{
    state.buttonLoading = false;
    state.loggedInUser.following = action.payload.data.curUser.following;
    state.visitedUserData.followers = action.payload.data.userToFollowAndUnfollow.followers;
    
 }).addCase(followUnfollowUser.rejected,(state,action)=>{
    state.buttonLoading = false;
    toast.error(action.payload)
  }).addCase(getLoggedInUser.pending,(state,action)=>{
    state.usersLoading = true
  }).addCase(getLoggedInUser.fulfilled,(state,action)=>{
    state.usersLoading = false;
    state.loggedInUser = action.payload.data;
  }).addCase(getLoggedInUser.rejected,(state,action)=>{
    state.usersLoading = false
    localStorage.removeItem('user')
    history.go('/login')
    toast.error('you have been successfully loggedOut')
  }).addCase(logOutUser.pending,(state,action)=>{
    state.buttonLoading = true;
  }).addCase(logOutUser.fulfilled,(state,action)=>{
    state.buttonLoading = false;
    localStorage.removeItem('user');
    toast.success('you have been loggedOut!');
  }).addCase(logOutUser.rejected,(state,action)=>{
    state.buttonLoading = false;
    toast.error(action.payload)
  }).addCase(updatePassword.pending,(state,action)=>{
    state.buttonLoading=true;
  }).addCase(updatePassword.fulfilled,(state,action)=>{
    state.buttonLoading=false
    localStorage.removeItem('user');
    toast.success('password updated!please login again');

  }).addCase(updatePassword.rejected,(state,action)=>{
    state.buttonLoading=false;
    toast.error(action.payload);
  }).addCase(getUsersForChat.pending,(state,action)=>{
    state.chatsLoading=true
  }).addCase(getUsersForChat.fulfilled,(state,action)=>{
    state.chatsLoading=false
    state.chatUsers=action.payload.data;
  }).addCase(getUsersForChat.rejected,(state,action)=>{
    state.chatsLoading=false
    toast.error('something went wrong fetching chats!')
  }).addCase(sendMessage.pending,(state,action)=>{
    state.buttonLoading=true
  }).addCase(sendMessage.fulfilled,(state,action)=>{
    state.buttonLoading=false
    state.messages.push(action.payload.data);
  }).addCase(sendMessage.rejected,(state,action)=>{
    state.buttonLoading=false
    //toast.error('message couldn\'t be created')
    toast.error(action.payload)
  }).addCase(getMessages.pending,(state,action)=>{
     state.messagesLoading=true
  }).addCase(getMessages.fulfilled,(state,action)=>{
     state.messagesLoading=false;
     console.log(action.payload)
     state.messages = action.payload.data;
  }).addCase(getMessages.rejected,(state,action)=>{
    state.messagesLoading = false;
    //console.log(action.payload)
    //toast.error('something went wrong fetching messages!')
  }).addCase(getFollowers.pending,(state,action)=>{
    state.usersLoading=true
  }).addCase(getFollowers.fulfilled,(state,action)=>{
    state.usersLoading=false
    state.users = action.payload.data;
  }).addCase(getFollowers.rejected,(state,action)=>{
    state.usersLoading = false;
  }).addCase(getFollowing.pending,(state,action)=>{
    state.usersLoading=true;
  }).addCase(getFollowing.fulfilled,(state,action)=>{
    state.usersLoading=false;
    state.users=action.payload.data;  
  }).addCase(getFollowing.rejected,(state,action)=>{
    state.usersLoading=false
  })
}
}) 

export default userSlice.reducer;
export const {updateMessages,setShowPicker} = userSlice.actions;