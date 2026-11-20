import mongoose from "mongoose";

const connectDb = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB connetion Successfully")
        
    } catch (error) {
        console.log("MongoDB connetion Falid",error.message)
        process.exit(1);
        
    }
}

export default  connectDb;