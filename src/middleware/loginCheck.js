import userModel from "../../database/models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const authenticatedUser = async (req, res, next) => {
  const isUserExist = await userModel.findOne({ email: req.body.email });
  req.user = isUserExist;
  if (!isUserExist) {
    return res.status(404).json({ message: "User Not Found" });
  }
  next();
};
export const checkPassword = (req, res, next) => {
  const foundedUser = req.user;
  if (
    !foundedUser ||
    !bcrypt.compareSync(req.body.password, foundedUser.password)
  )
    return res.status(422).json({ message: "Email Or Password is Invaild" });
  next();
};

export const checkVerification = (req, res, next) => {
  const matchedUser = req.user;
  if (matchedUser.isVerified == false)
    return res.status(401).json({ message: "Account is not Verefied" });
  next();
};

export const generateToken = (req, res, next) => {
  const verifiedUser = req.user;
  const token = jwt.sign(
    { id: verifiedUser._id, role: verifiedUser.role },
    "Fade",
    { expiresIn: "24h" }
  );
  console.log(token);

  req.token = token;
  next();
};
