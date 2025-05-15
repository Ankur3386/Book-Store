import mongoose from "mongoose";
// import jwt from'jsonwebtoken'
// import bcrypt from "bcrypt"
const orderSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    book:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Book"
    },
    quantity:{
        type:Number,
        default:1
    },
    totalPrice:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:"order placed",
        enum:["Order placed","Out for delivery","Delivered","Cancelled"]
    }
},{timestamps:true})
export const Order =mongoose.model("Order",orderSchema)