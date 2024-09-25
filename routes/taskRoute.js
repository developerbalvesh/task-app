const express = require("express");
const { requireSignIn } = require("../middleware/authMiddleware");
const {
  addTaskController,
  updateTaskController,
  deleteTaskController,
} = require("../controller/taskController");

const router = express.Router();

// protected route

// add task
router.post("/add-task", requireSignIn, addTaskController);

// update task
router.put("/update-task/:id", requireSignIn, updateTaskController);

// delete task
router.delete("/delete-task/:id", requireSignIn, deleteTaskController);

module.exports = router;
