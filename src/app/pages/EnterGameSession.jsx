import React, { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";

import api from "../api";
import EditAndLogout from "../components/EditAndLogout";

function EnterGameSession() {
  const { board } = useParams();
  const [code, setCode] = useState("");

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));

    api.playerData(board, user.id).then(() => {
      window.location.href = `/${board}/play`;
    });
  }, [board]);

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  const handleClick = () => {
    const user = JSON.parse(sessionStorage.getItem("user"));

    const payload = {
      userId: user.id,
      boardName: board,
      code: parseInt(code),
    };

    api
      .createPlayer(payload)
      .then(() => {
        window.location.href = `/${board}/play`;
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
            <Link to="/" className="text-decoration-none">Menu</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {board}
          </li>
        </ol>
        <div>
          <EditAndLogout />
        </div>
      </nav>
      <div className="text-center page-center">
        <h2 className="m-4">
          Introduz o código de acesso apresentado no ecrã de jogo
        </h2>
        <div className="row m-4">
          <div className="col-sm-12 col-md-8 col-lg-6 col-xl-5 mx-auto">
            <div className="form-group row">
              <input
                type="text"
                className="form-control"
                name="code"
                onChange={handleCodeChange}
                value={code}
                placeholder="Código de acesso"
              />
            </div>
            <button
              className="btn btn-primary btn-lg mt-4 px-5"
              onClick={handleClick}
            >
              Entrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EnterGameSession;
