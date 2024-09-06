const {Admin} = require("../models/adminModel");
const bcrypt = require('bcrypt');

const adminSignup = async (req,res,next)=>{
    try {
        const {name,email,password,phone} = req.body;
        if(!name || !email || !password ) {
           return res.status(400).json({success :true,message : "all fields requred"});
        };
        const isUserExist = await Admin.findOne({ email })

        if (isUserExist){
            return res.status(400).json({message:"user already exist"});
        };

        const saltRounds=10;
        const hashedpassword = bcrypt.hashSync(password, saltRounds);
        const newUser = new Admin({ name,email,password:hashedpassword,phone,});
        await newUser.save();

        res.json({success:true, message:"admin created successfully"});
    } catch (error) {
        console.log(error); 
        res.status(error.statuscode || 500).json({message:error.message ||"internal sever error"}); 
    }
};

module.exports = { adminSignup};