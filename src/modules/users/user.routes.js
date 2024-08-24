import {
  addUser,
  deleteUser,
  getAllUsers,
  updateUser,
} from "./users.controller.js";
import express from "express";
import { signIn, signUp } from "./user.controller.js";
import { checkEmail } from "../../middleware/checkEamil.js";

const userRoute = express.Router();
userRoute.route("/user").get(getAllUsers).post(addUser);
userRoute.route("/user/:id").delete(deleteUser).put(updateUser);
userRoute.post("/signUp", checkEmail, signUp);
userRoute.post("/signIn", signIn);

export default userRoute;
