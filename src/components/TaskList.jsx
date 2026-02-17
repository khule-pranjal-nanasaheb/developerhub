// src/components/TaskList.jsx
import React, { useEffect, useState } from "react";
import { getTasks, deleteTask } from "../services/taskService";
import TaskForm from "./TaskForm";

const TaskList = ({ refreshSignal }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingTask, setEditingTask] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    async function fetchTasks() {
      try {
        const res = await getTasks();
        setTasks(res.data);
      } catch (err) {
        console.error("Error fetching tasks", err);
      } finally {
        setLoading(false);
      }
    }
    fetchTasks();
  }, [refreshSignal]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await deleteTask(id);
      setTasks(tasks.filter((t) => t.id !== id));
    } catch (err) {
      console.error("Error deleting task", err);
    }
  };

  const handleSaved = () => {
    setShowForm(false);
    setEditingTask(null);
    // trigger refresh
    setTasks([]);
    setLoading(true);
  };

  return (
    <div className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>📝 Task List</h4>
        <button
          className="btn btn-success"
          onClick={() => {
            setEditingTask(null);
            setShowForm((s) => !s);
          }}
        >
          ➕ {showForm ? "Close Form" : "Add Task"}
        </button>
      </div>

      {showForm && (
        <div className="mb-3">
          <TaskForm
            editingTask={editingTask}
            onSaved={handleSaved}
            onCancel={() => {
              setShowForm(false);
              setEditingTask(null);
            }}
          />
        </div>
      )}

      {loading ? (
        <p>Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p>No tasks available.</p>
      ) : (
        <table className="table table-striped shadow-sm">
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Project</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.title}</td>
                <td>
                  <span
                    className={`badge ${
                      task.status === "DONE"
                        ? "bg-success"
                        : task.status === "IN_PROGRESS"
                        ? "bg-warning text-dark"
                        : "bg-secondary"
                    }`}
                  >
                    {task.status}
                  </span>
                </td>
                <td>{task.project ? task.project.name : "—"}</td>
                <td>
                  <button
                    className="btn btn-sm btn-primary me-2"
                    onClick={() => {
                      setEditingTask(task);
                      setShowForm(true);
                    }}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(task.id)}
                  >
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TaskList;
