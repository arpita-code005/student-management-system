import express from "express";
import authMiddleware from "../middleware/auth.js";
import { studentSchema, updateStudentSchema } from "../validators/StudentValidation.js";
import Student from "../models/Students.js";

const routes = express.Router();

routes.use(authMiddleware);

routes.post("/", async (req, res) => {
  try {
    const { error, value } = studentSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const { name, email, age, course } = value;

    const student = await Student.create({
      name,
      email,
      age,
      course,
      userId: req.user.userId,
    });

    res.status(201).json({
      message: "Student Added Successfully",
      student,
    });
  } catch (error) {
    console.error("Create student error:", error.message);
    if (error.code === 11000) {
      return res.status(400).json({ error: "Student  email aleady added" });
    }
    res.status(500).json("Server network issuse");
  }
});

routes.get("/", async (req, res) => {
  try {
    let Students;
    if(req.user.role === 'admin'){
       Students = await Student.find().populate('userId','name')
    }else{
     Students = await Student.find({ userId: req.user.userId });
    
  }
  res.status(200).json({count:Students.length, students:Students})
  } catch (error) {
    console.error("get Student Error:", error.message);
    res.status(500).json("Server Error");
  }
});

routes.get("/:id", async (req, res) => {
  try {
    let students
    if(req.user.role === 'admin')
    {
      students = await Student.findById(req.params.id).populate('userId','name');
    }else{
    
     students = await Student.findOne({
      _id: req.params.id,
      userId: req.user.userId,
    });
  }
    if (!students) {
      return res.status(400).json("Student not found");
    }

    res.status(200).json({ students });
  } catch (error) {
    console.error("get Student Error", error.message);
    res.status(500).json("Server Issuse");
  }
});

routes.put('/:id', async (req,res)=>{
   try {
     const {error, value} = updateStudentSchema.validate(req.body)
    if(error){
        return res.status(400).json({error: error.details[0].message})
    }
    const student   = await Student.findOneAndUpdate({
        _id: req.params.id,
        userId: req.user.userId
    }, value, {new: true , runValidators: true});
    if(!student){
        return res.status(400).json("Studnet not Found")
    }
    res.status(200).json({
        message:"Student Updated",
        student
    })
    
   } catch (error) {
     console.error("Update Student Error", error.message);
    res.status(500).json("Server Issuse");
   }

})

routes.delete("/:id",async (req,res)=>{
   try {
     const stundet = await Student.findOneAndDelete({
        _id: req.params.id,
        userId: req.user.userId
    })
    if(!stundet){
        return res.status(404).json({error: 'Student not found'})
    }

    res.status(200).json({message:"Student Deleted"})
    
   } catch (error) {
    console.error("Delete Student Error", error.message);
    res.status(500).json("Server Issuse");
   }

})

export default routes;
