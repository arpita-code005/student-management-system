import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is require"],
      trim: true,
      minlenght: [2, "Name must be at leaste 2 charactes"],
    },
    email: {
      type: String,
      require: [true, "Email is require"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Name is require"],
      minlenght: [2, "Name must be at leaste 2 charactes"],
    },

    role: {
      type: String,
      enum: ["admin", "teacher"],
      default: "teacher",
    },
  },
  { timestamps: true },
);
  const User = mongoose.model('User', userSchema);
  export default User;