const express =require("express");
const { userAuth } = require("../../middlewares/userAuth");
const { addTocart, removecart, getcart } = require("../../controllers.js/cartControllers");

const router = express.Router();

router.post("/addcart",userAuth,addTocart);
router.put("/remove",userAuth,removecart);
router.get("/",userAuth,getcart);


module.exports = { cartRouter : router };