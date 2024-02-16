const express = require('express');
const { protectedRoute } = require('../controllers/protectedRoute');
const { getAllRepliesForPost, deletePostComment, likePostComment } = require('../controllers/repliesController');
const router = express.Router()


router.get('/replies/PostReplies/:id',protectedRoute,getAllRepliesForPost);
router.delete('/replies/deletePostComment/:id',protectedRoute,deletePostComment);
router.post('/replies/likePostReplies/:id',protectedRoute,likePostComment)
module.exports = router;