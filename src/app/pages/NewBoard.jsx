import React, { useState } from "react";

import api from "../api";
import EditAndLogout from "../components/EditAndLogout";
import BoardForm from "../components/BoardForm";

import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function NewBoard() {
  const { t } = useTranslation(undefined, { keyPrefix: "new-board" });

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const handleClick = () => {
    const user = JSON.parse(sessionStorage.getItem("user"));

    const payload = {
      userId: user.id,
      name,
      description,
      image,
    };

    api
      .newBoard(payload)
      .then(() => {
        window.location.href = "/admin";
      })
      .catch((error) => {
        console.log(error);
      });
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
              {t("breadcrumbs.menu")}
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {t("breadcrumbs.new-game-board")}
          </li>
        </ol>
        <div>
          <EditAndLogout />
        </div>
      </nav>
      <div className="text-center mt-5">
        <BoardForm
          title={t("board-form.title")}
          onNameChange={setName}
          name={name}
          onDescriptionChange={setDescription}
          description={description}
          onImageChange={setImage}
          image={image}
          onClick={handleClick}
          buttonText={t("board-form.button")}
        />
      </div>
    </div>
  );
}

export default NewBoard;
