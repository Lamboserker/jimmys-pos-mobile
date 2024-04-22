import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Card, CardContent, Typography } from "@mui/material";
import MobileNavBar from "../MobileNavbar";
import TemporaryDrawer from "../../Sidebar/Sidebar";
const OrderHistory = () => {
  const [currentPage, setCurrentPage] = useState("orderHistory");
  const [orders, setOrders] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [cartDialogOpen, setCartDialogOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const decoded = jwtDecode(token);
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/sales/user/${decoded.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOrders(response.data);
      } catch (error) {
        console.error("Fehler beim Abrufen der Bestellhistorie:", error);
      }
    };

    fetchOrders();
  }, [navigate]);

  const handleCardClick = (order) => {
    navigate(`/detailled-order-history/${order._id}`); // Hier könnte eine Detailseite implementiert werden
    {
      /*Übergebe order._id an detailled-order-history-Komponente, um die Details der Bestellung anzuzeigen*/
    }
  };

  const handleCartDialogOpen = () => {
    setCartDialogOpen(true);
  };

  return (
    <div style={{ margin: 20 }}>
      {orders.map((order) => (
        <Card
          key={order._id}
          onClick={() => handleCardClick(order)}
          style={{ marginBottom: 20, cursor: "pointer" }} // Cursor hinzugefügt, um die Klickbarkeit zu signalisieren
        >
          <CardContent>
            <Typography variant="h5" component="div">
              Gesamtpreis: {order.amount ? order.amount.toFixed(2) : "N/A"} €
            </Typography>
            <Typography color="text.secondary">
              Status: {order.shipped ? "Versendet" : "Warten"}
            </Typography>
            <Typography color="text.secondary">
              Uhrzeit: {new Date(order.date).toLocaleTimeString()}
            </Typography>
          </CardContent>
        </Card>
      ))}
      <div className="fixed bottom-0 left-0 w-full">
        <MobileNavBar
          openDrawer={setDrawerOpen}
          openCartDialog={handleCartDialogOpen}
          cartLength={cart.length}
        />

        <TemporaryDrawer
          open={drawerOpen}
          toggleDrawer={setDrawerOpen}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default OrderHistory;
