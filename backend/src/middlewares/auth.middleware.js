import jwt from 'jsonwebtoken'
import User from "../models/user.model.js"
//TO DO check this route allUser 
const auth = async(req,res,next)=>{ 
    try {
 const token = req.cookies?.token || req.headers["authorization"]?.replace("Bearer ","")

     if(!token){
        return res.status(401).json({ message: 'Token does not exist' })
    }
        const decodedToken = jwt.verify(token,process.env.JWT_SECRET)
        const user = await User.findById(decodedToken._id)
        if(!user){
            return res.status(404).json({ message: 'User not found from token' })
        }
        req.user = user
        next();
  
} catch (error) {
    console.log("Error fetching token in auth middlewares")
    return res.status(401).json({ message: 'Invalid token' })
}

}
export default auth