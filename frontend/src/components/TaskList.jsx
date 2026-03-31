import { ChevronLeft, ChevronRight } from "lucide-react";
import { TaskItem } from "./TaskItem";
import { useEffect, useRef, useState } from "react";

export const TaskList = ({ tasks, refreshTasks }) => {
  const scrollRef = useRef(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getTasksPerPage = () => {
    if (windowWidth > 1024) return 3;
    if (windowWidth > 768) return 2;
    return 1;
  };

  const tasksPerPage = getTasksPerPage();
  const isCarousel = tasks.length > tasksPerPage;

  const displayTasks = isCarousel ? [...tasks, ...tasks, ...tasks] : tasks;

  useEffect(() => {
    if (scrollRef.current && isCarousel) {
      const container = scrollRef.current;

      const timer = setTimeout(() => {
        container.scrollLeft = container.scrollWidth / 3;
      }, 10);
      return () => clearTimeout(timer);
    }
  }, [isCarousel, tasks.length, windowWidth]);

  const handleInfitiniteScroll = () => {
    if (!isCarousel || !scrollRef.current) return;

    const container = scrollRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth } = container;
    const oneThird = scrollWidth / 3;

    const margin = 50;

    if (scrollLeft >= oneThird * 2 - margin) {
      container.scrollLeft = scrollLeft - oneThird;
    } else if (scrollLeft <= margin) {
      container.scrollLeft = scrollLeft + oneThird;
    }
  };

  const scroll = (direction) => {
    if (!isCarousel || !scrollRef.current) return;
    const container = scrollRef.current;

    const scrollAmount = 374;
    const oneThird = container.scrollWidth / 3;

    let currentScroll = container.scrollLeft;
    let targetScroll =
      direction === "left"
        ? currentScroll - scrollAmount
        : currentScroll + scrollAmount;

    if (direction === "right" && targetScroll >= oneThird * 2) {
      container.scrollLeft = currentScroll - oneThird;
      targetScroll = container.scrollLeft + scrollAmount;
    } else if (direction === "left" && targetScroll <= 0) {
      container.scrollLeft = currentScroll + oneThird;
      targetScroll = container.scrollLeft - scrollAmount;
    }

    container.scrollTo({
      left: targetScroll,
      behavior: "smooth",
    });
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
        <div className={isCarousel ? "carousel-track" : "no-carousel-track"}>
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
