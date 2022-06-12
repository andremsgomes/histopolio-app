import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import api from "../api";

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
          <Link
            to="/profile/edit"
            className="text-black text-decoration-none fw-bold"
          >
            <span className="m-4">{user.name}</span>
            <img
              src="https://www.linkpicture.com/q/edit-profile.png"
              width="40em"
              height="40em"
              alt="profile"
            />
          </Link>
        </div>
      </nav>
      <div className={"text-center " + (boards.length === 1 ? ("page-center") : "")}>
        <div className="row justify-content-center m-4">
        <h2 className="mb-4">Os teus jogos</h2>
          {boards.map((board) => {
            return (
              <div className="col-sm-12 col-md-6 col-lg-3">
                <div className="card m-2 p-3">
                  <img
                    src={board.image}
                    className="card-img-top mx-auto"
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
                    <Link to={`/${board.name}/saves`}>
                      <button className="btn btn-primary btn-lg mt-4">Jogar</button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default PlayerMenu;
