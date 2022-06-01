import React, { Component } from "react";

import api from "../api";
import { Link, useParams } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

class EditDeckCards extends Component {
  state = {
    cards: [],
  };

  componentDidMount() {
    api
      .deckCards(this.props.params.board, this.props.params.deck)
      .then((res) => {
        this.setState({
          cards: res.data,
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  render() {
    return (
      <div className="text-center mt-4">
        <h1>{this.props.params.board}</h1>
        <h4>
          {this.props.params.deck === "chance"
            ? "Cartas da Sorte"
            : "Cartas de Decisão do Senado"}
        </h4>
        <table className="table table-hover mt-4">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Descrição</th>
              <th scope="col">Pontos imediatos</th>
              <th scope="col">Ação</th>
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
                  <td>{card.points}</td>
                  <td>{card.action === "none" ? (
                      "Sem ação"
                  ) : (
                      <>
                      {card.action === "move" ? (
                          `Avançar ${card.actionValue} casa${card.actionValue !== "1" ? ("s") : ("")}`
                      ) : (
                          `Mover para a casa ${card.actionValue}`
                      )}
                      </>
                  )}</td>
                  <td>
                    <FontAwesomeIcon icon={faPencil} />
                  </td>
                  <td>
                    <FontAwesomeIcon icon={faTrashCan} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Link
          to={"/admin/" + this.props.params.board + "/cards/deck/new"}
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

export default withParams(EditDeckCards);