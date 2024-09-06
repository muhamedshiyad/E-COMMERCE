const express = require('express');
const { userRouter } = require('./userRouters');
const { productRouter } = require('./productRouters');
const { cartRouter } = require('./cartRouters');
const { adminRouter } = require('./adminRouters');
const { orderRouter } = require('./orderRouters');

const v1Router = express.Router();

v1Router.use("/user",userRouter);
v1Router.use("/product",productRouter);
v1Router.use("/cart",cartRouter);
v1Router.use("/admin",adminRouter);
v1Router.use("/order",orderRouter);

module.exports = {v1Router};