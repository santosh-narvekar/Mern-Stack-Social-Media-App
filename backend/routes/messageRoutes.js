const express=require('express');
const { sendMessage, getMessages } = require('../controllers/MessageController');
const { protectedRoute } = require('../controllers/protectedRoute');
const router = express.Router();

router.get('/getMessages/:id',protectedRoute,getMessages);
router.post('/sendMessage/:id',protectedRoute,sendMessage);

module.exports=router