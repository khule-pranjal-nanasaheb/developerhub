// src/pages/TasksPage.jsx
import React, { useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

const TasksPage = () => {
  const [refreshTasks, setRefreshTasks] = useState(0);

  const onTaskSaved = () => {
    setRefreshTasks((r) => r + 1);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">📝 Task Management</h2>

      {/* Task Form */}
      <div className="mb-4">
        <TaskForm onSaved={onTaskSaved} />
      </div>

      {/* Task List */}
      <TaskList refreshSignal={refreshTasks} />
    </div>
  );
};

export default TasksPage;
