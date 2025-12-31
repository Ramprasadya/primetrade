import express from "express";
import Task from "../models/Task.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth, async (req, res) => {
  const tasks = await Task.find({ user: req.user });
  res.json(tasks);
});


router.post("/", auth, async (req, res) => {
  if (!req.body.title)
    return res.status(400).json({ message: "Title required" });

  const task = await Task.create({
    title: req.body.title,
    user: req.user,
  });

  res.json(task);
});

router.put("/:id", auth, async (req, res) => {
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, user: req.user },
    { title: req.body.title, completed: req.body.completed },
    { new: true }
  );

  res.json(task);
});


router.delete("/:id", auth, async (req, res) => {
  await Task.findOneAndDelete({
    _id: req.params.id,
    user: req.user,
  });

  res.json({ message: "Task deleted" });
});

export default router;
