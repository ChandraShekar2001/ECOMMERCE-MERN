const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// Create new Order
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
 /* const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body.order;*/
  console.log(req.body);

  const order = await Order.create({
    shippingInfo:req.body.shippingInfo,
    orderItems:req.body.orderItems,
    paymentInfo:req.body.paymentInfo,
    itemsPrice:req.body.itemsPrice,
    taxPrice:req.body.taxPrice,
    shippingPrice:req.body.shippingPrice,
    totalPrice:req.body.totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    order,
  });
  
});

// get Single Order
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new ErrorHander("Order not found with this Id", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

// get logged in user  Orders
exports.myOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });
  let ordersOfUser = []
  for(let order of orders) {
    for(let item of order.orderItems){
      ordersOfUser.push(item);
    }
  }
  // console.log(ordersOfUser);
  res.status(200).json({
    success: true,
    orders: ordersOfUser,
  });
});

// get all Orders -- Admin
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find();
 
  let totalAmount = 0;
 
  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

// update Order Status -- Admin
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
  // console.log('hi');
  const order = await Order.findById(req.params.id);
  // console.log(order);
  if (!order) {
    return next(new ErrorHander("Order not found with this Id", 404));
  }

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHander("You have already delivered this order", 400));
  }

  if (req.body.status === "Shipped") {
    order.orderItems.forEach(async (o) => {
      await updateStock(o.id, o.quantity);
    });
  }
  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  const changedOrder=await Order.findById(req.params.id)
  console.log(changedOrder);
  await order.save({ validateBeforeSave: false });
  res.header("Access-Control-Allow-Credentials",true)
  res.status(200).json({
    success: true,
    changedOrder//added extra by dino
  });
  // console.log(res);
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  console.log(product);
  product.Stock -= quantity;

  await product.save({ validateBeforeSave: false });
}

// delete Order -- Admin
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
 console.log(req.body);
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHander("Order not found with this Id", 404));
  }

  await order.remove();

  const orders=await Order.find()

  res.status(200).json({
    success: true,
    orders
  });
});
