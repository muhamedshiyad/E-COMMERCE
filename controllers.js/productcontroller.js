const { cloudinaryInstance } = require("../config/cloudinary Config");
const { Product } = require("../models/productModel");
const producteRouter = require("../routes/v1/producteRouter");
const { handleImageUpload } = require("../utils/imageupload");
const createproduct = async (req,res,next)=>{
    try {
        const user = req.user;

        const{title,description,duration,price,}=req.body;
        let imageurl;

        if(!title || !description || !duration || !price){
           return res.status(400).json({message : 'all field required'})
        }

        const isproductExist = await Product.findOne({title});

        if(isproductExist){
            return res.status(400).json({ success : false,message : 'product already exist'})
        }

        if(req.file){
           imageurl= await  handleImageUpload(req.file.path)
        }

       const newproduct = new Product({ title, description, duration, image:imageurl && imageurl, price, });
       if (user.role === "admin") newproduct.admin = user.id;
         await newproduct.save();

        res.status(201).json({ success : true, message:"product created successfully"});
    } catch (error) {
        next(error)
    }
};
const updateproduct = async (req,res,next)=>{
    try {
        const {productId} = req.params;

        const{title,description,duration,price,}=req.body;
        let imageurl;

        const isproductExist = await Product.findOne({ _id : productId});

        if(!isproductExist){
            return res.status(400).json({ success : false,message : 'product does not exist'})
        }
        if(req.file){
           imageurl= await  handleImageUpload(req.file.path)
        }

        const updatedproduct = await Product.findOneAndUpdate(
            {_id:productId},
            {title,description,duration,price},
            {new:true});

        res.status(200).json({ success : true, message:"product updated successfully",data : updatedproduct});
    } catch (error) {
        next(error)
    }
};
const deleteproduct = async (req,res,next)=>{
    try {
        const {productId} = req.params;

        const productDelelted = await Product.findByIdAndDelete({_id :productId });

        if(!productDelelted)res.status(400).json({success: true, message:"product already deleted" });

        res.status(200).json({ success : true, message:"product delete successfully",data : productDelelted});
    } catch (error) {
        next(error)
    }
};

module.exports = {createproduct,updateproduct,deleteproduct}

