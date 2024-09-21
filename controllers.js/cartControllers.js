const { Cart } = require("../models/cartModel");
const { Product } = require("../models/productModel");

const addTocart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId } = req.body;

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, products: [] });
        }

        cart.products.push({
            productId,
            price: product.price,
        });

        cart.calculateTotalPrice();

        await cart.save();

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};
const updatecart = async(req,res) => {
    try {
        const userId = req.res.id;
        const {productId}=req.body;

        const product = await Product.findById(productId);
        if(!product){
            return res.status(404).json({ message : "Product not found"});
        }

        const cart = await Cart.findByIdAndUpdate({_id:userId},{$push:{ products:{productId,price:product.price}}});

        cart.calculateTotalPrice();

        await cart.save();

        res.status(200).json({cart});
    } catch (error) {
        res.status(500).json({ message : "Internal server error",error});
    }
}

const removecart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId } = req.body;

        let cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        cart.products = cart.products.filter((item) => item.productId != productId);

        cart.calculateTotalPrice();

        await cart.save();

        res.status(200).json({ success: true, message: "cart item removed", data: cart });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};
const getcart = async(req,res)=>{
     try{
        const userId = req.user.id;

        const cart = await Cart.findOne({ userId }).populate('products.productId');
        if(!cart) {
            return res.status(404).json({message:"cart not found"});
        }

        res.status(200).json(cart);
     }catch(error){
        res.status(500).json({message:"internal server error",error});
     }
};


module.exports = {addTocart,removecart,getcart,updatecart};