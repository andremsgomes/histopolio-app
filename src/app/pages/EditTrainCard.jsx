import React, { useState, useEffect } from "react";

import api from "../api";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import EditAndLogout from "../components/EditAndLogout";
import TrainCardForm from "../components/TrainCardForm";

function NewTrainCard() {
  const { t } = useTranslation(undefined, { keyPrefix: "edit-train-card" });
  const { id, board, tile } = useParams();

  const [info, setInfo] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    api
      .card(id)
      .then((res) => {
        setInfo(res.data.info);
        setContent(res.data.content);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleClick = () => {
    // TODO: validar tudo

    const payload = { id, info, content };

    api
      .updateTrainCard(payload)
      .then(() => {
        window.location.href = `/admin/${board}/${tile}/train_cards`;
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
            {t("breadcrumbs.tile", { tile: tile })}
          </li>
          <li className="breadcrumb-item" aria-current="page">
            <Link
              to={`/admin/${board}/${tile}/train_cards`}
              className="text-decoration-none"
            >
              {t("breadcrumbs.train-cards")}
            </Link>
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
        <h1>
          {t("title", {
            board,
            tile,
          })}
        </h1>
        <div className="card my-5 mx-md-5 py-2 px-0">
          <div className="card-body px-0">
            <h3 className="card-title">{t("subtitle")}</h3>
            <TrainCardForm
              onInfoChange={setInfo}
              info={info}
              onContentChange={setContent}
              content={content}
              onClick={handleClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewTrainCard;
