import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../api";
import EditAndLogout from "../components/EditAndLogout";

function PlayerMenu() {
  const user = JSON.parse(sessionStorage.getItem("user"));

  const [boards, setBoards] = useState([]);

  useEffect(() => {
    api
      .boards()
      .then((res) => {
        setBoards(res.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  const startGame = (boardName) => {
    api
      .playerData(boardName, user.id)
      .then(() => {
        window.location.href = `/${boardName}/play`;
      })
      .catch(() => {
        window.location.href = `/${boardName}/enter`;
      });
  };

  return (
    <div>
      <nav
        aria-label="breadcrumb"
        className="navbar navbar-light bg-white px-4"
      >
        <ol className="breadcrumb m-0">
          <li className="breadcrumb-item active" aria-current="page">
            Menu
          </li>
        </ol>
        <div>
          <span className="m-3">{user.name}</span>
          <EditAndLogout />
        </div>
      </nav>
      <div
        className={"text-center " + (boards.length === 1 ? "page-center" : "")}
      >
        <div className="row justify-content-center m-4">
          <h2 className="mb-4">Os teus tabuleiros</h2>
          {boards.map((board) => {
            return (
              <div className="col-sm-12 col-md-6 col-lg-3">
                <div className="card m-2 p-3">
                  <img
                    src={board.image}
                    className="card-img-top mx-auto rounded-circle border"
                    style={{
                      objectFit: "cover",
                      width: "250px",
                      height: "250px",
                    }}
                    alt={"board " + board.name}
                  />
                  <div className="card-body">
                    <h2 class="card-title">{board.name}</h2>
                    <p className="card-text mb-1 mt-3">{board.description}</p>
                    <button
                      className="btn btn-primary btn-lg mt-4"
                      onClick={() => startGame(board.name)}
                    >
                      Jogar
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
          <Link to="/rules">
            <button className="btn btn-lg btn-primary mt-4">
              Consultar as regras
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PlayerMenu;
