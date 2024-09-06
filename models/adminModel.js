const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
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
    person:{
        type :mongoose.Schema.Types.ObjectId,
    },
});

const Admin = mongoose.model("Admin",adminSchema);

module.exports ={ Admin};