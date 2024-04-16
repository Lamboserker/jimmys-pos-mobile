import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEvent } from "../../Context/EventContext";

const Picker = () => {
  const navigate = useNavigate();
  const { setEventType } = useEvent();
  const prices = {
    concert: 50,
    wedding: 100,
    conference: 75,
  };

  const handleEventSelection = (event) => {
    const selectedType = event.target.value;
    setEventType(selectedType);
    navigate("/employeedashboard");
  };

  return (
    <div>
      <h1 className="text-black font-bold px-5 py-3">
        Wähle die Art der Veranstaltung:
      </h1>
      <select onChange={handleEventSelection}>
        <option value="">Bitte auswählen</option>
        <option value="bierboerse">Bierbörse</option>
        <option value="schlemmermarkt">Schlemmermarkt</option>
      </select>
    </div>
  );
};

export default Picker;
