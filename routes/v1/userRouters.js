const express = require('express');
const { userSignup, userLogin, userLogout, userProfile, checkUser } = require('../../controllers.js/userControllers');
const { userAuth } = require('../../middlewares/userAuth');

const router =express.Router();

router.post('/signup', userSignup);
router.post('/login', userLogin );
router.post('/logout', userLogout);

router.get('/profile',userAuth, userProfile );
router.put('/update', );
router.delete('/delete', );

router.get('/userlist', );
router.get('/check-user',userAuth,checkUser );

module.exports  = {userRouter:router};