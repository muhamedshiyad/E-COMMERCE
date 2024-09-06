const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name : {
        type :String,
        required : true,
    },
    email :{
        type : String,
        required : true,
        unique : true,
    },
    password :{
        type : String,
        required : true,
        minlenght : 8,
    },
    phone :String,
    product : {
        type :mongoose.Schema.Types.ObjectId,
        ref :"product",
    },
});

const User = mongoose.model("User",userSchema);

module.exports ={ User};