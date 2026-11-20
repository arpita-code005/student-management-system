import express from 'express';
import User from '../models/user.js'
import authMiddleware, { adminOnly } from '../middleware/auth.js';
import bcrypt from 'bcrypt';
import Student from '../models/Students.js';

const router = express.Router();
router.use(authMiddleware);
router.use(adminOnly)
router.get('/' ,async(req,res)=>{
    try{
    const teacher =  await User.find({role:'teacher'}).select('-password');
    res.status(200).json({count: teacher.length, users: teacher});
    } catch(error){
        res.status(500).json("Server Issuse",error.message)
    }

})

router.post('/',async(req,res)=>{
    try {
        const {name, email,password} =req.body;
        const exstingemail = await User.findOne({email});
        if(exstingemail){
            return res.status(400).json({error:"Email Already exists"})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = await User.create({
            name,email,password: hashedPassword, role:'teacher'
        })
        res.status(201).json({message:"Teacher Added successfully", user:{id:newUser._id,name,email}})
    } catch (error) {
        console.error("Add Taecher error:", error.message)
        res.status(500).json("Server Error");
        
    }
})

router.delete('/:id',async(req,res)=>{
    try{
    const user = await User.findById(req.params.id);
    if(!user)return res.status(404).json({error:'User not found'})
        if(user.role === 'admin'){
            return res.status(400).json({error:'Cannot delete an admin'})
        }

        await Student.updateMany(
        
            {userId: req.params.id},
            {$set:{userId: null}}
        )



        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({message:'Teacher Deleted Successfully'})
    }catch(error){
        console.error("Error while teacher:",error)
        res.status(500).json({error: error.message})
    }

})

export default router;