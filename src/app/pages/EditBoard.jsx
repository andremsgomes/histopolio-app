import React, { useState, useEffect } from "react";

import api from "../api";
import EditAndLogout from "../components/EditAndLogout";
import BoardForm from "../components/BoardForm";

import { Link, useParams } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

function EditBoard() {
  const { t } = useTranslation(undefined, { keyPrefix: "edit-board" });
  const { board } = useParams();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [tiles, setTiles] = useState([]);
  const [badges, setBadges] = useState([]);

  const typesTranslationMap = {
    go: "tile-type.go",
    groupProperty: "tile-type.group-property",
    community: "tile-type.community",
    pay: "tile-type.pay",
    train: "tile-type.train",
    chance: "tile-type.chance",
    prison: "tile-type.prison",
    parking: "tile-type.parking",
    goToPrison: "tile-type.go-to-prison",
  };

  useEffect(() => {
    api
      .board(board)
      .then((res) => {
        setName(res.data.name);
        setDescription(res.data.description);
        setImage(res.data.image);
        setTiles(res.data.tiles);
      })
      .catch((error) => {
        console.log(error.message);
      });

    api.badges(board).then((res) => {
      setBadges(res.data).catch((error) => {
        console.log(error.message);
      });
    });
  }, []);

  const handleTileNameChange = (e, boardPosition) => {
    const newTiles = tiles;
    newTiles[boardPosition].name = e.target.value;

    setTiles(newTiles);
  };

  const handlePointsChange = (e, boardPosition) => {
    const newTiles = tiles;
    newTiles[boardPosition].points = parseInt(e.target.value);

    setTiles(newTiles);
  };

  const handleTilesSave = () => {
    const tilesClone = JSON.parse(JSON.stringify(tiles));

    tilesClone.forEach((tile) => {
      if ("questions" in tile) delete tile.questions;
      if ("cards" in tile) delete tile.cards;
    });

    const payload = { tiles };

    api
      .updateTiles(payload)
      .then(() => {})
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleDelete = (id) => {
    api.deleteBadge(id).then(() => {
      const newBadges = badges.filter((badge) => {
        return badge._id !== id;
      });

      setBadges(newBadges);
    });
  };

  const handleBoardSave = () => {
    const payload = {
      boardName: board,
      name,
      description,
      image,
    };

    api
      .updateBoard(payload)
      .then(() => {
        if (name !== board) window.location.href = `/admin/${name}/edit`;
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
          <li className="breadcrumb-item" aria-current="page">
            <Link to={`/admin/${board}`} className="text-decoration-none">
              {board}
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {t("breadcrumbs.edit")}
          </li>
        </ol>
        <div>
          <EditAndLogout />
        </div>
      </nav>
      <div className="text-center mt-5">
        <h1>{board}</h1>
        {tiles.length > 0 && (
          <div className="card my-5 mx-md-5 py-2 px-0">
            <div className="card-body px-0">
              <h3 className="card-title">{t("game-board-table.title")}</h3>
              <div className="table-responsive mt-3">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">
                        {t("game-board-table.position-column.name")}
                      </th>
                      <th scope="col">
                        {t("game-board-table.type-column.name")}
                      </th>
                      <th scope="col">
                        {t("game-board-table.name-column.name")}
                      </th>
                      <th scope="col">
                        {t("game-board-table.points-column.name")}
                      </th>
                      <th scope="col">
                        {t("game-board-table.content-column.name")}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {tiles.map((tile) => {
                      return (
                        <tr>
                          <th scope="row">{tile.boardPosition}</th>
                          <td>{t(typesTranslationMap[tile.type])}</td>
                          <td>
                            <input
                              onChange={(e) =>
                                handleTileNameChange(e, tile.boardPosition)
                              }
                              type="text"
                              value={tile.name}
                            />
                          </td>
                          <td>
                            {"points" in tile ? (
                              <input
                                className="table-input-number"
                                onChange={(e) =>
                                  handlePointsChange(e, tile.boardPosition)
                                }
                                type="number"
                                value={tile.points}
                              />
                            ) : (
                              "-"
                            )}
                          </td>
                          <td>
                            {tile.type === "groupProperty" ||
                            tile.type === "pay" ? (
                              <Link
                                to={`/admin/${board}/${tile.boardPosition}/questions`}
                                className="text-decoration-none"
                              >
                                {t(
                                  "game-board-table.content-column.questions",
                                  { count: tile.questions ?? 0 }
                                )}
                              </Link>
                            ) : (
                              <>
                                {tile.type === "community" ? (
                                  <Link
                                    to={`/admin/${board}/deck_cards/community`}
                                    className="text-decoration-none"
                                  >
                                    {t(
                                      "game-board-table.content-column.cards",
                                      { count: tile.cards ?? 0 }
                                    )}
                                  </Link>
                                ) : (
                                  <>
                                    {tile.type === "chance" ? (
                                      <Link
                                        to={`/admin/${board}/deck_cards/chance`}
                                        className="text-decoration-none"
                                      >
                                        {t(
                                          "game-board-table.content-column.cards",
                                          { count: tile.cards ?? 0 }
                                        )}
                                      </Link>
                                    ) : (
                                      <>
                                        {tile.type === "train" ? (
                                          <Link
                                            to={`/admin/${board}/${tile.boardPosition}/train_cards`}
                                            className="text-decoration-none"
                                          >
                                            {t(
                                              "game-board-table.content-column.cards",
                                              { count: tile.cards ?? 0 }
                                            )}
                                          </Link>
                                        ) : (
                                          "-"
                                        )}
                                      </>
                                    )}
                                  </>
                                )}
                              </>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <button
                className="btn btn-lg btn-outline-success mt-3"
                onClick={handleTilesSave}
              >
                {t("game-board-table.save-button")}
              </button>
            </div>
          </div>
        )}
        <div className="card my-5 mx-md-5 py-2 px-0">
          <div className="card-body px-0">
            <h3 className="card-title">{t("badges-table.title")}</h3>
            {badges.length > 0 && (
              <div className="table-responsive mt-3">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">{t("badges-table.name-column.name")}</th>
                      <th scope="col">
                        {t("badges-table.multiplier-column.name")}
                      </th>
                      <th scope="col">{t("badges-table.price-column.name")}</th>
                      <th scope="col"></th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {badges.map((badge, i) => {
                      return (
                        <tr>
                          <th scope="row">{i + 1}</th>
                          <td>{badge.name}</td>
                          <td>x{badge.multiplier}</td>
                          <td>
                            {t("badges-table.price-column.price", {
                              count: badge.cost,
                            })}
                          </td>
                          <td>
                            <Link
                              to={`/admin/${board}/badge/${badge._id}/edit`}
                            >
                              <FontAwesomeIcon icon={faPencil} />
                            </Link>
                          </td>
                          <td>
                            <Link
                              to="#"
                              className="text-danger"
                              onClick={() => handleDelete(badge._id)}
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
            )}
            <Link
              to={"/admin/" + board + "/badges/new"}
              style={{ textDecoration: "none" }}
            >
              <button className="btn btn-lg btn-primary mt-3">
                {t("badges-table.add-button")}
              </button>
            </Link>
          </div>
        </div>
        {name.length > 0 && (
          <BoardForm
            title={t("board-form.title")}
            onNameChange={setName}
            name={name}
            onDescriptionChange={setDescription}
            description={description}
            onImageChange={setImage}
            image={image}
            onClick={handleBoardSave}
            buttonText={t("board-form.save-button")}
          />
        )}
      </div>
    </div>
  );
}

export default EditBoard;
