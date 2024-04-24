import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { AccountCircle } from "@mui/icons-material";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("employee");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const userData = {
        name,
        password,
        role,
      };

      const response = await axios.post(`${apiUrl}/users/register`, userData);
      if (response.status === 201) {
        navigate("/login", { state: { email: name } }); // Hier könnte statt E-Mail die Bestätigung über Benutzername erfolgen.
      } else {
        throw new Error("Registrierung fehlgeschlagen. Kein Token erhalten.");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Registrierungsfehler.");
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
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white mb-5">
            Registriere dich
          </h2>
          <form className="space-y-6" onSubmit={handleRegister}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-white mb-3"
              >
                Name
              </label>
              <TextField
                sx={{
                  backgroundColor: "white",
                  borderRadius: "0.375rem", // Abgerundete Ecken
                }}
                id="name"
                type="text"
                required
                disabled={loading}
                fullWidth
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                InputProps={{
                  className: "text-black",
                  startAdornment: (
                    <InputAdornment position="start">
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
                sx={{
                  backgroundColor: "white",
                  borderRadius: "0.375rem", // Abgerundete Ecken
                }}
                id="password"
                type={showPassword ? "text" : "password"}
                required
                disabled={loading}
                autoComplete="new-password"
                fullWidth
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  className: "text-black",
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
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-white mb-3"
              >
                Passwort bestätigen
              </label>
              <TextField
                sx={{
                  backgroundColor: "white",
                  borderRadius: "0.375rem", // Abgerundete Ecken
                }}
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                required
                disabled={loading}
                autoComplete="new-password"
                fullWidth
                variant="outlined"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                InputProps={{
                  className: "text-black",
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
                  "Registrieren"
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
            Schon registriert?{" "}
            <Link to="/login" className="text-indigo-600 hover:text-indigo-500">
              Melde dich hier an!
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
