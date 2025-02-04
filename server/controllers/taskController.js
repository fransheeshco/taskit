import Task from "../models/Task.js";
import mongoose from "mongoose";

const EMAIL = process.env.EMAIL;
const PASSWORD = process.env.PASSWORD;

const createTask = async (req, res) => {
  const { title, description, dueDate, createdAt } = req.body;

  try {
    const user_id = req.user._id;
    const task = await Task.create({
      title,
      description,
      dueDate,
      createdAt,
      user_id,
    });
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getTasks = async (req, res) => {
  const user_id = req.user._id;
  const tasks = await Task.find({ user_id }).sort({ createdAt: -1 });
  res.status(200).json(tasks);
};

const getTask = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such workout" });
  }
  const task = await Task.findById(id);

  if (!task) {
    return res.status(404).json({ error: "no such task found..." });
  }

  res.status(200).json(task);
};

const deleteTask = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such workout" });
  }

  const task = await Task.findByIdAndDelete({ _id: id });

  if (!task) {
    return res.status(404).json({ error: "no such task found..." });
  }
  res.status(200).json({ mssg: "workout deleted..." });
};

const patchTask = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such workout" });
  }
  const task = await Task.findByIdAndUpdate({ _id: id }, { ...req.body });
  if (!task) {
    return res.status(404).json({ error: "no such task found..." });
  }
  res.status(200).json(task);
};

const taskControllers = {
  createTask,
  getTasks,
  getTask,
  deleteTask,
  patchTask,
};

export default taskControllers;
