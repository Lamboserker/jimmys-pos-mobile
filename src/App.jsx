import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import EmployeeDashboard from "./components/Dashboard/employeeDashboard";
function App() {
  return (
    <div
      style={{
        backgroundColor: "#fafafa",
        minHeight: "100vh",
        minWidth: "100vw",
      }}
    >
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/employeedashboard" element={<EmployeeDashboard />} />

          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
