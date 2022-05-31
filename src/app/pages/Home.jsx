import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import api from "../api";

function Home() {
  const user = JSON.parse(sessionStorage.getItem("user"));

  const [saves, setSaves] = useState([]);

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));

    api
      .playerData("Histopólio", user.id)
      .then((res) => {
        setSaves(res.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  return (
    <div className="text-center page-center">
      <h1>Olá {user.name}</h1>
      <Link to="/Histopólio/saves" style={{ textDecoration: "none" }}>
        <button className="btn btn-primary btn-lg mt-4">
          Jogar Histopólio
        </button>
      </Link>
      <div className="mt-2">
        {saves.map((save) => {
          return (
            <h6>
              {save.saveName}: {save.points} pontos
            </h6>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
