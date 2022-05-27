import React, { useState } from "react";
import { Link } from "react-router-dom";

import api from "../api";

function Login() {
  const [email, setEmail] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [password, setPassword] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const handleClick = () => {
    let emailError = false;
    let passwordError = false;

    setEmailErrorMessage("");
    setPasswordErrorMessage("");

    const emailInput = document.getElementById("emailInput");
    emailInput.style.borderColor = "#ced4da";

    const passwordInput = document.getElementById("passwordInput");
    passwordInput.style.borderColor = "#ced4da";

    // email validation
    if (email.length === 0) {
      emailError = true;
      setEmailErrorMessage("Por favor introduz um email válido.");
    } else if (!(/\w*@up.pt/.test(email) || /\w*@edu.\w.up.pt/.test(email))) {
      emailError = true;
      setEmailErrorMessage(
        "Por favor introduz um email válido (formato: utilizador@up.pt ou utilizador@edu.instituição.up.pt)."
      );
    }

    if (emailError) {
      emailInput.style.borderColor = "red";
    }

    // password validation
    if (password.length === 0) {
      passwordError = true;
      setPasswordErrorMessage("Por favor introduz a tua password.");
    }

    if (passwordError) {
      passwordInput.style.borderColor = "red";
    }

    if (!(emailError || passwordError)) {
      const payload = { email, password };

      api
        .login(payload)
        .then((res) => {
          sessionStorage.setItem("user", JSON.stringify(res.data));
          window.location.href = "/";
        })
        .catch((error) => {
          if (error.response?.data?.message)
            setAlertMessage(error.response.data.message);
          else setAlertMessage(error.message);
        });
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div class="vh-100 gradient-custom">
      <div class="container py-5 h-100">
        <div className="row">
          <div className="col-sm-12 col-md-8 col-lg-6 col-xl-5 mx-auto">
            <div class="card shadow-2-strong" style={{ borderRadius: "1rem" }}>
              <div class="card-body p-5 text-center">
                {alertMessage.length > 0 && (
                  <div className="alert alert-danger" role="alert">
                    {alertMessage}
                  </div>
                )}
                <h2 class="fw-bold mb-2 text-uppercase">Login</h2>
                <p class="text-black-50 mb-5">
                  Introduz o teu email e password
                </p>

                <div className="form-group row">
                  <input
                    type="email"
                    className="form-control"
                    id="emailInput"
                    name="email"
                    onChange={handleEmailChange}
                    value={email}
                    placeholder="Email"
                  />
                  <div className="text-danger">{emailErrorMessage}</div>
                </div>
                <div className="form-group row mt-3">
                  <input
                    type="password"
                    className="form-control"
                    id="passwordInput"
                    name="password"
                    onChange={handlePasswordChange}
                    value={password}
                    placeholder="Password"
                  />
                  <div className="text-danger">{passwordErrorMessage}</div>
                </div>
                <div className="text-center">
                  <button
                    className="btn btn-primary btn-lg mt-4 px-5"
                    onClick={handleClick}
                  >
                    Login
                  </button>
                </div>
                <p className="mt-5">
                  Não tens uma conta? Regista-te{" "}
                  <Link
                    to="/signup"
                    className="text-black text-decoration-none fw-bold"
                  >
                    aqui
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
