import express from 'express'
import { protect } from '../middlewares/auth.js';
import { authorize } from '../middlewares/authorize.js';
const router = express.Router();

// protected route
router.get('/dashboard', protect, authorize('admin'), (req,res)=>{
    res.json({message: `Welcome to dashboard Mr/Mrs.${req.user.name}`})
})

export default router;