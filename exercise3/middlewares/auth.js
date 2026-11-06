import jwt from 'jsonwebtoken'
import User from '../models/User.js';

export const protect = async(req,res,next)=>{
    const token = req.headers.authorization?.split(" ")[1];
    // console.log("req header authorization: ",token)
    if(!token) return res.status(401).json({message: "Access denied"})
    
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        // console.log("decode:", decode)
        req.user = await User.findById(decode.id).select('-password')
        next()
    } catch (err) {
        res.status(401).json({message: "Invalid or expired token"})
    }

    
}
