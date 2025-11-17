import React, { useState, useEffect } from "react";

import api from "../api";
import EditAndLogout from "../components/EditAndLogout";

import { Link, useParams } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

function EditTrainCards() {
  const { board, tile } = useParams();
  const { t } = useTranslation(undefined, { keyPrefix: "edit-train-cards" });

  const [cards, setCards] = useState([]);

  useEffect(() => {
    api
      .trainCards(board, tile)
      .then((res) => {
        console.log(res);
        setCards(res.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [board, tile]);

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
            <Link to={`/admin/${board}/edit`} className="text-decoration-none">
              {t("breadcrumbs.edit")}
            </Link>
          </li>
          <li className="breadcrumb-item" aria-current="page">
            {t("breadcrumbs.tile", { tile: tile })}
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {t("breadcrumbs.train-cards")}
          </li>
        </ol>
        <div>
          <EditAndLogout />
        </div>
      </nav>
      <div className="text-center mt-5">
        <h1>
          {t("title", {
            board: board,
            tile: tile,
          })}
        </h1>
        <div className="card my-5 mx-md-5 py-2 px-0">
          <div className="card-body px-0">
            <h3 className="card-title">{t("subtitle")}</h3>
            <div className="table-responsive mt-3">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">{t("table.description-column.name")}</th>
                    <th scope="col">{t("table.content-column.name")}</th>
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
                        <td>{card.content}</td>
                        <td>
                          <Link
                            to={`/admin/${board}/${tile}/train_cards/${card._id}/edit`}
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
              to={"/admin/" + board + "/" + tile + "/train_cards/new"}
              className="text-decoration-none"
            >
              <button className="btn btn-lg btn-primary mt-3">
                {t("save-button")}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditTrainCards;
