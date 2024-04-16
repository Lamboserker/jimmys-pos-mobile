import React, { useState } from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import TemporaryDrawer from "../Sidebar/Sidebar";
export default function MobileNavBar({ openDrawer, openCartDialog }) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === 0) {
      openDrawer(true); // Öffne den TemporaryDrawer
    } else if (newValue === 1) {
      openCartDialog(true); // Öffne den Warenkorb-Dialog
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
        <BottomNavigationAction label="Menu" icon={<TemporaryDrawer />} />
        <BottomNavigationAction label="Warenkorb" icon={<ShoppingCartIcon />} />
      </BottomNavigation>
    </Box>
  );
}
