import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

const Login = () => {
  const [userInput, setUserInput] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const loginData = userInput.includes("@")
        ? { email: userInput, password } // Wenn die Eingabe ein "@" enthält, behandele es als E-Mail
        : { name: userInput, password }; // Andernfalls behandele es als Benutzername

      const response = await axios.post(`${apiUrl}/users/login`, loginData);
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        navigate("/picker");
      } else {
        throw new Error("Login fehlgeschlagen. Kein Token erhalten.");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Anmeldefehler.");
      setOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-gray-800">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-12 w-auto"
            src="https://static.wixstatic.com/media/46be4a_6c3f161a74e24760a2be8db1349380ee~mv2.png/v1/fill/w_159,h_159,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/logo_startseite-1.png"
            alt="Jimmys mobile Cocktailbar"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Melde dich an
          </h2>
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label
                htmlFor="userInput"
                className="block text-sm font-medium text-white"
              >
                Benutzername oder E-Mail
              </label>
              <input
                id="userInput"
                type="text"
                required
                disabled={loading}
                autoComplete={userInput.includes("@") ? "email" : "username"}
                className="text-black appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white"
              >
                Passwort
              </label>
              <input
                id="password"
                type="password"
                required
                disabled={loading}
                autoComplete="current-password"
                className="text-black appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Anmelden"
                )}
              </button>
            </div>
          </form>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="error"
              sx={{ width: "100%" }}
            >
              {error}
            </Alert>
          </Snackbar>
          <p className="mt-4 text-center text-sm text-gray-500">
            Noch nicht registriert?{" "}
            <Link
              to="/register"
              className="text-indigo-600 hover:text-indigo-500"
            >
              Registriere dich hier!
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
