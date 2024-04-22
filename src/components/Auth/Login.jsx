import React, { useState, useEffect } from "react";
import { performLogin, performLogout } from "../../services/authServices";
import { Link, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import { AccountCircle } from "@mui/icons-material";

const Login = () => {
  const [userInput, setUserInput] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleNetworkChange = () => {
      if (!navigator.onLine) {
        setError(
          "Sie sind derzeit offline und können im eingeschränkten Modus arbeiten."
        );
        setOpen(true);
      }
    };

    window.addEventListener("online", handleNetworkChange);
    window.addEventListener("offline", handleNetworkChange);

    return () => {
      window.removeEventListener("online", handleNetworkChange);
      window.removeEventListener("offline", handleNetworkChange);
    };
  }, []);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  // Funktion zum Umschalten der Passwort-Sichtbarkeit
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);

    const loginData = userInput.includes("@")
      ? { email: userInput, password }
      : { name: userInput, password };

    const result = await performLogin(loginData);

    if (result.success) {
      navigate("/picker");
    } else {
      setError(result.message);
      setOpen(true);
    }
    setLoading(false);
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
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white mb-5">
            Melde dich an
          </h2>
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label
                htmlFor="userInput"
                className="block text-sm font-medium text-white mb-3"
              >
                Benutzername oder E-Mail
              </label>
              <TextField
                id="userInput"
                type="text"
                required
                disabled={loading}
                autoComplete={userInput.includes("@") ? "email" : "username"}
                fullWidth
                variant="outlined"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                InputProps={{
                  className: "text-black", // Schriftfarbe schwarz
                  style: { backgroundColor: "white" }, // Hintergrundfarbe weiß
                  startAdornment: (
                    <InputAdornment position="end">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white mb-3"
              >
                Passwort
              </label>
              <TextField
                id="password"
                type={showPassword ? "text" : "password"}
                required
                disabled={loading}
                autoComplete="current-password"
                fullWidth
                variant="outlined"
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  className: "text-black", // Schriftfarbe schwarz
                  style: { backgroundColor: "white" }, // Hintergrundfarbe weiß
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={togglePasswordVisibility}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
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
