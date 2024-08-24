import userModel from "../../database/models/user.model.js";
import bcrypt from "bcrypt";
export const checkEmail = async (req, res, next) => {
  const foundedUser = await userModel.findOne({ email: req.body.email });
  if (foundedUser) return res.status(409).json({ messege: "already exsist" });
  req.body.password = bcrypt.hashSync(req.body.password, 8);
  next();
};
