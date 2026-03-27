import { ChevronLeft, ChevronRight } from "lucide-react";
import { TaskItem } from "./TaskItem";
import { useEffect, useRef, useState } from "react";

export const TaskList = ({ tasks, refreshTasks }) => {
  const scrollRef = useRef(null);

  console.log(tasks);

  useEffect(() => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      container.scrollLeft = container.scrollWidth / 3;
    }
  }, []);

  const displayTasks = [...tasks, ...tasks, ...tasks];

  const handleInfitiniteScroll = () => {
    const container = scrollRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    const oneThird = scrollWidth / 3;

    const threshold = 10;

    if (scrollLeft + clientWidth >= scrollWidth - threshold) {
      container.scrollTo({ left: oneThird, behavior: "auto" });
    } else if (scrollLeft <= threshold) {
      container.scrollTo({
        left: oneThird * 2 - clientWidth,
        behavior: "auto",
      });
    }
  };

  const scroll = (direction) => {
  if (scrollRef.current) {
    const container = scrollRef.current;
    const scrollAmount = 374;
    const oneThird = container.scrollWidth / 3;

    let currentScroll = container.scrollLeft;
    let targetScroll = direction === "left" 
      ? currentScroll - scrollAmount 
      : currentScroll + scrollAmount;


    if (direction === "right" && targetScroll + container.clientWidth > (oneThird * 2)) {
      container.scrollTo({ left: currentScroll - oneThird, behavior: "auto" });
      targetScroll = currentScroll - oneThird + scrollAmount;
    } else if (direction === "left" && targetScroll < oneThird) {
      container.scrollTo({ left: currentScroll + oneThird, behavior: "auto" });
      targetScroll = currentScroll + oneThird - scrollAmount;
    }

    container.scrollTo({
      left: targetScroll,
      behavior: "smooth",
    });
  }
};
  return (
    <div className="list-container">
      <div
        className="list-header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2 className="form-heading">Active Tasks</h2>
        <div className="carousel-controls">
          <button className="control-btn" onClick={() => scroll("left")}>
            <ChevronLeft size={20} />
          </button>
          <button className="control-btn" onClick={() => scroll("right")}>
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      <div
        ref={scrollRef}
        className="carousel-viewport"
        onScroll={handleInfitiniteScroll}
      >
        <div className="carousel-track">
          {displayTasks.map((task, i) => (
            <TaskItem
              key={`${task.id}-${i}`}
              title={task.title}
              description={task.description}
              date={task.createdAt}
              priority={task.priority}
              id={task.id}
              refreshTasks={refreshTasks}
              isCompleted={task.completed}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
