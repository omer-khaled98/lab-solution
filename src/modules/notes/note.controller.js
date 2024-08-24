import noteModel from "../../../DataBase/models/note.model.js";

const getAllNotes = async (req, res) => {
  let notes;
  if (req.user.role === "Admin") {
    console.log(req.user);
    notes = await noteModel.find();
  } else if (req.user.role === "User") {
    notes = await noteModel
      .find({ author: req.user.id })
      .select("title description ")
      .populate({
        path: "author",
        select: "name email -_id",
      });
  }

  res.status(200).json({ message: "All Notes Fetched", notes });
};

const createNote = async (req, res) => {
  req.body.author = req.user.id;
  let createdNote = await noteModel.insertMany(req.body);
  res.json({ message: "Note Created", createdNote });
};

const deleteNote = async (req, res) => {
  let deletedNote = await noteModel.findOneAndDelete({
    _id: req.params.id,
    author: req.user.id,
  });
  if (deletedNote) {
    res.json({ message: "Note Deleted", deletedNote });
  } else {
    res.status(404).json({ message: "Note Not Found" });
  }
};

const updateNote = async (req, res) => {
  let updatedNote = await noteModel.findOneAndUpdate(
    { _id: req.params.id, author: req.user.id },
    { $set: { title: req.body.title, description: req.body.description } },
    { new: true }
  );

  if (!updatedNote) {
    return res.status(404).json({ message: "Note Not Found" });
  }

  updatedNote && res.status(200).json({ message: "Note Updated", updatedNote });
};

export { createNote, getAllNotes, deleteNote, updateNote };
