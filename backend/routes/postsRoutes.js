const express = require('express');
const { createPosts, likeUnlikePost, getAllPosts, CommentOnPost, deletePost, updatePost, getFeedPosts,  getPostsForThatUser, getOnePost, trendingTopics, getPostsForTrending,suggestedPosts, getLikedUsers} = require('../controllers/postsController');
const { protectedRoute } = require('../controllers/protectedRoute');

const router = express.Router();

router.get('/posts/getAllPosts',protectedRoute,getAllPosts)
router.get('/posts/getPostsForUser/:id',protectedRoute,getPostsForThatUser)
router.get('/posts/feedPosts',protectedRoute,getFeedPosts);
router.post('/posts/create',protectedRoute,createPosts);
router.post('/posts/likeUnlikePost/:id',protectedRoute,likeUnlikePost);
router.post('/posts/commentOnPost/:id',protectedRoute,CommentOnPost);
router.delete('/posts/deletePost/:id',protectedRoute,deletePost)
router.patch('/posts/updatePost/:id',protectedRoute,updatePost);
router.get('/posts/getOnePost/:id',protectedRoute,getOnePost)
router.get('/posts/trendingTopics',protectedRoute,trendingTopics);
router.get('/posts/getPosts/:trendingTopic',protectedRoute,getPostsForTrending);
router.get('/posts/suggestedPosts/:trendingTopics',protectedRoute,suggestedPosts);
router.get('/posts/getLikedUsersOnPost/:id',protectedRoute,getLikedUsers);

module.exports = router