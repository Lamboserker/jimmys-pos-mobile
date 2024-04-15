import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import TemporaryDrawer from "../Sidebar/Sidebar";
//icon imports
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import MenuIcon from "@mui/icons-material/Menu";

import ConfirmOrderDialog from "../Modals/ConfirmOrderDialog";
import BasicTabs from "../Navigation/Tabs";

const EmployeeDashboard = () => {
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartDialogOpen, setCartDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedTab, setSelectedTab] = useState(0);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [selectedLetter, setSelectedLetter] = useState("");
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  const navigate = useNavigate();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  // Stil für die Karten
  const cardStyle = {
    margin: "8px",
    width: "80%",
    height: "100px",
    backgroundColor: "#7c73e6",
    color: "black",
    textShadow: "0 0 2px rgba(0,0,0,0.5)",
    fontWeight: "bold",
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
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/import TemporaryDrawer from './Sidebar';
admin/sales?product=${selectedProduct}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
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
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (cartItem) => cartItem._id === item._id
      );
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem._id === item._id
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity }];
      }
    });
  };

  const handleSendOrder = async () => {
    try {
      // Hier die Logik zum Senden der Bestellung zum Backend
      // Zum Beispiel: await axios.post('URL_DEINES_BACKENDS', { items: cart });
      console.log("Bestellung gesendet:", cart);
      setCart([]); // Einkaufswagen leeren
      setCartDialogOpen(false); // Dialog schließen
    } catch (error) {
      console.error("Fehler beim Senden der Bestellung:", error);
    }
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsConfirmDialogOpen(true);
  };

  const handleOrderConfirm = () => {
    setIsConfirmDialogOpen(false);
    handleAddToCart(selectedItem);
    handleSnackbarOpen(
      `${selectedItem.name} wurde zum Einkaufswagen hinzugefügt.`
    );
  };

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
      const existingItem = prevCart.find(
        (item) => item._id === itemToRemove._id
      );

      if (existingItem && existingItem.quantity > 1) {
        // Verringert die Menge, wenn mehr als ein Artikel vorhanden ist
        return prevCart.map((item) =>
          item._id === itemToRemove._id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      } else {
        // Entfernt den Artikel, wenn die Menge 1 oder weniger ist
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

  const handleLetterSelection = (letter) => {
    setSelectedLetter(letter);
  };

  const filteredByLetterItems = selectedLetter
    ? items.filter((item) => item.name.startsWith(selectedLetter))
    : items;

  const AlphabetSidebar = () => (
    <div
      style={{
        position: "fixed", // Fixierte Positionierung
        right: "0", // Rechter Rand des Bildschirms
        top: "20%", // Startet etwas von oben, um nicht ganz oben am Bildschirmrand zu kleben
        display: "flex", // Flexbox für die Anordnung
        flexDirection: "column", // Elemente vertikal anordnen
        alignItems: "center", // Zentriert die Inhalte
        gap: "8px", // Abstand zwischen den Buchstaben
        zIndex: 1, // Oberste Schicht, über dem Inhalt
      }}
    >
      {alphabet.map((letter) => (
        <Button
          key={letter}
          onClick={() => handleLetterSelection(letter)}
          style={{
            minWidth: "30px", // Minimale Breite jedes Buchstaben-Buttons
            padding: "5px", // Polsterung für die Buttons
            fontSize: "12px", // Schriftgröße anpassen
          }}
        >
          {letter}
        </Button>
      ))}
    </div>
  );

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.quantity * item.price, 0);
  };



  return (
    <>
      <div className="w-full h-ful">
        <div className="fixed top-0 left-0 right-0  bg-black z-20 p-3 flex justify-between">
          <BasicTabs handleTypeSelection={handleTypeSelection} />
          <div style={{ position: "absolute", top: "20px", right: 0 }}>
            <Badge
              badgeContent={cart.length}
              color="primary"
              style={{ position: "absolute", top: 0, right: "30px" }}
            ></Badge>
            <ShoppingCartIcon
              onClick={() => setCartDialogOpen(true)}
              style={{
                cursor: "pointer",
                position: "absolute",
                top: 10,
                right: 20,
              }}
            />
          </div>
        </div>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>

        {filteredItems.length > 5 && <AlphabetSidebar />}

        <div className="flex flex-wrap justify-center items-center mt-36">
          {filteredItems.map((item) => (
            <Button
              key={item._id}
              variant="outlined"
              color="primary"
              onClick={() => handleItemClick(item)}
              style={cardStyle} // Anwendung des Stils
            >
              {item.name}
            </Button>
          ))}
        </div>
        {console.log("selectedItem:", selectedItem)}
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
                    {/* Minus Icon */}
                    <IconButton
                      edge="end"
                      aria-label="reduce"
                      onClick={() => handleRemoveFromCart(item)}
                    >
                      <RemoveIcon />
                    </IconButton>
                    {/* Plus Icon */}
                    <IconButton
                      edge="end"
                      aria-label="increase"
                      onClick={() => handleAddToCart(item)}
                    >
                      <AddIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                }
              >
                <ListItemText
                  primary={item.name}
                  secondary={`Menge: ${item.quantity}, Gesamtpreis: ${
                    item.quantity * item.price
                  } €`}
                  primaryTypographyProps={{ variant: "h6" }} // Größerer Text
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
    </>
  );
};

export default EmployeeDashboard;
