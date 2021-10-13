const asyncWrapper = require("../middleware/async");
const Task = require("../models/tasks");
const { createCustomError } = require("../errors/custom-error");

exports.getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
});

exports.createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

exports.getTask = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const task = await Task.findById(id);
  if (!task) {
    return next(createCustomError(`No task with id : ${id}`, 404));
  }
  res.status(200).json({ task });
});

exports.updateTask = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const newTask = await Task.findByIdAndUpdate(id, req.body, { new: true });
  if (!newTask) {
    return next(createCustomError(`No task with id : ${id}`, 404));
  }
  res.status(201).json({ newTask });
});

exports.deleteTask = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const task = await Task.findByIdAndRemove(id);
  if (!task) {
    return next(createCustomError(`No task with id : ${id}`, 404));
  }
  res.status(201).json({ task });
});
