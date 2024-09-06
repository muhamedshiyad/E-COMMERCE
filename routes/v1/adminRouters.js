const express = require('express');
const { adminSignup } = require('../../controllers.js/adminControllers');

const router =express.Router();

router.post('/signup',adminSignup);
router.post('/login', );
router.post('/logout', );

router.get('/profile', );
router.put('/update', );
router.delete('/delete', );


module.exports  = {adminRouter:router};