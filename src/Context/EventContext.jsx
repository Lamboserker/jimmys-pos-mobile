import React, { createContext, useContext, useState } from "react";
import CryptoJS from "crypto-js";

const EventContext = createContext();

export const useEvent = () => useContext(EventContext);

export const EventProvider = ({ children }) => {
  const [encryptedEventType, setEncryptedEventType] = useState("");

  const setEventType = (eventType) => {
    const ciphertext = CryptoJS.AES.encrypt(
      eventType,
      "secret key 123"
    ).toString();
    setEncryptedEventType(ciphertext);
  };

  const getEventType = () => {
    if (!encryptedEventType) return "";
    const bytes = CryptoJS.AES.decrypt(encryptedEventType, "secret key 123");
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
  };

  return (
    <EventContext.Provider value={{ setEventType, getEventType }}>
      {children}
    </EventContext.Provider>
  );
};
