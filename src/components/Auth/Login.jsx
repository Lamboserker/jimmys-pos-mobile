import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [userInput, setUserInput] = useState("");
  const [password, setPassword] = useState("");
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const loginData = {
        password,
        ...(userInput.includes("@")
          ? { email: userInput }
          : { name: userInput }),
      };

      const response = await axios.post(`${apiUrl}/users/login`, loginData);
      localStorage.setItem("token", response.data.token);

      // Überprüfen, ob ein Token vorhanden ist, um den erfolgreichen Login anzuzeigen
      if (response.data.token) {
        // Falls erfolgreich eingeloggt, prüfen Sie nicht den Benutzerstatus
        navigate("/employeedashboard"); // Annahme: Weiterleitung nach erfolgreicher Anmeldung
      } else {
        console.error("Kein Token erhalten. Login fehlgeschlagen.");
      }
    } catch (error) {
      console.error(
        "Login fehlgeschlagen:",
        error.response?.data?.message || error.message
      );
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
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm text-start font-medium leading-6 text-white"
              >
                Benutzername oder E-Mail
              </label>
              <div className="mt-2">
                <input
                  id="userInput"
                  name="userInput"
                  type="text" // Typ geändert zu 'text', um beides zu akzeptieren
                  autoComplete="username"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Passwort
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Passwort vergessen?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Anmelden
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Noch nicht registriert?{" "}
            <Link
              to="/register"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
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
