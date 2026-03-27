import { Calendar } from "lucide-react";

export const TaskItem = ({ title, description, date, priority }) => {
    const priorityClasses = {
        High: "task-priority-high",
        Medium: "task-priority-medium",
        Low: "task-priority-low",
    }


    return (
        <div className="task-item">
            <div className="item-wrapper">
                <h3 className="task-heading">{title}</h3>
                <span className={`task-priority ${priorityClasses[priority]}`}>{priority}</span>
            </div>
            <p className="task-p">{description}</p>
            <div className="date-wrapper">
                <Calendar className="calendar-icon" />
                <span>{date}</span>
            </div>
        </div>
    )
}