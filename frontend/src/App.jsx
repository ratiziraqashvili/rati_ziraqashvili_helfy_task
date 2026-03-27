import { useState, useRef, useEffect } from "react";
import { Plus, CheckCircle2 } from "lucide-react";
import "./App.css";

function App() {
  return (
    <div className="main-container">
      <header className="header-style">
        <div className="header-helper">
          <div className="header-container">
            <CheckCircle2 className="header-icon" />
            <h1 className="first-heading">Task Manager</h1>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
