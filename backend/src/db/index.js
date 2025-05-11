import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const connectdb=async()=>{
try {
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`)
    console.log("MongoDb connected successfully123")
} catch (error) {
    console.log("Error connecting mongodb")
}
}
export default connectdb ;