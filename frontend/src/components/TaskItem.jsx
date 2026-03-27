import { Calendar, Check, Trash2, X } from "lucide-react";
import { useState } from "react";
import { deleteTask } from "../services/taskService";

export const TaskItem = ({
  title,
  description,
  date,
  priority,
  id,
  refreshTasks,
}) => {
  const [isConfirming, setIsConfirming] = useState(false);

  const priorityClasses = {
    high: "task-priority-high",
    medium: "task-priority-medium",
    low: "task-priority-low",
  };

  const handleDelete = async () => {
    try {
      await deleteTask(id);
      setIsConfirming(false);

      refreshTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  console.log(date);

  return (
    <div className="task-item">
      <div className="item-wrapper">
        <h3 className="task-heading">{title}</h3>
        <span className={`task-priority ${priorityClasses[priority]}`}>
          {priority.charAt(0).toUpperCase() + priority.slice(1)}
        </span>
      </div>
      <p className="task-p">{description}</p>
      <div className="date-wrapper">
        <div style={{ display: "flex", alignItems: "center" }}>
          <Calendar className="calendar-icon" />
          <span style={{ marginRight: "3px" }}>
            {date
              ? new Date(date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : "No Date"}
          </span>
        </div>
        {!isConfirming ? (
          <Trash2
            size={18}
            className="trash-icon"
            onClick={() => setIsConfirming(true)}
            style={{ cursor: "pointer", color: "#ef4444" }}
          />
        ) : (
          <div
            className="confirm-group"
            style={{ display: "flex", gap: "8px" }}
          >
            <Check
              size={18}
              color="green"
              onClick={handleDelete}
              style={{ cursor: "pointer" }}
            />
            <X
              size={18}
              color="gray"
              onClick={() => setIsConfirming(false)}
              style={{ cursor: "pointer" }}
            />
          </div>
        )}
      </div>
    </div>
  );
};
