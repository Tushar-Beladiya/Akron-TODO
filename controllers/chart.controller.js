const { Op } = require("sequelize");
const Todo = require("../models/todo");
const catchAsync = require("../utils/catchAsync");

exports.todoAnalytics = catchAsync(async (req, res) => {
  const { startDate, endDate } = req.body;

  if (startDate && endDate) {
    whereConds = {
      ...whereConds,
      created_at: {
        [Op.between]: [startDate, endDate],
      },
    };
  } else {
    whereConds = {
      ...whereConds,
      created_at: {
        [Op.between]: [startDate, endDate],
      },
    };
  }

  const createdTodos = await Todo.findAll({
    group: ["created_at"],
    where: whereConds,
  });

  // if()

  const completedTodos = await Todo.findAll({
    group: ["completed_at"],
    where: whereConds,
  });

  res.json({ status: "Success", resutl: { createdTodos, completedTodos } });
});
