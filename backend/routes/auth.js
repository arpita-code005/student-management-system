import express from 'express';
import bcrypt from 'bcrypt';
import { loginSchema, registerSchema } from '../validators/userValidation.js';
import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

router.post('/register',async(req,res)=>{
    try {
        const {error, value} = registerSchema.validate(req.body)
        if(error){
           return res.status(400).json({error:error.details[0].message});
        }

        const {name, email, password} = value

        const existingEmail = await User.findOne({email})
        if(existingEmail){
            return res.status(400).json({error:'Email already existing'});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password , salt)

        const user = await User.create({name,email,password:hashedPassword, role: "teacher"})

        res.status(201).json({
            message:'user registered successfully',
            user:{
                id: user._id,
                name:user.name,
                email:user.email,
                role:user.role
            },
        });

        
    } catch (error) {
        console.error('register Error', error.message)
        res.status(500).json({error: 'Server error during registration'})
        
    }
    
})

router.post('/login',async(req,res)=>{
    try {
        const{error, value} = loginSchema.validate(req.body)
        if(error){
        return res.status(400).json({error: error.details[0].message})
        }
        const {email, password}= value;
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({error:'invaid email or password'});

        }

        const isMacth = await bcrypt.compare(password,user.password);
        if(!isMacth){
            return res.status(400).json({error:"invalid password or email"});
        }

        const token = jwt.sign(
        {userId: user._id,role: user.role},
        process.env.JWT_SECRET,
        {expiresIn: '1d'}
        )

        res.status(200).json({
            message:'Login Done',
            token,
            user:{
                id:user.id,
                name: user.name,
                email: user.email,
                role: user.role
            },
        })
    } catch (error) {
          console.error('Login error:', error.message);
    res.status(500).json({ error: 'Server error during login' });
        
    }
})


router.get('/me',authMiddleware,(req,res)=>{
    res.json({
        error: 'You are authentictaed!',
        user:req.user
    })
})

export default router;
