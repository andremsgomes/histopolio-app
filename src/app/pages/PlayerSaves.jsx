import React, { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";

import api from "../api";
import EditAndLogout from "../components/EditAndLogout";

function PlayerSaves() {
  const { board } = useParams();
  const [saves, setSaves] = useState([]);

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));

    api
      .playerData(board, user.id)
      .then((res) => {
        setSaves(res.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  return (
    <div>
      <nav
        aria-label="breadcrumb"
        className="navbar navbar-light bg-white px-4"
      >
        <ol className="breadcrumb m-0">
          <li className="breadcrumb-item" aria-current="page">
            <Link to="/">Menu</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {board}
          </li>
        </ol>
        <div>
          <EditAndLogout />
        </div>
      </nav>
      <div className={`text-center ${saves.length < 2 ? (" page-center") : "" }`}>
        <h2 className="m-4">Escolhe um dos dados guardados</h2>
        <div className="row g-0">
          <div className="col-sm-12 col-md-8 col-lg-6 mx-auto">
            {saves.map((save) => {
              return (
                <Link
                  to={`/${board}/play?save=${save.saveName}`}
                  style={{ textDecoration: "none" }}
                >
                  <div className="card mb-2 mx-4 p-3">
                    <div className="card-body">
                      <h4 className="card-title">{save.saveName}</h4>
                      <p class="card-text">
                        {save.points} ponto
                        {save.points !== 1 && "s"}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
            <Link to={`/${board}/play`} style={{ textDecoration: "none" }}>
              <button className="btn btn-lg btn-primary mt-4">Novo jogo</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlayerSaves;
