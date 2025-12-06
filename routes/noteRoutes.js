const express = require("express");
const Note = require("../models/Note");
const authMiddleware = require("../middleware/auth");
const User = require("../models/User");
const emitNewNote = require("../socket/emitNote");

const router = express.Router();

router.post("/notes", authMiddleware, async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = await Note.create({ title, content, user: req.user.id });
    const user = await User.findById(req.user.id);
    emitNewNote(user.name, note.title);
    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ message: "Error creating note" });
  }
});

module.exports = router;
