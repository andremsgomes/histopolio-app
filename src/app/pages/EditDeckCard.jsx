import React, { useEffect, useState } from "react";

import api from "../api";
import { Link, useParams } from "react-router-dom";

import EditAndLogout from "../components/EditAndLogout";
import DeckCardForm from "../components/DeckCardForm";
import { useTranslation } from "react-i18next";

function EditDeckCard() {
  const { t } = useTranslation(undefined, { keyPrefix: "edit-deck-card" });
  const { board, id } = useParams();

  const [deck, setDeck] = useState("community");
  const [info, setInfo] = useState("");
  const [points, setPoints] = useState(0);
  const [action, setAction] = useState("none");
  const [actionValue, setActionValue] = useState("");

  useEffect(() => {
    api
      .card(id)
      .then((res) => {
        setDeck(res.data.subtype);
        setInfo(res.data.info);
        setPoints(res.data.points);
        setAction(res.data.action);
        setActionValue(res.data.actionValue);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleActionChange = (e) => {
    setAction(e.target.value);
    setActionValue("");
  };

  const handleClick = () => {
    // TODO: validar tudo

    const payload = {
      id,
      deck,
      info,
      points: parseInt(points),
      action,
      actionValue,
    };

    api
      .updateDeckCard(payload)
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
            {t("breadcrumbs.edit-card")}
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

export default EditDeckCard;
