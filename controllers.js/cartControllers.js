const { Cart } = require("../models/cartModel");
const { Product } = require("../models/productModel");

const addToCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId } = req.body;

        const course = await Product.findById(productId);
        if (!course) {
            return res.status(404).json({ message: "product not found" });
        }

        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, productes: [] });
        }

        const courseExists = cart.product.some((item) => item.productId.equals(productId));
        if (productExists) {
            return res.status(400).json({ message: "product already in cart" });
        }

        cart.productes.push({
            producId,
            price: product.price,
        });

        cart.calculateTotalPrice();

        await cart.save();

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};


const removeFromCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { producId } = req.body;

        let cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        cart.productes = cart.product.filter((item) => item.productId != productId);

        cart.calculateTotalPrice();

        await cart.save();


        res.status(200).json({ success: true, message: "cart item removed", data: cart });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};

const getCart = async (req, res) => {
    try {
        const userId = req.user.id;

        const cart = await Cart.findOne({ userId }).populate("product.productId");
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};

module.exports = { addToCart, removeFromCart, getCart };