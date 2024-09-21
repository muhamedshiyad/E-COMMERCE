const express = require('express');
const { adminSignup, adminLogin, adminLogout, adminProfile, checkadmin } = require('../../controllers.js/adminControllers');
const { adminAuth } = require('../../middlewares/adminAuth');

const router =express.Router();

router.post('/signup',adminSignup);
router.post('/login',adminLogin );
router.post('/logout',adminLogout );

router.get('/profile',adminAuth, adminProfile );
router.put('/update', );
router.delete('/delete', );

router.get("/userList");


router.get("/some-end-point",adminAuth);

module.exports  = {adminRouter:router};