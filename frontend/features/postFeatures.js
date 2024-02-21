import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import {postsFetch} from '../axios'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export const createPost = createAsyncThunk('/createNewPost',async(data,thunkAPI)=>{
  try{
    if(!data) return
    const newPost = await postsFetch.post('/posts/create',data);
    return newPost

  }catch(err){
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
});

export const getUserPosts = createAsyncThunk('/getUserPosts',async(_id,thunkAPI)=>{
  try{
    const userPosts = await postsFetch.get(`/posts/getPostsForUser/${_id}`);
    return userPosts
  }catch(err){
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
})

export const getOnePost=createAsyncThunk('/getOnePost',async(postId,thunkAPI)=>{
  try{
    if(!postId) return
    const post = await postsFetch.get(`/posts/getOnePost/${postId}`);
    return post
  }catch(err){
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
})

export const getAllPosts = createAsyncThunk('/getAllPosts',async(_,thunkAPI)=>{
  try{
    const posts = await postsFetch.get('/posts/getAllPosts');
    return posts;
  }catch(err){
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
})

export const feedPosts = createAsyncThunk('/getFeedPosts',async(_,thunkAPI)=>{
  try{
    const feedPosts = await postsFetch.get('/posts/feedPosts');
    return feedPosts
  }catch(err){
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
})

export const updatePost = createAsyncThunk('/updatePost',async(postInfo,thunkAPI)=>{
  const {postId,data} = postInfo;
  try{
    if(!postId) return
    const updatedPost = await postsFetch.patch(`/posts/updatePost/${postId}`,data);
    return updatedPost
  }catch(err){
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
})

export const deletePost  = createAsyncThunk('/deletePost',async(postId,thunkAPI)=>{
  try{
    if(!postId) return;
    const res=await postsFetch.delete(`/posts/deletePost/${postId}`);
    return res;
  }catch(err){
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
})

export const likeUnlikePost = createAsyncThunk('/likeUnlikePost',async(postId,thunkAPI)=>{
  if(!postId) return 
  try{
    const post = await postsFetch.post(`/posts/likeUnlikePost/${postId}`);
    return {post,postId};
  }catch(err){
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
});

export const CommentOnPost = createAsyncThunk('/commentOnPost',async(postData,thunkAPI)=>{
  const {postId,comment:userComment} = postData
  try{
   if(!postId) return
   const postComment = await  postsFetch.post(`/posts/commentOnPost/${postId}`,userComment);
   return postComment
  }catch(err){
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
})

export const getAllPostComments = createAsyncThunk('/getAllReplies',async(postId,thunkAPI)=>{
  try{
    const comments = await postsFetch.get(`/replies/PostReplies/${postId}`);
    return comments;
  }catch(err){
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
})

export const deletePostComment = createAsyncThunk('/deletePostComment',async(commentId,thunkAPI)=>{
  if(!commentId) return
  try{
  const commentsData = await postsFetch.delete(`/replies/deletePostComment/${commentId}`);
  return commentsData;
  }catch(err){
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
})



export const likePostComment = createAsyncThunk('/likePostComment',async(commentId,thunkAPI)=>{
    if(!commentId) return
  try{
    const comment = await postsFetch.post(`/replies/likePostReplies/${commentId}`);
    return comment
  }catch(err){
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
})

export const getSuggestedPosts = createAsyncThunk('/getSuggestedPosts',async(trendingTopics,thunkAPI)=>{
  const trendArr= trendingTopics.map(trend=>trend.word.split('').splice(1).join(''));
  console.log(trendArr)
  const trend = trendArr.join(':');
  console.log(trend);
  try{
    
    const posts = await postsFetch.get(`/posts/suggestedPosts/${trend}`);
    return posts
  }catch(err){
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
})

export const getLikedPosts = createAsyncThunk('/getLikedPosts',async(postId,thunkAPI)=>{
  try{
    const data = await postsFetch.get(`/posts/getLikedUsersOnPost/${postId}`);
    return data
  }catch(err){
    return thunkAPI.rejectWithValue(err.response.data.message)
  }
})

export const getTrendingTopics = createAsyncThunk('/getTrendingTopics',async(_,thunkAPI)=>{
  try{
    const res = await postsFetch.get(`/posts/trendingTopics`);
    return res;
  }catch(err){
    return thunkAPI.rejectWithValue(err.response.data.message)
  }
});

export const getTrendingPagePosts = createAsyncThunk('/getTrendingPagePosts',async(trendingTopic,thunkAPI)=>{
  try{
  const res=await postsFetch.get(`/posts/trendingTopics/${trendingTopic}`);
  return res
  }catch(err){
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
});
const state={
  postData:{},
  posts:[],
  postLikes:[],
  feedPosts:[],
  suggestedPosts:[],
  postsButtonLoading:false,
  deleteButtonLoading:false,
  likeButtonLoading:false,
  postsLoading:false,
  singlePostLoad:false,
  curPostLikes:null,
  commentLoading:false,
  postComments:[],
  trendingTopics:[],
  trendingTopicsLoad:false,
}

const postSlice = createSlice({
  name:'post',
  initialState:state,
  extraReducers:(builder)=>{
    builder.addCase(createPost.pending,(state,action)=>{
      state.postsButtonLoading = true;
    }).addCase(createPost.fulfilled,(state,action)=>{
      state.postsButtonLoading = false;
      state.postData = action.payload.data.post;
      //state.posts.push(action.payload.data.post)
      state.posts = [action.payload.data.post,...state.posts]
      toast.success(action.payload.data.message);
    }).addCase(createPost.rejected,(state,action)=>{
      state.postsButtonLoading = false;
      toast.error(action.payload);
    }).addCase(getUserPosts.pending,(state,action)=>{
      state.postsLoading = true
    }).addCase(getUserPosts.fulfilled,(state,action)=>{
      state.postsLoading = false;
      state.posts = action.payload.data.posts;
    }).addCase(getUserPosts.rejected,(state,action)=>{
      state.postsLoading-false;
      toast.error(action.payload)
    }).addCase(getOnePost.pending,(state,action)=>{
      state.postsLoading=true
    }).addCase(getOnePost.fulfilled,(state,action)=>{
      state.postsLoading=false;
      state.postData = action.payload.data;
    }).addCase(getOnePost.rejected,(state,action)=>{
      state.postsLoading=false;
      state.postData = {}
      window.history.back();
    }).addCase(getAllPosts.pending,(state,action)=>{
      state.postsLoading = true;
    }).addCase(getAllPosts.fulfilled,(state,action)=>{
      state.postsLoading = false;
      state.posts = action.payload.data.posts;   
      const likedOnPosts = action.payload.data.posts.map((post) => post.likes)     
      state.likedPosts=likedOnPosts
    }).addCase(getAllPosts.rejected,(state,action)=>{
      state.postsLoading=false;
      toast.error(action.payload)
    }).addCase(feedPosts.pending,(state,action)=>{
      state.postsLoading=true;
    }).addCase(feedPosts.fulfilled,(state,action)=>{
      state.postsLoading=false
      state.posts = action.payload.data.posts;
      state.feedPosts = action.payload.data.posts;
    }).addCase(feedPosts.rejected,(state,action)=>{
      toast.error('something went wrong fetching posts')
    }).addCase(updatePost.pending,(state,action)=>{
      state.postsButtonLoading=true;
    }).addCase(updatePost.fulfilled,(state,action)=>{
      state.postsButtonLoading = false;
      state.postData = action.payload.data.post;
      const post = state.posts.find((post)=>post._id == action.payload.data.post._id);
      post.resource = action.payload.data.post.resource;
      post.postContent = action.payload.data.post.postContent
      toast.success(action.payload.data.message);
    }).addCase(updatePost.rejected,(state,action)=>{
    
      state.postsButtonLoading=false;
      toast.error(action.payload)
    }).addCase(deletePost.pending,(state,action)=>{
      state.postsButtonLoading = true;
    }).addCase(deletePost.fulfilled,(state,action)=>{
      state.postsButtonLoading = false;
      toast.success(action.payload.data.message);
    }).addCase(deletePost.rejected,(state,action)=>{
      state.postsButtonLoading=false;
      toast.error(action.payload.data.message);
    }).addCase(likeUnlikePost.pending,(state,action)=>{
      state.likeButtonLoading=true
    }).addCase(likeUnlikePost.fulfilled,(state,action)=>{
      state.likeButtonLoading = false;
      const postId=action.payload.postId;
      state.postData.likes =action.payload.post.data.likes;
      state.posts.forEach((post)=>{
        if(post._id==postId){
          post.likes = action.payload.post.data.likes;
        }
      })
      state.postLikes.splice(state.postLikes.indexOf(postId),1);
     }).addCase(likeUnlikePost.rejected,(state,action)=>{
      state.likeButtonLoading=false;
      toast.error('something went wrong');
    }).addCase(CommentOnPost.pending,(state,action)=>{
      state.commentLoading=true;
    }).addCase(CommentOnPost.fulfilled,(state,action)=>{
      state.commentLoading=false;
      state.postComments=[action.payload.data.postComment,...state.postComments];
    }).addCase(CommentOnPost.rejected,(state,action)=>{
      state.commentLoading=false;
      toast.error(action.payload);
    }).addCase(getAllPostComments.pending,(state,action)=>{
      state.commentLoading=true;
    }).addCase(getAllPostComments.fulfilled,(state,action)=>{
      state.commentLoading=false;
      state.postComments=action.payload.data
    }).addCase(getAllPostComments.rejected,(state,action)=>{
      state.commentLoading=false;
    }).addCase(deletePostComment.pending,(state,action)=>{
      state.deleteButtonLoading=true
    }).addCase(deletePostComment.fulfilled,(state,action)=>{
      state.deleteButtonLoading = false
      state.postComments=action.payload.data.replies;
    }).addCase(deletePostComment.rejected,(state,action)=>{
      state.deleteButtonLoading=false
      toast.error('something went wrong!')
    }).addCase(likePostComment.pending,(state,action)=>{
      state.likeButtonLoading=true;
    }).addCase(likePostComment.fulfilled,(state,action)=>{
      state.likeButtonLoading=false;
      state.postComments.forEach((comment)=>{
        if(comment._id==action.payload.data._id){
          comment.likes = action.payload.data.likes; 
        }
      });
    }).addCase(likePostComment.rejected,(state,action)=>{
      state.likeButtonLoading = false;
      toast.error(action.payload);
    }).addCase(getSuggestedPosts.pending,(state,action)=>{
      state.postsLoading=true
    }).addCase(getSuggestedPosts.fulfilled,(state,action)=>{
      state.postsLoading=false;
      state.posts = action.payload.data;
    }).addCase(getSuggestedPosts.rejected,(state,action)=>{
      state.postsLoading=false;
      toast.error(action.payload)
    }).addCase(getLikedPosts.pending,(state,action)=>{
      state.postsLoading=true
    }).addCase(getLikedPosts.fulfilled,(state,action)=>{
      state.postsLoading=false;
      state.postLikes=action.payload.data;

    }).addCase(getLikedPosts.rejected,(state,action)=>{
      state.postsLoading = false
    }).addCase(getTrendingTopics.pending,(state,action)=>{
      state.trendingTopicsLoad=true
    }).addCase(getTrendingTopics.fulfilled,(state,action)=>{
      state.trendingTopicsLoad=false;
      console.log(action.payload.data)
      state.trendingTopics=action.payload.data;
    }).addCase(getTrendingTopics.rejected,(state,action)=>{
      state.trendingTopicsLoad = false
      console.log(action.payload)
    }).addCase(getTrendingPagePosts.pending,(state,action)=>{
      state.postsLoading = true;
    }).addCase(getTrendingPagePosts.fulfilled,(state,action)=>{
      state.postsLoading = false;
      state.posts = action.payload.data;
    }).addCase(getTrendingPagePosts.rejected,(state,action)=>{
      state.postsLoading=false;
      toast.error(action.payload);
    })
  }

})

export default postSlice.reducer;
