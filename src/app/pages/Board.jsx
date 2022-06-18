import React, { Component } from "react";
import { Link, useParams } from "react-router-dom";

import api from "../api";
import EditAndLogout from "../components/EditAndLogout";

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

class Board extends Component {
  state = {
    saves: [],
  };

  componentDidMount() {
    api
      .saves(this.props.params.board)
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
              {this.props.params.board}
            </li>
          </ol>
          <div>
            <EditAndLogout />
          </div>
        </nav>
        <div className="row text-center m-4">
          <div className="col-sm-12 col-md-8 col-lg-6 mx-auto">
            <h1 className="mb-4">{this.props.params.board}</h1>
            {this.state.saves.length > 0 && (
              <h4 className="mb-3">Dados guardados</h4>
            )}
            {this.state.saves.map((save) => {
              return (
                <Link
                  to={`/admin/${this.props.params.board}/${save.name}`}
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
            <Link
              to={`/admin/${this.props.params.board}/edit`}
              style={{ textDecoration: "none" }}
            >
              <button className="btn btn-lg btn-primary my-4">
                Editar tabuleiro
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default withParams(Board);
