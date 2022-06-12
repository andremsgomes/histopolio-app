import React, { Component } from "react";

import api from "../api";
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
    const payload = { id };

    api.deleteCard(payload).then(() => {
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
      <div className="text-center mt-4">
        <h1>
          {this.props.params.board} - Casa {this.props.params.tile}
        </h1>
        <h4>Cartas de treino</h4>
        <table className="table table-hover mt-4">
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
        <Link
          to={
            "/admin/" +
            this.props.params.board +
            "/" +
            this.props.params.tile +
            "/train_cards/new"
          }
          style={{ textDecoration: "none" }}
        >
          <button className="btn btn-lg btn-primary my-4">
            Adicionar carta
          </button>
        </Link>
      </div>
    );
  }
}

export default withParams(EditTrainCards);
