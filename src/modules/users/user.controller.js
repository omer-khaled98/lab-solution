import userModel from "../../../database/models/user.model.js";
import bcrypt from "bcrypt";
import sendEmails from "../../util/sendEmail.js";
import jwt from "jsonwebtoken";

let users = [
  {
    id: 1,
    name: "Ahmed",
    age: 33,
  },
];

// جلب كل المستخدمين
const getAllUsers = (req, res) => {
  res.json({ message: "Getting All Users", users });
};

// تسجيل مستخدم جديد
const signUp = async (req, res) => {
  await userModel.insertMany(req.body);
  sendEmails(req.body.email);
  res.json({ message: "added" });
};

// إضافة مستخدم جديد
const addUser = (req, res) => {
  req.body.id = users[users.length - 1].id + 1;
  users.push(req.body);
  res.json({ message: "Added", users });
};

// حذف مستخدم
const deleteUser = (req, res) => {
  users = users.filter((x) => x.id != req.params.id);
  res.json({ message: "Deleted", users });
};

// تسجيل الدخول
const signIn = async (req, res) => {
  let foundedUser = await userModel.findOne({ email: req.body.email });
  if (
    !foundedUser ||
    !bcrypt.compareSync(req.body.password, foundedUser.password)
  )
    return res.status(404).json({ message: "email or password is wrong" });

  let token = jwt.sign({ id: foundedUser._id, role: foundedUser.role }, "Bl7");
  console.log(token);

  res.status(200).json({ message: "wellllcome", token });
};

// تحديث مستخدم
const updateUser = (req, res) => {
  let updatedOne = users.find((x) => x.id == req.params.id);
  updatedOne.name = req.body.name;
  res.json({ message: "Updated", users });
};

// التحقق من الحساب باستخدام OTP
const verifyAccount = async (req, res) => {
  const { email, otp } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (user.otp == otp) {
    const verifiedUser = await userModel.findOneAndUpdate(
      { email: req.body.email },
      { isVerified: true, otp: null },
      { new: true }
    );
    return res.json({ message: "Welcome", verifiedUser });
  } else {
    return res.status(401).json({ message: "Invalid OTP" });
  }
};

// تصدير الدوال
export {
  signUp,
  signIn,
  getAllUsers,
  addUser,
  deleteUser,
  updateUser,
  verifyAccount,
};
