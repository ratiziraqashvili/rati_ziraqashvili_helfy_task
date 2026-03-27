import { Plus } from "lucide-react";
import { createTask } from "../services/taskService";
import { useState } from "react";

export const TaskForm = ({ refreshTasks }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("low");
  const [errors, setErrors] = useState({});

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setPriority("low");
  };

  const validate = () => {
    const newErrors = {};
    if (!title.trim()) {
      newErrors.title = "Title is required.";
    } else if (title.length < 3 || title.length > 50) {
      newErrors.title = "Title must be between 3 and 50 characters.";
    }

    if (!description.trim()) {
      newErrors.description = "Description is required.";
    } else if (description.length > 200) {
      newErrors.description = "Description cannot exceed 200 characters.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

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
                className={`form-input ${errors.title ? "input-error" : ""}`}
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (errors.title) {
                    setErrors({ ...errors, title: null });
                  }
                }}
                minLength={3}
                maxLength={50}
              />
              {errors.title && <p className="error-text">{errors.title}</p>}
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
              onChange={(e) => {
                setDescription(e.target.value);
                if (errors.description) {
                  setErrors({ ...errors, description: null });
                }
              }}
              id="description"
              placeholder="Enter task description"
              className={`form-input ${errors.title ? "input-error" : ""}`}
              value={description}
              rows={4}
              maxLength={200}
            />
            {errors.description && (
              <p className="error-text">{errors.description}</p>
            )}
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
