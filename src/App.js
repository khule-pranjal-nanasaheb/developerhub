// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import TasksPage from "./pages/TasksPage";        // ✅ Task form page
import ReportsPage from "./pages/ReportsPage"; 
import CommentPage from "./pages/CommentPage";
import FilePage from "./pages/FilePage"; // ✅ Import your FilePage component
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth routes */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Main dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Task form page */}
        <Route path="/tasks" element={<TasksPage />} />

        {/* Reports module page */}
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/comments" element={<CommentPage />} />

        {/* Files page */}
        <Route path="/files" element={<FilePage />} /> {/* ✅ Add this line */}

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
