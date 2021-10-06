const Todo = require("../models/todo");
const catchAsync = require("../utils/catchAsync");

exports.createTodo = catchAsync(async (req, res, next) => {
  const body = req.body;

  const postBody = {
    name: body.name,
    created_at: new Date(),
    status: "Incomplate",
  };
  const todoData = await Todo.create(postBody);
  res.json({ status: "Succuss", result: todoData });
});

exports.getTodos = catchAsync(async (req, res, next) => {
  const todos = await Todo.findAll();

  res.json({ status: "Success", result: todos });
});

exports.getTodo = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  const todo = await Todo.findOne({
    where: {
      id,
    },
  });

  res.json({ status: "success", result: todo });
});

exports.deleteTodo = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  const deleteTodo = await Todo.destroy({
    where: {
      id,
    },
  });
  res.json({ status: "Success", result: deleteTodo });
});

exports.updateTodo = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const body = req.body;

  const postData = {
    name: body.name,
  };
  const update = await Todo.update(postData, {
    where: { id },
  });

  res.json({ status: "success", message: "updated successfully" });
});

exports.completeTodo = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const body = {
    completed_at: new Date(),
    status: "completed",
  };

  const todoData = await Todo.update(body, {
    where: {
      id,
    },
  });

  res.json({ status: "Success", message: "Task has been Completed" });
});
