const express = require("express");
const taskModel = require("../models/taskModel");

// add task
const addTaskController = async (req, res) => {
  const user = req.user._id;
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(500).send({
        success: false,
        message: "Title is required",
      });
    } else if (!description) {
      return res.status(500).send({
        success: false,
        message: "Description is required",
      });
    }

    const task = await new taskModel({
      user,
      title,
      description,
    }).save();

    if (task) {
      res.status(200).send({
        task,
        success: true,
        message: "task added successfully",
      });
    } else {
      res.status(500).send({
        success: false,
        message: "error in add task api controller",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in add task controller",
    });
  }
};

// update task
const updateTaskController = async (req, res) => {
  try {
    const { done } = req.body;

    const task = await taskModel.findByIdAndUpdate(
      req.params.id,
      {
        done,
      },
      { new: true }
    );

    if (task) {
      res.status(200).send({
        success: true,
        message: "Task done",
      });
    } else {
      res.status(500).send({
        success: false,
        message: "Error in updating task",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in update task controller",
    });
  }
};

// delete task
const deleteTaskController = async (req, res) => {
  try {
    const task = await taskModel.findByIdAndDelete({ _id: req.params.id });

    if (task) {
      res.status(200).send({
        success: true,
        message: "Task Deleted",
      });
    } else {
      res.status(400).send({
        success: false,
        message: "Error in deleting task",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in delete task controller",
    });
  }
};

// get all tasks
const getAllTasksController = async(req, res)=>{
  try {
    const tasks = await taskModel.find({user:req.user._id});

    if(tasks){
      res.status(200).send({
        success:true,
        message:'fetched',
        tasks
      })
    }else{
      res.status(400).send({
        success:false,
        message:'no data found'
      })
    }

  } catch (error) {
    console.log(error);
    res.status(500).send({
      error,
      success:false,
      message:'Internal error'
    })
  }
}

module.exports = {
  addTaskController,
  updateTaskController,
  deleteTaskController,
  getAllTasksController
};


