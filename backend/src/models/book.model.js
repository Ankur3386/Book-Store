import mongoose from "mongoose";
// import jwt from'jsonwebtoken'
// import bcrypt from "bcrypt"
const bookSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    language:{
        type:String,
        required:true
    },
    image: { 
        type: String,
         default:"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
        },
},{timestamps:true})
export const Book =mongoose.model("Book",bookSchema)