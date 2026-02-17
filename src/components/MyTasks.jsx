import React, { useEffect, useState } from "react";
import { getMyTasks, updateTask } from "../services/taskService";

export default function MyTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyTasks();
  }, []);

  const fetchMyTasks = async () => {
    try {
      const data = await getMyTasks();
      setTasks(data);
    } catch (err) {
      console.error("Error fetching my tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (task, newStatus) => {
    try {
      const updated = await updateTask(task.id, { ...task, status: newStatus });
      setTasks((prev) =>
        prev.map((t) => (t.id === task.id ? updated : t))
      );
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  if (loading) return <p className="text-gray-500">Loading your tasks...</p>;

  if (tasks.length === 0) {
    return <p className="text-gray-500">No tasks assigned to you yet.</p>;
  }

  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h2 className="text-lg font-semibold mb-4">📋 My Tasks</h2>
      <ul className="space-y-3">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="p-3 border rounded flex justify-between items-center"
          >
            <div>
              <p className="font-medium">{task.title}</p>
              <p className="text-sm text-gray-500">
                {task.description || "No description"}
              </p>
              <p
                className={`text-xs font-semibold ${
                  task.priority === "HIGH"
                    ? "text-red-600"
                    : task.priority === "MEDIUM"
                    ? "text-yellow-600"
                    : "text-green-600"
                }`}
              >
                Priority: {task.priority}
              </p>
              <p className="text-xs text-gray-600">
                Due: {task.dueDate || "—"}
              </p>
            </div>
            <div>
              <select
                value={task.status}
                onChange={(e) => handleStatusChange(task, e.target.value)}
                className="border rounded px-2 py-1 text-sm"
              >
                <option value="PENDING">Pending</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
