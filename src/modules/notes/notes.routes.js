import express from "express";
import {
  createNote,
  deleteNote,
  getAllNotes,
  updateNote,
} from "./notes.controller.js";
import { tokenVerification } from "../../middleware/tokenCheck.js";
import hasAccessTo from "../../middleware/hasAccessTo.js";

const noteRoutes = express.Router();

noteRoutes.route("/note", tokenVerification);
noteRoutes
  .route("/note")
  .post(tokenVerification, hasAccessTo("User"), createNote)
  .get(tokenVerification, hasAccessTo("User", "Admin"), getAllNotes);
noteRoutes
  .route("/note/:id")
  .delete(tokenVerification, hasAccessTo("User", "Admin"), deleteNote)
  .put(tokenVerification, hasAccessTo("User"), updateNote);

export default noteRoutes;
