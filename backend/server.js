import express from "express";
import cors from "cors";
import connectDb from "./config/db.js";
import authRoutes from "./routes/auth.js"
import studentRoutes from './routes/students.js'
import adminRouter from "./routes/admin.js"


const app = express();

app.use(cors());
app.use(express.json());

connectDb();

app.get("/", (req, res) => {
  res.send("student /managament API is running");
});

app.use('/api/auth',authRoutes)
app.use('/api/students', studentRoutes)
app.use('/api/users',adminRouter);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`sever running on ${PORT}`);
});
