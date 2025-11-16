import React, { useState, useEffect } from "react";

import api from "../api";
import EditAndLogout from "../components/EditAndLogout";

import { Link, useParams } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

function EditDeckCards() {
  const { board, deck } = useParams();
  const { t } = useTranslation(undefined, { keyPrefix: "edit-deck-cards" });

  const [cards, setCards] = useState([]);

  useEffect(() => {
    api
      .deckCards(board, deck)
      .then((res) => {
        setCards(res.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [board, deck]);

  const handleDelete = (id) => {
    api.deleteCard(id).then(() => {
      const newCards = cards.filter((card) => {
        return card._id !== id;
      });

      setCards(newCards);
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
            {t("breadcrumbs.cards")}
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {deck === "chance"
              ? t("breadcrumbs.chance")
              : t("breadcrumbs.senate-decisions")}
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
            <h3 className="card-title">
              {deck === "chance"
                ? t("title.chance")
                : t("title.senate-decisions")}
            </h3>
            <div className="table-responsive mt-3">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">{t("table.description-column.name")}</th>
                    <th scope="col">
                      {t("table.immediate-points-column.name")}
                    </th>
                    <th scope="col">{t("table.action-column.name")}</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {cards.map((card, i) => {
                    return (
                      <tr>
                        <th scope="row">{i + 1}</th>
                        <td>{card.info}</td>
                        <td>{card.points}</td>
                        <td>
                          {card.action === "none" ? (
                            t("table.action-column.options.no-action")
                          ) : (
                            <>
                              {card.action === "move"
                                ? t("table.action-column.options.move", {
                                    count: card.actionValue,
                                  })
                                : t("table.action-column.options.move-to", {
                                    tile: card.actionValue,
                                  })}
                            </>
                          )}
                        </td>
                        <td>
                          <Link
                            to={`/admin/${board}/cards/deck/${card._id}/edit`}
                          >
                            <FontAwesomeIcon icon={faPencil} />
                          </Link>
                        </td>
                        <td>
                          <Link
                            to="#"
                            className="text-danger"
                            onClick={() => handleDelete(card._id)}
                          >
                            <FontAwesomeIcon icon={faTrashCan} />
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <Link
              to={"/admin/" + board + "/cards/deck/new"}
              className="text-decoration-none"
            >
              <button className="btn btn-lg btn-primary mt-3">
                {t("add-button")}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditDeckCards;
