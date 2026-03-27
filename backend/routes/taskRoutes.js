import { Router } from "express";

const taskRouter = Router();

let tasks = [];
let nextId = 1;

//get all tasks
taskRouter.get("/", (req, res) => {
    if (tasks.length === 0) {
        return res.status(200).json({ message: "No tasks found", tasks: [] });
    }

    res.status(200).json({ tasks });
});

//create a new task
taskRouter.post("/", (req, res) => {
    const { title, description, priority } = req.body;

    if (!title || !description || !priority) {
        return res.status(400).json({ error: "Title, description, and priority are required." });
    }

    if (priority !== "low" && priority !== "medium" && priority !== "high") {
        return res.status(400).json({ error: "Priority must be 'low', 'medium', or 'high'." });
    }

    const newTask = {
        title,
        description,
        priority,
        completed: false,
        id: nextId++,
        createdAt: new Date()
    }

    tasks.push(newTask);
    res.status(201).json({ message: "Task created successfully", task: newTask });
});

//update a task
taskRouter.put("/:id", (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(400).json({ error: "Title and description are required." });
    }

    const taskIndex = tasks.findIndex(task => task.id === parseInt(id));

    if (taskIndex === -1) {
        return res.status(404).json({ error: "Task not found." });
    }

    tasks[taskIndex] = {
        ...tasks[taskIndex],
        title,
        description,
    };

    res.status(200).json({ message: "Task updated successfully", task: tasks[taskIndex] });
});

//delete a task
taskRouter.delete("/:id", (req, res) => {
    const { id } = req.params;
    
    const taskIndex = tasks.findIndex(task => task.id === parseInt(id));

    if (taskIndex === -1) {
        return res.status(404).json({ error: "Task not found." });
    }

    tasks.splice(taskIndex, 1);
    res.status(204).send();
});

//toggle completion status of a task
taskRouter.patch("/:id/toggle", (req, res) => {
    const { id } = req.params;

    const taskIndex = tasks.findIndex(task => task.id === parseInt(id));

    if (taskIndex === -1) {
        return res.status(404).json({ error: "Task not found." });
    }

    tasks[taskIndex].completed = !tasks[taskIndex].completed;

    res.status(200).json({ message: `Toggle completion status of task with id ${id}` });
})

export default taskRouter;