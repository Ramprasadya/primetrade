import express from "express";
import User from "../models/User.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/profile", auth, async (req, res) => {
  const user = await User.findById(req.user).select("-password");
  res.json(user);
});

router.put("/profile", auth, async (req, res) => {
  const { name } = req.body;

  const user = await User.findByIdAndUpdate(
    req.user,
    { name },
    { new: true }
  ).select("-password");

  res.json(user);
});

export default router;
