import axios from "axios";
import db from "../Models/db";
import bcrypt from "bcryptjs";

const apiUrl = import.meta.env.VITE_API_URL; // Stelle sicher, dass deine Umgebungsvariablen korrekt konfiguriert sind

// Online Authentifizierung und Speicherung des Nutzer-Tokens und der Credentials in IndexedDB
export const performLogin = async (loginData) => {
  if (navigator.onLine) {
    try {
      const response = await axios.post(`${apiUrl}/users/login`, loginData);
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        await db.users.put({
          username: loginData.email || loginData.name,
          token: response.data.token,
          hashedPassword: bcrypt.hashSync(loginData.password), // Speichere das gehashte Passwort für Offline-Überprüfungen
        });
        return { success: true, token: response.data.token };
      }
      return { success: false, message: "Kein Token erhalten." };
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, message: error.message };
    }
  } else {
    // Offline-Modus: Validiere die Credentials gegen die IndexedDB-Daten
    const user = await db.users
      .where("username")
      .equals(loginData.email || loginData.name)
      .first();
    if (user && bcrypt.compareSync(loginData.password, user.hashedPassword)) {
      return { success: true, token: user.token };
    }
    return { success: false, message: "Keine gültigen lokalen Anmeldedaten." };
  }
};

// Ausloggen und Bereinigen des gespeicherten Tokens
export const performLogout = () => {
  localStorage.removeItem("token");
  // Hier könnte man auch die IndexedDB bereinigen, wenn notwendig
};

// Optional: Überprüfung der Gültigkeit des Tokens
export const checkTokenValidity = async (token) => {
  try {
    const response = await axios.post(`${apiUrl}/token/validate`, { token });
    return response.data.isValid;
  } catch (error) {
    console.error("Token validation error:", error);
    return false;
  }
};
