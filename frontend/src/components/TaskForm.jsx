import { Plus } from "lucide-react";
import { createTask } from "../services/taskService";
import { useState } from "react";

export const TaskForm = ({ refreshTasks }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("low");

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setPriority("low");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const taskData = {
      title,
      description,
      priority,
    };

    try {
      await createTask(taskData);
      e.target.reset();
      resetForm();

      refreshTasks();

      alert("Task created successfully!");
    } catch (error) {
      console.error("Error creating task in client:", error);
      alert("Error creating task.");
    }
  };

  return (
    <div className="task-form-container">
      <div className="form-card">
        <h2 className="form-heading">Create a new task</h2>

        <form onSubmit={handleSubmit} className="form-style">
          <div className="input-group">
            <div>
              <label htmlFor="title" className="form-label">
                Task Title
              </label>
              <input
                id="title"
                type="text"
                placeholder="Enter task title"
                className="form-input"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="priority" className="form-label">
                Task Priority
              </label>
              <select
                id="priority"
                className="form-input"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="description" className="form-label">
              Task Description
            </label>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              id="description"
              placeholder="Enter task description"
              className="form-input"
              rows={4}
            />
          </div>
          <button type="submit" className="submit-button">
            <Plus className="plus-icon" />
            Create Task
          </button>
        </form>
      </div>
    </div>
  );
};
