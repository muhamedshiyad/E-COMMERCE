const express = require('express');

const router =express.Router();

router.get('/',(req,res,next)=>{
    res.send('accessed product route get method')
});


module.exports  = {productRouter:router};