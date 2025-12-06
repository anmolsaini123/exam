const express = require("express");
const Note = require("../models/noteSchema");
const auth = require("../middlewares/authorization");
const router = express.Router();

router.post("/create", auth, async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) return res.status(400).json({ error: "Title and content required" });

    const note = new Note({
      title,
      content,
      user: req.user.id
    });
    await note.save();

    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/view", auth, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
