import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Trans, useTranslation  } from "react-i18next";

import api from "../api";
import { isValidEmail } from "../utils/email-validation";

function Login() {
  const { t } = useTranslation(undefined, { keyPrefix: "login" });

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
    emailError = !isValidEmail(email, setEmailErrorMessage);

    if (emailError) {
      emailInput.style.borderColor = "red";
    }

    // password validation
    if (password.length === 0) {
      passwordError = true;
      setPasswordErrorMessage(t('password.error'));
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
    <div class="container py-5">
      <div className="row">
        <div className="col-sm-12 col-md-8 col-lg-6 col-xl-5 mx-auto">
          <div class="card shadow-2-strong" style={{ borderRadius: "1rem" }}>
            <div class="card-body p-5 text-center">
              {alertMessage.length > 0 && (
                <div className="alert alert-danger" role="alert">
                  {alertMessage}
                </div>
              )}
              <h2 class="fw-bold mb-2 text-uppercase">{t("title")}</h2>
              <p class="text-black-50 mb-5">{t("description")}</p>

              <div className="form-group row">
                <input
                  type="email"
                  className="form-control"
                  id="emailInput"
                  name="email"
                  onChange={handleEmailChange}
                  value={email}
                  placeholder={t('email.placeholder')}
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
                  placeholder={t('password.placeholder')}
                />
                <div className="text-danger">{passwordErrorMessage}</div>
              </div>
              <div className="text-center">
                <button
                  className="btn btn-primary btn-lg mt-4 px-5"
                  onClick={handleClick}
                >
                  {t("button")}
                </button>
              </div>
              <p className="mt-5">
                <Trans i18nKey="login.register">
                  <Link to="/signup"
                  className="text-black text-decoration-none fw-bold" />
                </Trans>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
