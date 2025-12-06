const express = require("express");
const Note = require("../models/noteSchema")
const User = require("../models/userSchema");
const authMiddleware = require("../middlewares/authorization");
const { emitNewNote } = require("../socket/emitNote");

const router = express.Router();

router.post("/notes", authMiddleware, async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    const note = await Note.create({
      title,
      content,
      user: req.user.id,
    });
    const user = await User.findById(req.user.id);

    emitNewNote(user.name, note.title);

    res.status(201).json(note);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating note" });
  }
});

module.exports = router;
