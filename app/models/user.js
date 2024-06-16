import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    authType: String,
    name: String,
    email: String,
    password: String,
    image: String
  });
  
  export const User =
    mongoose?.models?.User || mongoose.model('User', userSchema);