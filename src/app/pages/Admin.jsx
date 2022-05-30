import React, { Component } from "react";
import { Link } from "react-router-dom";

import api from "../api";

class Admin extends Component {
  state = {
    saves: [],
  };

  componentDidMount() {
    api
      .saves("Histopólio")
      .then((res) => {
        this.setState({
          saves: res.data,
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  render() {
    return (
      <div className="row text-center m-4">
        <div className="col-sm-12 col-md-8 col-lg-6 mx-auto">
          <h1 className="mb-4">Histopólio</h1>
          {this.state.saves.length > 0 && (
            <h4 className="mb-3">Dados guardados</h4>
          )}
          {this.state.saves.map((save) => {
            return (
              <Link
                to={"/admin/Histopólio/" + save.name}
                style={{ textDecoration: "none" }}
                key={save._id}
              >
                <div className="card mb-2 mx-4 p-3">
                  <div className="card-body">
                    <h4 className="card-title">{save.name}</h4>
                    <p className="card-text">
                      {save.players} jogador{save.players !== 1 && "es"}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
          <Link to="/admin/Histopólio" style={{ textDecoration: "none" }}>
            <button className="btn btn-lg btn-primary my-4">
              Editar tabuleiro
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Admin;
