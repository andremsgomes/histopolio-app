import React, { useState } from "react";
import { Link } from "react-router-dom";

import api from "../api";

function Signup() {
  const [name, setName] = useState("");
  const [nameErrorMessage, setNameErrorMessage] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [password, setPassword] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [
    confirmPasswordErrorMessage,
    setConfirmPasswordErrorMessage,
  ] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const handleClick = () => {
    let nameError = false;
    let emailError = false;
    let passwordError = false;
    let confirmPasswordError = false;

    setNameErrorMessage("");
    setEmailErrorMessage("");
    setPasswordErrorMessage("");
    setConfirmPasswordErrorMessage("");

    const nameInput = document.getElementById("nameInput");
    nameInput.style.borderColor = "#ced4da";

    const emailInput = document.getElementById("emailInput");
    emailInput.style.borderColor = "#ced4da";

    const passwordInput = document.getElementById("passwordInput");
    passwordInput.style.borderColor = "#ced4da";

    const confirmPasswordInput = document.getElementById(
      "confirmPasswordInput"
    );
    confirmPasswordInput.style.borderColor = "#ced4da";

    // name validation
    if (name.length === 0) {
      nameError = true;
      setNameErrorMessage("Por favor introduz o teu nome.");
    }
    // TODO: verificar tamanho máximo

    if (nameError) {
      nameInput.style.borderColor = "red";
    }

    // avatar validation
    const avatarToSend =
      avatar.length > 0 ? avatar : "https://www.linkpicture.com/q/user_21.png";

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
      setPasswordErrorMessage("Por favor introduz uma password.");
    }

    if (passwordError) {
      passwordInput.style.borderColor = "red";
    }

    // confirm password validation
    if (confirmPassword.length === 0) {
      confirmPasswordError = true;
      setConfirmPasswordErrorMessage("Confirma a tua password.");
    } else if (password !== confirmPassword) {
      confirmPasswordError = true;
      setConfirmPasswordErrorMessage("As passwords não são iguais.");
    }

    if (confirmPasswordError) {
      confirmPasswordInput.style.borderColor = "red";
    }

    if (!(nameError || emailError || passwordError || confirmPasswordError)) {
      const payload = { name, avatarToSend, email, password };

      api
        .signup(payload)
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

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAvatarChange = (e) => {
    setAvatar(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
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
              <h2 class="fw-bold mb-2 text-uppercase">Registar</h2>
              <p class="text-black-50 mb-5">Introduz os teus dados</p>
              <div className="form-group row">
                <input
                  type="text"
                  className="form-control"
                  id="nameInput"
                  name="name"
                  onChange={handleNameChange}
                  value={name}
                  placeholder="Nome"
                />
                <div className="text-danger">{nameErrorMessage}</div>
              </div>
              <div className="form-group row mt-3">
                <input
                  type="text"
                  className="form-control"
                  id="avatarInput"
                  name="avatar"
                  onChange={handleAvatarChange}
                  value={avatar}
                  placeholder="Link do Avatar"
                />
              </div>
              <div className="text-center mt-3">
                {avatar.length > 0 ? (
                  <img
                    src={avatar}
                    alt="Avatar"
                    className="rounded-circle border"
                    style={{
                      objectFit: "cover",
                      width: "250px",
                      height: "250px",
                    }}
                  />
                ) : (
                  <img
                    src="https://www.linkpicture.com/q/user_21.png"
                    alt="Avatar"
                    className="rounded-circle border"
                    style={{
                      objectFit: "cover",
                      width: "250px",
                      height: "250px",
                    }}
                  />
                )}
              </div>
              <div className="form-group row mt-3">
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
              <div className="form-group row mt-3">
                <input
                  type="password"
                  className="form-control"
                  id="confirmPasswordInput"
                  name="confirmPassword"
                  onChange={handleConfirmPasswordChange}
                  value={confirmPassword}
                  placeholder="Confirma a password"
                />
                <div className="text-danger">{confirmPasswordErrorMessage}</div>
              </div>
              <div className="text-center">
                <button
                  className="btn btn-primary btn-lg mt-4 px-5"
                  onClick={handleClick}
                >
                  Criar conta
                </button>
              </div>
              <p className="mt-5">
                Já tens uma conta? Faz o login{" "}
                <Link
                  to="/login"
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
  );
}

export default Signup;
