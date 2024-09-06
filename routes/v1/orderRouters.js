const express = require('express');

const router =express.Router();

router.get('/',(req,res,next)=>{
    res.send('accessed order route get method')
});


module.exports  = {orderRouter:router};