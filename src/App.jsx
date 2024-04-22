import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import EmployeeDashboard from "./components/Dashboard/employeeDashboard";
import Picker from "./components/Picker/Picker";
import VerifyEmail from "./components/Auth/VeryfyEmail";

function App() {
  return (
    <div className="max-h-screen w-full">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/picker" element={<Picker />} />
          <Route path="/employeedashboard" element={<EmployeeDashboard />} />
          {/* Verkaufshistorie hinzugefügt */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
