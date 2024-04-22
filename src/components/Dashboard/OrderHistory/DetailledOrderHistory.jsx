import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  CircularProgress,
  styled,
} from "@mui/material";
import MobileNavBar from "../MobileNavbar";
import TemporaryDrawer from "../../Sidebar/Sidebar";

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  margin: "20px",
  padding: "20px",
  width: "auto",
  maxWidth: "100%",
}));

const StatusSpan = styled("span")(({ theme, status }) => ({
  display: "inline-block",
  borderRadius: "8px",
  padding: "5px 10px",
  color: "white",
  backgroundColor: status ? "green" : "red",
}));

const DetailledOrderHistory = () => {
  const { orderId } = useParams();
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [cartDialogOpen, setCartDialogOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [order, setOrder] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrderDetail = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/sales/${orderId}`, // Verwenden Sie die ID des Sales direkt
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOrder(response.data);
      } catch (error) {
        console.error("Fehler beim Abrufen der Bestelldetails:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetail();
  }, [navigate, orderId]);

  if (!order) {
    setLoadingloading(true);
    return (
      <div className="flex h-screen">
        <div className="m-auto">
          <CircularProgress />
          <p className="text-center mt-4">Lädt...</p>
        </div>
      </div>
    );
  }

  const handleCartDialogOpen = () => {
    setCartDialogOpen(true);
  };

  const orderDetails = [
    { label: "Datum", value: new Date(order.date).toLocaleDateString() },
    {
      label: "Produkt",
      value: order.product ? order.product.name : "Produktname nicht verfügbar",
    },
    { label: "Anzahl", value: order.count },
    {
      label: "Gesamtpreis",
      value: order.amount ? `${order.amount.toFixed(2)} €` : "N/A",
    },
    { label: "Status", value: order.shipped ? "Versendet" : "Warten" },
  ];

  return (
    <StyledTableContainer component={Paper}>
      <Table sx={{ justifyContent: "center", alignItems: "center" }}>
        <TableBody>
          {orderDetails.map((detail) => (
            <TableRow key={detail.label}>
              <TableCell component="th" scope="row">
                {detail.label}
              </TableCell>
              <TableCell>
                <StatusSpan status={detail.label === "Status"}>
                  {detail.value}
                </StatusSpan>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="fixed bottom-0 left-0 w-full">
        <MobileNavBar
          openDrawer={setDrawerOpen}
          openCartDialog={handleCartDialogOpen}
          cartLength={cart.length}
        />

        <TemporaryDrawer
          currentPage={"orderHistory"}
          open={drawerOpen}
          toggleDrawer={(isOpen) => setDrawerOpen(isOpen)}
        />
      </div>
    </StyledTableContainer>
  );
};

export default DetailledOrderHistory;
