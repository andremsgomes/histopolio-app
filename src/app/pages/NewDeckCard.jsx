import React, { useState } from "react";

import api from "../api";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import EditAndLogout from "../components/EditAndLogout";
import DeckCardForm from "../components/DeckCardForm";

function NewDeckCard() {
  const { t } = useTranslation(undefined, { keyPrefix: "new-deck-card" });
  const { board } = useParams();

  const [deck, setDeck] = useState("community");
  const [info, setInfo] = useState("");
  const [points, setPoints] = useState(0);
  const [action, setAction] = useState("none");
  const [actionValue, setActionValue] = useState("");

  const handleActionChange = (e) => {
    setAction(e.target.value);
    setActionValue("");
  };

  const handleClick = () => {
    // TODO: validar tudo

    const payload = {
      boardName: board,
      deck,
      info,
      points: parseInt(points),
      action,
      actionValue,
    };

    api
      .newDeckCard(payload)
      .then(() => {
        window.location.href = `/admin/${board}/deck_cards/${deck}`;
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
            <Link to={`/admin/${board}`} className="text-decoration-none">
              {board}
            </Link>
          </li>
          <li className="breadcrumb-item" aria-current="page">
            <Link to={`/admin/${board}/edit`} className="text-decoration-none">
              {t("breadcrumbs.edit")}
            </Link>
          </li>
          <li className="breadcrumb-item" aria-current="page">
            {t("breadcrumbs.cards")}
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {t("breadcrumbs.new-card")}
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
            <DeckCardForm
              onDeckChange={setDeck}
              deck={deck}
              onInfoChange={setInfo}
              info={info}
              onPointsChange={setPoints}
              points={points}
              onActionChange={handleActionChange}
              action={action}
              onActionValueChange={setActionValue}
              actionValue={actionValue}
              onClick={handleClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewDeckCard;
