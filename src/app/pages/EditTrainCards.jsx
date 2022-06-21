import React, { Component } from "react";

import api from "../api";
import EditAndLogout from "../components/EditAndLogout";

import { Link, useParams } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

class EditTrainCards extends Component {
  state = {
    cards: [],
  };

  componentDidMount() {
    api
      .trainCards(this.props.params.board, this.props.params.tile)
      .then((res) => {
        console.log(res);
        this.setState({
          cards: res.data,
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  handleDelete(id) {
    api.deleteCard(id).then(() => {
      const newCards = this.state.cards.filter((card) => {
        return card._id !== id;
      });

      this.setState({
        cards: newCards,
      });
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
              <Link to="/admin" className="text-decoration-none">
                Menu
              </Link>
            </li>
            <li className="breadcrumb-item" aria-current="page">
              <Link
                to={`/admin/${this.props.params.board}`}
                className="text-decoration-none"
              >
                {this.props.params.board}
              </Link>
            </li>
            <li className="breadcrumb-item" aria-current="page">
              <Link
                to={`/admin/${this.props.params.board}/edit`}
                className="text-decoration-none"
              >
                Editar
              </Link>
            </li>
            <li className="breadcrumb-item" aria-current="page">
              Casa {this.props.params.tile}
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Cartas de treino
            </li>
          </ol>
          <div>
            <EditAndLogout />
          </div>
        </nav>
        <div className="text-center mt-5">
          <h1>
            {this.props.params.board} - Casa {this.props.params.tile}
          </h1>
          <div className="card my-5 mx-md-5 py-2 px-0">
            <div className="card-body px-0">
              <h3 className="card-title">Cartas de treino</h3>
              <div className="table-responsive mt-3">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Descrição</th>
                      <th scope="col">Conteúdo</th>
                      <th scope="col"></th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.cards.map((card, i) => {
                      return (
                        <tr>
                          <th scope="row">{i + 1}</th>
                          <td>{card.info}</td>
                          <td>{card.content}</td>
                          <td>
                            <Link
                              to={`/admin/${this.props.params.board}/${this.props.params.tile}/train_cards/${card._id}/edit`}
                            >
                              <FontAwesomeIcon icon={faPencil} />
                            </Link>
                          </td>
                          <td>
                            <Link
                              to="#"
                              className="text-danger"
                              onClick={() => this.handleDelete(card._id)}
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
                to={
                  "/admin/" +
                  this.props.params.board +
                  "/" +
                  this.props.params.tile +
                  "/train_cards/new"
                }
                className="text-decoration-none"
              >
                <button className="btn btn-lg btn-primary mt-3">
                  Adicionar carta
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withParams(EditTrainCards);
