import React, { useState } from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import TemporaryDrawer from "../Sidebar/Sidebar";

export default function MobileNavBar({
  openDrawer, // Stellen Sie sicher, dass diese Funktion den Drawer steuert
  openCartDialog,
  cartLength,
}) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === 0) {
      openDrawer(true); // Öffnet den Drawer, wenn auf das Menu-Icon geklickt wird
    } else if (newValue === 1) {
      openCartDialog(true);
    }
  };

  return (
    <Box sx={{ width: "100%", zIndex: 50, position: "fixed", bottom: 0 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={handleChange}
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <BottomNavigationAction
          label="Menu"
          icon={<MenuIcon />}
          onClick={() => openDrawer(true)} 
        />
        <BottomNavigationAction
          label="Warenkorb"
          icon={
            <Badge badgeContent={cartLength} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          }
          onClick={() => openCartDialog(true)} // Nutze hier die übergebene Funktion `openCartDialog`
        />
      </BottomNavigation>
    </Box>
  );
}
