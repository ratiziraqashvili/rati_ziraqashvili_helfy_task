import { useState, useRef, useEffect } from "react";
import { CheckCircle2 } from "lucide-react";
import "./App.css";
import { TaskForm } from "./components/TaskForm";
import { TaskList } from "./components/TaskList";

function App() {
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

        <TaskForm />
        <TaskList />
      </div>
    </div>
  );
}

export default App;
