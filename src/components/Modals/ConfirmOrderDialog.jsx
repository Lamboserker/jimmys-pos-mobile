import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Typography,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

const ConfirmOrderDialog = ({ open, onClose, onConfirm, selectedItem }) => {
  const [quantity, setQuantity] = useState(1);

  // Effekt zum Zurücksetzen der Anzahl, wenn sich das selectedItem ändert
  useEffect(() => {
    setQuantity(1);
  }, [selectedItem]);

  // Funktion, um die Anzahl zu erhöhen
  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  // Funktion, um die Anzahl zu verringern, aber nicht unter 1
  const decreaseQuantity = () => {
    setQuantity((prevQuantity) =>
      prevQuantity > 1 ? prevQuantity - 1 : prevQuantity
    );
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Artikel bestellen</DialogTitle>
      <DialogContent>
        Möchten Sie "{selectedItem?.name}" wirklich bestellen?
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 20,
          }}
        >
          {quantity > 1 && (
            <IconButton onClick={decreaseQuantity}>
              <RemoveCircleOutlineIcon />
            </IconButton>
          )}
          <Typography variant="h6" style={{ margin: "0 10px" }}>
            {quantity}
          </Typography>
          <IconButton onClick={increaseQuantity}>
            <AddCircleOutlineIcon />
          </IconButton>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Abbrechen</Button>
        <Button onClick={() => onConfirm(selectedItem, quantity)}>
          Bestellen
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmOrderDialog;
