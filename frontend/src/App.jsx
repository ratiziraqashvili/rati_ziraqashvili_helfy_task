import { useState, useRef, useEffect } from "react";
import { CheckCircle2 } from "lucide-react";
import "./App.css";
import { TaskForm } from "./components/TaskForm";
import { TaskList } from "./components/TaskList";
import { getAllTasks } from "./services/taskService";

function App() {
  const [task, setTask] = useState([]);

  const refreshTasks = async () => {
    try {
      const data = await getAllTasks();
      setTask(data);
    } catch (error) {
      console.error("Error refreshing tasks in App component:", error);
    }
  }

  useEffect(() => {
    refreshTasks();
  }, []);

  return (
    <div className="main-container">
      <div className="wrapper">
        <header className="header-style">
          <div className="header-helper">
            <div className="header-container">
              <CheckCircle2 className="header-icon" />
              <h1 className="first-heading">Task Manager</h1>
            </div>
          </div>
        </header>

        <TaskForm refreshTasks={refreshTasks} />
        <TaskList tasks={task} />
      </div>
    </div>
  );
}

export default App;
