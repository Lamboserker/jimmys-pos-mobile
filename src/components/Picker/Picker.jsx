import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEvent } from "../../Context/EventContext";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
} from "@mui/material";

const Picker = () => {
  const navigate = useNavigate();
  const { setEventType } = useEvent();
  const [selectedType, setSelectedType] = useState("");

  const handleEventSelection = (event) => {
    const type = event.target.value;
    setSelectedType(type); // Speichere den ausgewählten Typ im lokalen State
    setEventType(type); // Update den Context, falls benötigt
  };

  const handleNavigate = () => {
    if (selectedType) {
      // Stelle sicher, dass ein Typ ausgewählt wurde
      navigate("/employeedashboard");
    } else {
      alert("Bitte wähle einen Veranstaltungstyp aus.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4  bg-gray-800">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-12 w-auto"
          src="https://static.wixstatic.com/media/46be4a_6c3f161a74e24760a2be8db1349380ee~mv2.png/v1/fill/w_159,h_159,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/logo_startseite-1.png"
          alt="Jimmys mobile Cocktailbar"
        />
      </div>
      <h1 className="mb-8 text-lg font-bold text-white">
        Wähle die Art der Veranstaltung:
      </h1>
      <FormControl variant="filled" color="info" className="w-full max-w-xs">
        <InputLabel id="event-type-label">Veranstaltungstyp</InputLabel>
        <Select
          labelId="event-type-label"
          label="Veranstaltungstyp"
          value={selectedType}
          onChange={handleEventSelection}
          className="bg-white text-gray-800"
          sx={{color: "white"}}
        >
          <MenuItem value="">
            <em>Bitte auswählen</em>
          </MenuItem>
          <MenuItem value="bierboerse">Bierbörse</MenuItem>
          <MenuItem value="schlemmermarkt">Schlemmermarkt</MenuItem>
        </Select>
      </FormControl>
      <Button
        variant="contained"
        color="primary"
        onClick={handleNavigate}
        style={{ marginTop: 15 }}
      >
        Weiter
      </Button>
    </div>
  );
};

export default Picker;
