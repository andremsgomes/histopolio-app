import React, { useState, useEffect } from "react";

import api from "../api";
import EditAndLogout from "../components/EditAndLogout";

import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

function EditSave() {
  const { t } = useTranslation(undefined, { keyPrefix: "edit-save" });
  const { board, save } = useParams();

  const [players, setPlayers] = useState([]);
  const [alertType, setAlertType] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    api
      .players(board, save)
      .then((res) => {
        setPlayers(res.data);
      })
      .catch((error) => {
        console.log(error.message);
        setAlertType("danger");
        setAlertMessage(error.message);
      });
  }, [board, save]);

  const handlePositionChange = (e, userId) => {
    const newPlayers = players.map((player) => {
      if (player.userId === userId) {
        player.boardPosition = parseInt(e.target.value);
      }

      return player;
    });

    setPlayers(newPlayers);
  };

  const handlePointsChange = (e, userId) => {
    const newPlayers = players.map((player) => {
      if (player.userId === userId) {
        player.points = parseInt(e.target.value);
      }

      return player;
    });

    setPlayers(newPlayers);
  };

  const handleNumTurnsChange = (e, userId) => {
    const newPlayers = players.map((player) => {
      if (player.userId === userId) {
        player.turns = parseInt(e.target.value);
      }

      return player;
    });

    setPlayers(newPlayers);
  };

  const handleAnswersChange = (e, userId) => {
    const newPlayers = players.map((player) => {
      if (player.userId === userId) {
        player.totalAnswers = parseInt(e.target.value);
      }

      return player;
    });

    setPlayers(newPlayers);
  };

  const handleCorrectAnswersChange = (e, userId) => {
    const newPlayers = players.map((player) => {
      if (player.userId === userId) {
        player.correctAnswers = parseInt(e.target.value);
      }

      return player;
    });

    setPlayers(newPlayers);
  };

  const handleClick = (t) => {
    const playersClone = JSON.parse(JSON.stringify(players));
    playersClone.forEach((player) => {
      delete player.name;
      delete player.email;
    });

    const payload = { players: playersClone };

    api
      .updatePlayers(payload)
      .then(() => {
        setAlertType("success");
        setAlertMessage(t("handle-click.success"));
      })
      .catch((error) => {
        console.log(error.message);
        setAlertType("danger");
        setAlertMessage(error.message);
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
            {save}
          </li>
        </ol>
        <div>
          <EditAndLogout />
        </div>
      </nav>
      <div className="text-center mt-5">
        <h1>
          {board} - {save}
        </h1>
        <div className="card my-5 mx-md-5 py-2 px-0">
          <div className="card-body px-0">
            {alertMessage.length > 0 && (
              <div className={"m-4 alert alert-" + alertType} role="alert">
                {alertMessage}
              </div>
            )}
            <h3 className="card-title">{t("title")}</h3>
            <div className="table-responsive mt-3">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">{t("table.name-column.name")}</th>
                    <th scope="col">{t("table.email-column.name")}</th>
                    <th scope="col">{t("table.position-column.name")}</th>
                    <th scope="col">{t("table.plays-column.name")}</th>
                    <th scope="col">{t("table.score-column.name")}</th>
                    <th scope="col">{t("table.total-answers-column.name")}</th>
                    <th scope="col">
                      {t("table.correct-answers-column.name")}
                    </th>
                    <th scope="col">
                      {t("table.correct-answers-percent-column.name")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {players.map((player, i) => {
                    const percCorrect =
                      !player.totalAnswers || player.totalAnswers === 0
                        ? "-"
                        : Math.round(
                            (player.correctAnswers / player.totalAnswers) *
                              100 *
                              100
                          ) /
                            100 +
                          "%";

                    return (
                      <tr key={player._id}>
                        <th scope="row">{i + 1}</th>
                        <td>{player.name}</td>
                        <td>{player.email}</td>
                        <td>
                          <input
                            id={"position" + player.userId}
                            className="table-input-number"
                            onChange={(e) =>
                              handlePositionChange(e, player.userId)
                            }
                            type="number"
                            value={player.boardPosition}
                          />
                        </td>
                        <td>
                          <input
                            id={"numTurns" + player.userId}
                            className="table-input-number"
                            onChange={(e) =>
                              handleNumTurnsChange(e, player.userId)
                            }
                            type="number"
                            value={player.turns}
                          />
                        </td>
                        <td>
                          <input
                            id={"points" + player.userId}
                            className="table-input-number"
                            onChange={(e) =>
                              handlePointsChange(e, player.userId)
                            }
                            type="number"
                            value={player.points}
                          />
                        </td>
                        <td>
                          <input
                            id={"answers" + player.userId}
                            className="table-input-number"
                            onChange={(e) =>
                              handleAnswersChange(e, player.userId)
                            }
                            type="number"
                            value={player.totalAnswers}
                          />
                        </td>
                        <td>
                          <input
                            id={"correctAnswers" + player.userId}
                            className="table-input-number"
                            onChange={(e) =>
                              handleCorrectAnswersChange(e, player.userId)
                            }
                            type="number"
                            value={player.correctAnswers}
                          />
                        </td>
                        <td>{percCorrect}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <button
              className="btn btn-lg btn-outline-success mt-3"
              onClick={() => handleClick(t)}
            >
              {t("save-button")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditSave;
