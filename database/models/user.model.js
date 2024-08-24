import mongoose from "mongoose";

// 1- schema
const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    age: Number,
    role: {
      type: String,
      enums: ["User", "Admin"],
      default: "User",
    },
      isConfirme: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
// 2- creat model
const userModel = mongoose.model("user", userSchema);

export default userModel;
