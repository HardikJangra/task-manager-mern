const express = require("express");

const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  toggleTaskStatus,
} = require("../controllers/taskController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Protected Routes
router.post("/", authMiddleware, createTask);

router.get("/", authMiddleware, getTasks);

router.put("/:id", authMiddleware, updateTask);

router.delete("/:id", authMiddleware, deleteTask);

router.patch("/:id/toggle", authMiddleware, toggleTaskStatus);

module.exports = router;