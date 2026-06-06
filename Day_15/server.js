const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/BillingSystemDB");

const Order = mongoose.model(
"Order",
new mongoose.Schema({
 orderId:Number,
 customerId:Number,
 amount:Number,
 status:String
})
);

app.post("/orders", async(req,res)=>{
 const order = new Order(req.body);
 await order.save();
 res.send("Order Saved");
});

app.get("/orders", async(req,res)=>{
 const data = await Order.find();
 res.json(data);
});

app.listen(3000,()=>{
 console.log("Server Running");
});
