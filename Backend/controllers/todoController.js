import Todo from "../models/Todo.js";


export const createTodo = async (req, res) => {
   try {
     const { title, description, priority } = req.body;
     const newTodo = new Todo({
       title,
       description,
       priority,
       user: req.user.id
     });
     await newTodo.save();
     res.status(201).json({ message: "Todo created successfully", newTodo });
   } catch (error) {
     res.status(400).json({ message: error.message });

   }
};

export const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find({user: req.user.id}).sort({ createdAt: -1 });
         res.status(200).json({
            message: "Todos fetched successfully",
            todos
         });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

export const getTodoById = async (req, res) => {
    try {
            const todo = await Todo.findById({ _id: req.params.id, user: req.user.id });
    if (!todo) {
        return res.status(404).json({ message: "Todo not found" });
    }
    res.status(200).json({
      message: "Todo fetched successfully",
      todo
    });
    } catch (error) {
         res.status(500).json({
      message: "Server error",
      error: error.message
    });
    }
};

export const updateTodo = async (req, res) => {
  try {

    const { title, description, completed } = req.body;

    const todo = await Todo.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id
      },
      {
        title,
        description,
        completed
      },
      { new: true }
    );

    if (!todo) {
      return res.status(404).json({
        message: "Todo not found"
      });
    }

    res.status(200).json({
      message: "Todo updated successfully",
      todo
    });

  } catch (error) {

    res.status(500).json({
      message: "Server error",
      error: error.message
    });

  }
};

export const completeTodo = async (req, res) => {
  try {

    const todo = await Todo.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id
      },
      {
        completed: true
      },
      { new: true }
    );

    if (!todo) {
      return res.status(404).json({
        message: "Todo not found"
      });
    }

    res.status(200).json({
      message: "Todo marked as completed",
      todo
    });

  } catch (error) {

    res.status(500).json({
      message: "Server error",
      error: error.message
    });

  }
}

export const deleteTodo = async (req, res) => {
  try {

    const todo = await Todo.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });

    if (!todo) {
      return res.status(404).json({
        message: "Todo not found"
      });
    }

    res.status(200).json({
      message: "Todo deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: "Server error",
      error: error.message
    });

  }
};

