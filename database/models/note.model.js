import mongoose, { Schema, model } from "mongoose";

const noteScheam = new Schema(
  {
    title: { type: String, require: true },
    desc: String,

    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: true,
  }
);

const noteModel = model("Note", noteScheam);

export default noteModel;
