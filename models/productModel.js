const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        unique : true,
    },
    duration : {
        type : String,
        required : true,
    },
    Image:{
        type :String,
        default : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLOvguP9JE8MXMpzupOA0BDLAOS5uSeBqTIA&s",
    },
    description : {
        type : String,
        minlenght : 50,
        maxlenght : 500,
    },
    price : Number,
    id : {
        type :mongoose.Schema.Types.ObjectId,
    },
});

const Product = mongoose.model("Product",productSchema);

module.exports ={ Product };