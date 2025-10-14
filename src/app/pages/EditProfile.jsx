import React, { useState, useEffect } from "react";

import api from "../api";
import EditAndLogout from "../components/EditAndLogout";

import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { isValidEmail } from "../utils/email-validation";

function EditProfile() {
  const [name, setName] = useState("");
  const [nameErrorMessage, setNameErrorMessage] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const { t } = useTranslation(undefined, { keyPrefix: "edit-profile" });

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    setName(user.name);
    setAvatar(user.avatar);
    setEmail(user.email);
  }, []);

  const handleClick = () => {
    let nameError = false;
    let emailError = false;

    setNameErrorMessage("");
    setEmailErrorMessage("");

    const nameInput = document.getElementById("nameInput");
    nameInput.style.borderColor = "#ced4da";

    const emailInput = document.getElementById("emailInput");
    emailInput.style.borderColor = "#ced4da";

    // name validation
    if (name.length === 0) {
      nameError = true;
      setNameErrorMessage(t('error-message.name-validation'));
    }
    // TODO: verificar tamanho máximo

    if (nameError) {
      nameInput.style.borderColor = "red";
    }

    // avatar validation
    const avatarToSend =
      avatar.length > 0 ? avatar : "https://www.linkpicture.com/q/user_21.png";

    // email validation
    emailError = !isValidEmail(email, setEmailErrorMessage);

    if (emailError) {
      emailInput.style.borderColor = "red";
    }

    if (!(nameError || emailError)) {
      const user = JSON.parse(sessionStorage.getItem("user"));
      user.name = name;
      user.avatar = avatarToSend;
      user.email = email;

      sessionStorage.setItem("user", JSON.stringify(user));

      const userId = user.id;

      const payload = { userId, name, avatarToSend, email };

      api
        .updateProfile(payload)
        .then(() => {
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

  return (
    <div>
      <nav
        aria-label="breadcrumb"
        className="navbar navbar-light bg-white px-4"
      >
        <ol className="breadcrumb m-0">
          <li className="breadcrumb-item" aria-current="page">
            <Link to="/admin" className="text-decoration-none">
              {t('breadcrumbs.menu')}
            </Link>
          </li>
          <li className="breadcrumb-item" aria-current="page">
            {t('breadcrumbs.profile')}
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {t('breadcrumbs.edit')}
          </li>
        </ol>
        <div>
          <EditAndLogout />
        </div>
      </nav>
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
                <h2 class="fw-bold mb-2 text-uppercase">{t('title')}</h2>
                <p class="text-black-50 mb-5">{t('subtitle')}</p>
                <div className="text-start fw-bold">
                  <label for="name" className="form-label">
                    {t('form.name.label')}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="nameInput"
                    name="name"
                    onChange={handleNameChange}
                    value={name}
                    placeholder={t('form.name.placeholder')}
                  />
                  <div className="text-danger">{nameErrorMessage}</div>
                </div>
                <div className="text-start fw-bold mt-3">
                  <label for="avatar" className="form-label">
                    {t('form.avatar-link.label')}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="avatarInput"
                    name="avatar"
                    onChange={handleAvatarChange}
                    value={avatar}
                    placeholder={t('form.avatar-link.placeholder')}
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
                <div className="text-start fw-bold mt-3">
                  <label for="email" className="form-label">
                    {t('form.email.label')}
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="emailInput"
                    name="email"
                    onChange={handleEmailChange}
                    value={email}
                    placeholder={t('form.email.placeholder')}
                  />
                  <div className="text-danger">{emailErrorMessage}</div>
                </div>
                <div className="text-center">
                  <button
                    className="btn btn-lg btn-outline-success mt-3"
                    onClick={handleClick}
                  >
                    {t('form.save-button')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
