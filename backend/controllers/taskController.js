const Task = require("../models/Task");

const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({
        message: "Title is required",
      });
    }

    const task = await Task.create({
      title,
      description,
      userId: req.user.id,
    });

    res.status(201).json({
      success: true,
      task,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const getTasks = async (req, res) => {
  res.json({
    message: "Get Tasks API Working",
  });
};

const updateTask = async (req, res) => {
  res.json({
    message: "Update Task API Working",
  });
};

const deleteTask = async (req, res) => {
  res.json({
    message: "Delete Task API Working",
  });
};

const toggleTaskStatus = async (
  req,
  res
) => {
  res.json({
    message: "Toggle API Working",
  });
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  toggleTaskStatus,
};