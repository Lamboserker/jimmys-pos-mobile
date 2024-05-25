import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import EmployeeDashboard from "./components/Dashboard/employeeDashboard";
import Picker from "./components/Picker/Picker";
import OrderHistory from "./components/Dashboard/OrderHistory/OrderHistory";
import DetailledOrderHistory from "./components/Dashboard/OrderHistory/DetailledOrderHistory";

function App() {
  return (
    <div className="max-h-screen w-full">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/picker" element={<Picker />} />
          <Route path="/employeedashboard" element={<EmployeeDashboard />} />
          <Route path="/order-history" element={<OrderHistory />} />
          <Route
            path="/detailled-order-history/:orderId"
            element={<DetailledOrderHistory />}
          />
          {/* Verkaufshistorie hinzugefügt */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
