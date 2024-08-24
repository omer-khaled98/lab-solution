import express from "express";
import { dbConnection } from "./database/dbConnection.js";
// import userModel from "./database/models/user.model.js";
import userRoute from "./src/modules/users/user.routes.js";
import noteRoute from "./src/modules/notes/notes.routes.js";

import senEmails from "./src/util/sendEmail.js";

const app = express();
const port = 3000;
app.use(express.json());
dbConnection;

app.use(userRoute);
app.use(noteRoute);

// app.get("/user", async (req, res) => {
//   const getAll = await userModel.find();

//   res.json(getAll);
// });

// app.post("/user", async (req, res) => {
//   await userModel.insertMany(req.body);
//   res.json({ message: "added" });
// });
// app.delete("/user/:id", async (req, res) => {
//   const user = await userModel.deleteOne({ _id: req.params.id });
//   res.json({ message: "deleted", user });
// });
// app.put("/user/:id", async (req, res) => {
//   const user = await userModel.findByIdAndUpdate(
//     req.params.id,
//     {
//       name: req.body.name,
//     },
//     { new: true }
//   );
//   res.json({ message: "updated", user });
// });

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
