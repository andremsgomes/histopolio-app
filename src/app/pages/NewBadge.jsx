import React, { useState } from "react";

import api from "../api";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import EditAndLogout from "../components/EditAndLogout";
import BadgeForm from "../components/BadgeForm";

function NewBadge() {
  const { t } = useTranslation(undefined, { keyPrefix: "new-badge" });
  const { board } = useParams();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [multiplier, setMultiplier] = useState(1);
  const [cost, setCost] = useState(0);

  const handleClick = () => {
    // TODO: validar tudo

    // image validation
    const finalImage =
      image.length > 0 ? image : "https://www.linkpicture.com/q/badge_9.png";

    const payload = {
      boardName: board,
      name,
      image: finalImage,
      multiplier,
      cost,
    };

    api
      .newBadge(payload)
      .then(() => {
        window.location.href = `/admin/${board}/edit`;
      })
      .catch((error) => {
        console.log(error.message);
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
          <li className="breadcrumb-item" aria-current="page">
            <Link
              to={`/admin/${board}`}
              className="text-decoration-none"
            >
              {board}
            </Link>
          </li>
          <li className="breadcrumb-item" aria-current="page">
            <Link
              to={`/admin/${board}/edit`}
              className="text-decoration-none"
            >
              {t("breadcrumbs.edit")}
            </Link>
          </li>
          <li className="breadcrumb-item" aria-current="page">
            {t("breadcrumbs.badges")}
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {t("breadcrumbs.new-badge")}
          </li>
        </ol>
        <div>
          <EditAndLogout />
        </div>
      </nav>
      <div className="text-center mt-5">
        <h1>{board}</h1>
        <div className="card my-5 mx-md-5 py-2 px-0">
          <div className="card-body px-0">
            <h3 className="card-title">{t("title")}</h3>
            <BadgeForm
              onNameChange={setName}
              name={name}
              onImageChange={setImage}
              image={image}
              onMultiplierChange={setMultiplier}
              multiplier={multiplier}
              onCostChange={setCost}
              cost={cost}
              onClick={handleClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewBadge;
