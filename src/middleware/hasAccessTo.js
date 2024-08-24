export default function hasAccessTo(...args) {
  return (req, res, next) => {
    console.log(req.user);
    if (args.includes(req.user.role)) {
      next();
    } else {
      res.status(401).json({ message: " Not Authorized" });
    }
  };
}
