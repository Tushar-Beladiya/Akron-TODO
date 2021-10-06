const { Op } = require("sequelize");
const Todo = require("../models/todo");
const catchAsync = require("../utils/catchAsync");

exports.todoAnalytics = catchAsync(async (req, res) => {
  const { startDate, endDate } = req.body;
  var whereConds = {};
  var completeCond = {};

  completeCond["status"] = "completed";

  const TODAY = new Date();
  const last7Day = new Date(TODAY.setDate(TODAY.getDate() - 7));

  if (startDate && endDate) {
    completeCond = {
      ...completeCond,
      created_at: {
        [Op.between]: [startDate, endDate],
      },
    };
    whereConds = {
      ...whereConds,
      created_at: {
        [Op.between]: [startDate, endDate],
      },
    };
  } else {
    completeCond = {
      ...completeCond,
      created_at: {
        [Op.between]: [last7Day, new Date()],
      },
    };
    whereConds = {
      ...whereConds,
      created_at: {
        [Op.between]: [last7Day, new Date()],
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
    where: completeCond,
  });

  res.json({ status: "Success", result: { createdTodos, completedTodos } });
});
