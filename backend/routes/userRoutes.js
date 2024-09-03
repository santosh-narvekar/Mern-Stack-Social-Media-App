const express = require('express');
const { signup, login,followUnfollowUser, logOutUser, updateUser, updatePassword, getAllUsers,  activateAccount, getOneUser,getLoggedInUser, getUsersForSideBar, getFollowers, getFollowing } = require('../controllers/userController');
const { protectedRoute } = require('../controllers/protectedRoute');
const router = express.Router();

router.get('/getAllUsers',protectedRoute,getAllUsers);
router.get('/confirm/:token',activateAccount);
router.get('/getOneUser/:id',protectedRoute,getOneUser);
router.get('/getLoggedInUser',protectedRoute,getLoggedInUser)
router.get('/getUsersForSidebar',protectedRoute,getUsersForSideBar);
router.get('/getFollowers/:id',protectedRoute,getFollowers);
router.get('/getFollowing/:id',protectedRoute,getFollowing)

router.post('/signUp',signup);
router.post('/login',login)

router.post('/followUnfollowUser/:id',protectedRoute,followUnfollowUser);
router.patch('/updateUser/:id',protectedRoute,updateUser);
router.patch('/updatePassword',protectedRoute,updatePassword);
router.post('/logoutUser/:id',protectedRoute,logOutUser);

module.exports = router
