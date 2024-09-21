const mongoose = require ("mongoose");

const cartSchema = new mongoose.Schema({
    userId: {
        type :mongoose.Schema.Types.ObjectId,
        ref : "User",
        require : true,
    },
    products:[
        {
            productId:{
                type: mongoose.Schema.Types.ObjectId,
                ref:"Product",
                require :true,
            },
            price:{
                type:Number,
                require :true,
            },
        },
    ],
    totleprice : {
        type:Number,
        require:true,
        default:0,
    },
},
{timestamps :true }

);

cartSchema.methods.calculateTotalPrice = function(){
    this.totleprice = this.products.reduce((total,product)=>total + product.price,0);
};

const Cart = mongoose.model("Cart",cartSchema);

module.exports = {Cart}