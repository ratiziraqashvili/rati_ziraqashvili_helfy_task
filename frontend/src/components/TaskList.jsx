import { TaskItem } from "./TaskItem";

export const TaskList = () => {

const initialTasks = [
  {
    id: 1,
    title: "Design System Review",
    description: "Review and update the design system components for the new dashboard",
    date: "Mar 28, 2026",
    priority: "High",
  },
  {
    id: 2,
    title: "Client Meeting Prep",
    description: "Prepare presentation slides and demo materials for quarterly review",
    date: "Mar 29, 2026",
    priority: "Medium",
  },
  {
    id: 3,
    title: "Code Documentation",
    description: "Update API documentation and add examples for new endpoints",
    date: "Mar 30, 2026",
    priority: "Low",
  },
  {
    id: 4,
    title: "User Testing Session",
    description: "Conduct usability testing with 5 participants for the new feature",
    date: "Mar 31, 2026",
    priority: "High",
  },
  {
    id: 5,
    title: "Performance Optimization",
    description: "Analyze and improve load times for the main application pages",
    date: "Apr 1, 2026",
    priority: "Medium",
  },
  {
    id: 6,
    title: "Team Retrospective",
    description: "Facilitate sprint retrospective and gather team feedback",
    date: "Apr 2, 2026",
    priority: "Low",
  },
];

  return (
    <div className="list-container">
      <h2 className="form-heading">Active Tasks</h2>
      <div className="task-list">
        <div className="task-wrapper">
            {initialTasks.map((task) => (
                <TaskItem 
                    key={task.id}
                    title={task.title}
                    description={task.description}
                    date={task.date}
                    priority={task.priority}
                />
            ))}
        </div>
      </div>
    </div>
  );
};
