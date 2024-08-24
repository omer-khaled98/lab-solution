import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  let { token } = req.header;
  jwt.verify(token, "Bl7", async (err, decoded) => {
    if (err) return res.status(401).json({ messege: "rerror", err });
  });

  req.user = decoded;
  next();
};
