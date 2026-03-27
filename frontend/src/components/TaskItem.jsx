import {
  Calendar,
  Check,
  CheckCircle2,
  Edit2,
  Save,
  Trash2,
  X,
} from "lucide-react";
import { useState } from "react";
import { deleteTask, toggleTask, updateTask } from "../services/taskService";

export const TaskItem = ({
  title,
  description,
  date,
  priority,
  id,
  refreshTasks,
  isCompleted,
}) => {
  const [isConfirming, setIsConfirming] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title,
    description,
  });

  const handleSave = async () => {
    try {
      await updateTask(id, editData);
      setIsEditing(false);
      refreshTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

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

  const handleToggle = async () => {
    try {
      await toggleTask(id);
      refreshTasks();
    } catch (error) {
      console.error("Error toggling task:", error);
    }
  };

  return (
    <div className={`task-item ${isCompleted ? "task-completed" : ""}`}>
      {isEditing ? (
        <div className="edit-mode">
          <input
            className="form-input"
            value={editData.title}
            onChange={(e) =>
              setEditData({ ...editData, title: e.target.value })
            }
            placeholder="Title"
          />
          <textarea
            className="form-input"
            value={editData.description}
            onChange={(e) =>
              setEditData({ ...editData, description: e.target.value })
            }
          />
          <div className="edit-actions">
            <Save onClick={handleSave} color="green" size={18} />
            <X onClick={() => setIsEditing(false)} color="gray" size={18} />
          </div>
        </div>
      ) : (
        <>
          <div className="item-wrapper">
            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <div
                onClick={handleToggle}
                style={{
                  cursor: "pointer",
                  marginRight: "4px",
                  marginTop: "2px",
                }}
              >
                {isCompleted ? (
                  <CheckCircle2 size={20} color="green" />
                ) : (
                  <CheckCircle2 size={20} color="gray" />
                )}
              </div>
              <h3
                className={`task-heading ${isCompleted ? "completed-text" : ""}`}
              >
                {title}
              </h3>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <Edit2
                size={16}
                className="edit-icon"
                onClick={() => setIsEditing(true)}
              />
              <span className={`task-priority ${priorityClasses[priority]}`}>
                {priority.charAt(0).toUpperCase() + priority.slice(1)}
              </span>
            </div>
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
        </>
      )}
    </div>
  );
};
