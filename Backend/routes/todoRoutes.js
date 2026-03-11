import express from 'express';
import { completeTodo, createTodo, deleteTodo, getTodoById, getTodos, updateTodo } from "../controllers/todoController.js";
import authMiddleware from '../middleware/authMiddleware.js';


const router = express.Router();
router.post("/", authMiddleware, createTodo);
router.get("/", authMiddleware, getTodos);
router.get("/:id", authMiddleware, getTodoById);
router.put("/:id", authMiddleware, updateTodo);
router.patch("/:id/complete", authMiddleware, completeTodo);
router.delete("/:id", authMiddleware, deleteTodo);



export default router;