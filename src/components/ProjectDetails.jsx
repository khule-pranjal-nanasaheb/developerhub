import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import projectService from "../services/projectService"; // ✅ CORRECT
import taskService from "../services/taskService";


export default function ProjectDetails() {
  const { id } = useParams(); // projectId from URL
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  // fetch project + tasks
useEffect(() => {
  async function fetchData() {
    try {
      // ✅ fetch project by id
      const projectData = await projectService.getProjectById(id);
      setProject(projectData);

      // ✅ fetch all tasks
      const tasksData = await taskService.getTasks();
      const filteredTasks = tasksData.filter(
        (t) => t.project?.id === parseInt(id)
      );
      setTasks(filteredTasks);
    } catch (err) {
      console.error("Error loading project details:", err);
    } finally {
      setLoading(false);
    }
  }
  fetchData();
}, [id]);


  const handleTaskAdded = (newTask) => {
    setTasks([...tasks, newTask]);
    setShowForm(false);
  };

  if (loading) return <p className="p-4">Loading project details...</p>;

  if (!project) return <p className="p-4">Project not found</p>;

  return (
    <div className="p-6 space-y-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="bg-gray-200 px-3 py-1 rounded-md hover:bg-gray-300"
      >
        ⬅ Back
      </button>

      {/* Project Info */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-2">{project.name}</h1>
        <p className="text-gray-600">{project.description}</p>
        <p className="mt-2 text-sm text-gray-500">
          Start: {project.startDate} | End: {project.endDate}
        </p>
      </div>

      {/* Tasks Section */}
      <div className="bg-white p-6 rounded-xl shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Tasks</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
          >
            {showForm ? "Cancel" : "➕ Add Task"}
          </button>
        </div>

        {showForm && (
          <TaskForm projectId={project.id} onTaskAdded={handleTaskAdded} />
        )}

        <TaskList tasks={tasks} />
      </div>
    </div>
  );
}
