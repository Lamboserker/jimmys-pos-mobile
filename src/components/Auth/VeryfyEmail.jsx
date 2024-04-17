import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import axios from "axios";

const VerifyEmail = () => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state || {};

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleVerify = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${apiUrl}/users/verify-email`, {
        email,
        code,
      });
      setTimeout(() => {
        setLoading(false);
        if (response.data.message === "E-Mail erfolgreich verifiziert.") {
          setSuccessMessage("Verifikation Erfolgreich!");
          setOpen(true);
          setTimeout(() => navigate("/picker"), 2000); // Verzögerung der Weiterleitung
        } else {
          throw new Error("Unbekannter Fehler bei der Code-Verifikation.");
        }
      }, 2000); // 2 Sekunden künstliche Verzögerung
    } catch (error) {
      setLoading(false);
      setError(error.response?.data?.message || "Verifikationsfehler.");
      setOpen(true);
    }
  };

  return (
    <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-gray-800">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          Gib deinen Bestätigungscode ein
        </h2>
        <form className="mt-8 space-y-6" onSubmit={handleVerify}>
          <input
            type="text"
            required
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Bestätigungscode"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />

          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Bestätigen"
            )}
          </button>
        </form>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            {successMessage || error}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};

export default VerifyEmail;
