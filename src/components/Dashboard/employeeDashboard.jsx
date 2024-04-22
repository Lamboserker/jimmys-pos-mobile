import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useEvent } from "../../Context/EventContext";
import axios from "axios";
import {
  Button,
  Badge,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  IconButton,
  ListItemSecondaryAction,
  useMediaQuery,
  useTheme,
  Snackbar,
  Alert,
} from "@mui/material";
import { jwtDecode } from "jwt-decode";
import MobileNavBar from "./MobileNavbar";
//icon imports
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import MenuIcon from "@mui/icons-material/Menu";
import ConfirmOrderDialog from "../Modals/ConfirmOrderDialog";
import BasicTabs from "../Navigation/Tabs";
import TemporaryDrawer from "../Sidebar/Sidebar";
const EmployeeDashboard = () => {
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedTab, setSelectedTab] = useState(0);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [selectedLetter, setSelectedLetter] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [cartDialogOpen, setCartDialogOpen] = useState(false);
  const { getEventType } = useEvent();
  const eventType = getEventType(); // Liefert den entschlüsselten Event-Typ

  const navigate = useNavigate();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  // Stil für die Karten
  const cardStyle = {
    margin: "8px",
    width: "calc(100% - 16px)", // Passt die Breite an den Bildschirm an
    height: "120px", // Höher für bessere Sichtbarkeit
    backgroundColor: "#7c73e6",
    color: "white",
    fontSize: "16px", // Größere Schrift für bessere Lesbarkeit
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: "10px", // Abgerundete Ecken für ein moderneres Aussehen
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)", // Schatten für Tiefe
  };

  const categories = [
    "Alkoholische Getränke",
    "Alkoholfreie Getränke",
    "Rest",
    "Pfand",
  ];

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/items`
        );
        const data = response.data;

        const filteredData = selectedType
          ? data.filter((item) => item.type === selectedType)
          : data;
        setItems(filteredData);
      } catch (error) {
        console.error("Fehler beim Abrufen der Items:", error);
      }
      console.log("selectedType hat sich geändert", selectedType);
    };

    fetchItems();
  }, [selectedType]);

  useEffect(() => {
    console.log("selectedProduct hat sich geändert:", selectedProduct);
    const fetchSales = async () => {
      if (!selectedProduct) return;

      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found");
          setSnackbarMessage("Anmeldung erforderlich.");
          setSnackbarOpen(true);
          navigate("/login");
          return; // Early exit if no token
        }

        // Decode the token to get the user ID
        const decoded = jwtDecode(token);
        const userId = decoded.id; // Make sure your token includes the user ID as 'id'

        const response = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/import TemporaryDrawer from './Sidebar';
admin/sales?product=${selectedProduct}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = response.data;
        const processedData = data.map((sale) => ({
          employee: sale.user ? sale.user.name : "Unbekannter Mitarbeiter",
          date: new Date(sale.date).toLocaleString(),
          count: sale.count,
          amount: sale.amount,
        }));
        setSalesData(processedData);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          navigate("/login");
        } else {
          console.error("Ein anderer Fehler ist aufgetreten:", error);
        }
      }
    };

    fetchSales();
  }, [selectedProduct, navigate]);

  const handleAddToCart = (item, quantity = 1) => {
    const isPfandItem = item.type === "Pfand";
    let itemPrice = eventType === "schlemmermarkt" ? item.price2 : item.price;

    // Pfand nur für Nicht-Pfand-Artikel hinzufügen
    let finalPrice = isPfandItem ? itemPrice : itemPrice + 3;

    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (cartItem) => cartItem._id === item._id
      );

      if (existingItemIndex !== -1) {
        // Wenn der Artikel bereits im Warenkorb ist, aktualisiere nur die Menge und den Preis
        return prevCart.map((cartItem, index) =>
          index === existingItemIndex
            ? {
                ...cartItem,
                quantity: cartItem.quantity + quantity,
                price: finalPrice, // Aktualisiere den Preis nur, wenn nötig
              }
            : cartItem
        );
      } else {
        // Füge neuen Artikel mit dem angepassten Preis hinzu
        return [...prevCart, { ...item, quantity, price: finalPrice }];
      }
    });
  };

  const handleSendOrder = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      setSnackbarMessage("Anmeldung erforderlich.");
      setSnackbarOpen(true);
      navigate("/login");
      return; // Early exit if no token
    }

    try {
      const salePromises = cart.map((item) => {
        const saleData = {
          userId: jwtDecode(token).id,
          productId: item._id,
          count: item.quantity,
          amount: item.quantity * item.price, // Berechnung des Gesamtbetrags
        };

        return axios.post(`${import.meta.env.VITE_API_URL}/sales`, saleData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      });

      const saleResponses = await Promise.all(salePromises);
      console.log("Bestellung gesendet:", saleResponses);
      setCart([]); // Clear the cart
      setCartDialogOpen(false); // Close the dialog
      setSnackbarMessage("Bestellung erfolgreich gesendet.");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Fehler beim Senden der Bestellung:", error);
      setSnackbarMessage("Fehler beim Senden der Bestellung.");
      setSnackbarOpen(true);
      if (error.response && error.response.status === 401) {
        navigate("/login");
      }
    }
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsConfirmDialogOpen(true);
  };

  const handleOrderConfirm = (item, quantity) => {
    setIsConfirmDialogOpen(false);
    handleAddToCart(item, quantity);

    // Bereite eine spezifische Nachricht für Pfand-Items vor
    if (item.type === "Pfand") {
      handleSnackbarOpen(`3€ wurden aufgrund von Pfand gutgeschrieben.`);
    } else {
      // Für alle anderen Item-Typen
      handleSnackbarOpen(
        `${item.name} wurde mit der Menge ${quantity} zum Einkaufswagen hinzugefügt.`
      );
    }
  };

  // Verwenden im JSX-Teil deiner Komponente
  {
    selectedItem && (
      <ConfirmOrderDialog
        open={isConfirmDialogOpen}
        onClose={() => setIsConfirmDialogOpen(false)}
        onConfirm={handleOrderConfirm} // onConfirm erwartet nun zwei Parameter: item und quantity
        selectedItem={selectedItem}
      />
    );
  }

  // Filtere die Items basierend auf der ausgewählten Kategorie
  const filteredItems = items.filter((item) =>
    selectedTab === 0 ? true : item.type === categories[selectedTab]
  );

  const handleTypeSelection = (type) => {
    setSelectedType(type);
    setSelectedLetter(""); // Zurücksetzen des ausgewählten Buchstabens
  };

  const handleRemoveFromCart = (itemToRemove) => {
    setCart((prevCart) => {
      const itemIndex = prevCart.findIndex(
        (item) => item._id === itemToRemove._id
      );

      if (itemIndex !== -1 && prevCart[itemIndex].quantity > 1) {
        // Wenn die Menge größer als 1 ist, verringere sie
        return prevCart.map((item, index) =>
          index === itemIndex ? { ...item, quantity: item.quantity - 1 } : item
        );
      } else {
        // Wenn die Menge 1 oder weniger ist, entferne den Artikel
        return prevCart.filter((item) => item._id !== itemToRemove._id);
      }
    });
  };

  const handleSnackbarOpen = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const calculateTotalPrice = () => {
    return cart
      .reduce((total, item) => total + item.quantity * item.price, 0)
      .toFixed(2);
  };

  const handleCartDialogOpen = () => {
    setCartDialogOpen(true);
  };

  return (
    <>
      <div className="w-full h-ful">
        <div className="fixed top-0 left-0 right-0  z-20 p-3 flex justify-between bg-white">
          <BasicTabs handleTypeSelection={handleTypeSelection} />
          <div style={{ position: "absolute", top: "20px", right: 0 }}></div>
        </div>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          sx={{
            width: "100%",
            position: "fixed",
            bottom: 70, // Passt den Abstand vom unteren Bildschirmrand an
            zIndex: 120, // Stellen Sie sicher, dass dieser Wert über dem von MobileNavBar liegt
          }}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
        <div className="flex flex-wrap justify-center items-center mt-36 mb-3">
          {items.map((item) => (
            <Button
              key={item._id}
              variant="outlined"
              onClick={() => handleItemClick(item)}
              style={cardStyle}
            >
              <div>
                <div>{item.name}</div>
                <div style={{ fontSize: "14px", color: "#BDBDBD" }}>
                  Preis:{" "}
                  {eventType === "schlemmermarkt" ? item.price2 : item.price} €
                </div>
              </div>
              <i edge="end" aria-label="add">
                <ShoppingCartIcon />
              </i>
            </Button>
          ))}
        </div>
        {selectedItem && (
          <ConfirmOrderDialog
            open={isConfirmDialogOpen}
            onClose={() => setIsConfirmDialogOpen(false)}
            onConfirm={handleOrderConfirm}
            selectedItem={selectedItem}
          />
        )}
      </div>
      <Dialog
        open={cartDialogOpen}
        onClose={() => setCartDialogOpen(false)}
        maxWidth="xl"
        fullWidth={true}
        fullScreen={fullScreen}
      >
        <DialogTitle>Einkaufswagen</DialogTitle>
        <DialogContent>
          <List dense={false}>
            {cart.map((item) => (
              <ListItem
                key={item._id}
                secondaryAction={
                  <ListItemSecondaryAction
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <IconButton
                      edge="end"
                      aria-label="reduce"
                      onClick={() => handleRemoveFromCart(item)}
                    >
                      <RemoveIcon />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="increase"
                      onClick={() => handleAddToCart(item, 1)}
                    >
                      <AddIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                }
              >
                <ListItemText
                  primary={item.name}
                  secondary={`Menge: ${item.quantity}, Gesamtpreis: ${(
                    item.quantity * item.price
                  ).toFixed(2)} € (inkl. Pfand)`}
                  primaryTypographyProps={{ variant: "h6" }}
                />
              </ListItem>
            ))}
          </List>

          <div
            style={{
              color: "red",
              marginTop: "20px",
              fontSize: "20px",
              textAlign: "left",
            }}
          >
            Gesamtpreis: {calculateTotalPrice()} €
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCartDialogOpen(false)}>Schließen</Button>
          <Button onClick={handleSendOrder} variant="contained" color="primary">
            Senden
          </Button>
        </DialogActions>
      </Dialog>
      <MobileNavBar
        openDrawer={setDrawerOpen}
        openCartDialog={handleCartDialogOpen}
        cartLength={cart.length}
      />

      <TemporaryDrawer
        open={drawerOpen}
        toggleDrawer={(isOpen) => setDrawerOpen(isOpen)}
      />
    </>
  );
};

export default EmployeeDashboard;
