import { Todo } from "../models/exampleModel.js";
import { Error as MongooseError } from "mongoose";
const { ValidationError } = MongooseError;

export const getHelloWorld = (req, res) => {
  res.status(200).json({ message: "Hello World!" });
};

export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: error?.message ?? "Something went wrong" });
  }
};

export const addTodo = async (req, res) => {
  try {
    const { task } = req.body;
    const todo = await Todo.create({ task });
    res.status(201).json(todo);
  } catch (error) {
    if (error instanceof ValidationError)
      return res.status(400).json({ message: error.message });
    res.status(500).json({ message: error?.message ?? "Something went wrong" });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { task, done } = req.body;
    const todo = await Todo.findByIdAndUpdate(
      id,
      { task, done },
      { new: true }
    );
    res.status(200).json(todo);
  } catch (error) {
    if (error instanceof ValidationError)
      return res.status(400).json({ message: error.message });
    res.status(500).json({ message: error?.message ?? "Something went wrong" });
  }
};
