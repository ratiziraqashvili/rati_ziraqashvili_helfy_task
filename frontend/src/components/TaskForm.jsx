import { Plus } from "lucide-react";

export const TaskForm = () => {
  return (
    <div className="task-form-container">
        <div className="form-card">
            <h2 className="form-heading">Create a new task</h2>

            <form className="form-style">
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
                        />
                    </div>
                    <div>
                        <label htmlFor="priority" className="form-label">
                            Task Priority
                        </label>
                        <select id="priority" className="form-input">
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
