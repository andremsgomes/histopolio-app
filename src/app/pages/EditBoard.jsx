import React, { Component } from "react";

import api from "../api";
import { Link, useParams } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

class EditBoard extends Component {
  constructor(props) {
    super(props);

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePointsChange = this.handlePointsChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  state = {
    board: null,
    badges: [],
  };

  types = {
    go: "Casa da partida",
    groupProperty: "Casa de perguntas",
    community: "Decisões do senado",
    pay: "Casa de azar",
    train: "Estação de treino",
    chance: "Sorte",
    prison: "Biblioteca",
    parking: "Associação de estudantes",
    goToPrison: "Vá para a prisão",
  };

  componentDidMount() {
    api
      .board(this.props.params.board)
      .then((res) => {
        this.setState({
          board: res.data,
        });
      })
      .catch((error) => {
        console.log(error.message);
      });

    api.badges(this.props.params.board).then((res) => {
      this.setState({
        badges: res.data,
      }).catch((error) => {
        console.log(error.message);
      });
    });
  }

  handleNameChange(e, boardPosition) {
    const newBoard = this.state.board;
    newBoard[boardPosition].name = e.target.value;

    this.setState({
      board: newBoard,
    });
  }

  handlePointsChange(e, boardPosition) {
    const newBoard = this.state.board;
    newBoard[boardPosition].points = parseInt(e.target.value);

    this.setState({
      board: newBoard,
    });
  }

  handleClick() {
    const board = JSON.parse(JSON.stringify(this.state.board));

    board.forEach((tile) => {
      if ("questions" in tile) delete tile.questions;
      if ("cards" in tile) delete tile.cards;
    });

    const payload = { board };

    api
      .updateBoard(payload)
      .then(() => {})
      .catch((error) => {
        console.log(error.message);
      });
  }

  handleDelete(id) {
    api.deleteBadge(id).then(() => {
      const newBadges = this.state.badges.filter((badge) => {
        return badge._id !== id;
      });

      this.setState({
        badges: newBadges,
      });
    });
  }

  render() {
    return (
      <div className="text-center mt-4">
        <h1>{this.props.params.board}</h1>
        {this.state.board && (
          <div>
            <h4 className="mt-4">Tabuleiro</h4>
            <table className="table table-hover mt-3">
              <thead>
                <tr>
                  <th scope="col">Posição</th>
                  <th scope="col">Tipo</th>
                  <th scope="col">Nome</th>
                  <th scope="col">Pontos</th>
                  <th scope="col">Conteúdo</th>
                </tr>
              </thead>
              <tbody>
                {this.state.board.map((tile) => {
                  return (
                    <tr>
                      <th scope="row">{tile.boardPosition}</th>
                      <td>{this.types[tile.type]}</td>
                      <td>
                        <input
                          onChange={(e) =>
                            this.handleNameChange(e, tile.boardPosition)
                          }
                          type="text"
                          value={tile.name}
                        />
                      </td>
                      <td>
                        {"points" in tile ? (
                          <input
                            onChange={(e) =>
                              this.handlePointsChange(e, tile.boardPosition)
                            }
                            type="number"
                            value={tile.points}
                          />
                        ) : (
                          "-"
                        )}
                      </td>
                      <td>
                        {tile.type === "groupProperty" ||
                        tile.type === "pay" ? (
                          <Link
                            to={`/admin/${this.props.params.board}/${tile.boardPosition}/questions`}
                          >
                            {tile.questions ? (
                              <>
                                {tile.questions} pergunta
                                {tile.questions !== 1 && "s"}
                              </>
                            ) : (
                              "0 perguntas"
                            )}
                          </Link>
                        ) : (
                          <>
                            {tile.type === "community" ? (
                              <Link
                                to={`/admin/${this.props.params.board}/deck_cards/community`}
                              >
                                {tile.cards ? (
                                  <>
                                    {tile.cards} carta
                                    {tile.cards !== 1 && "s"}
                                  </>
                                ) : (
                                  "0 cartas"
                                )}
                              </Link>
                            ) : (
                              <>
                                {tile.type === "chance" ? (
                                  <Link
                                    to={`/admin/${this.props.params.board}/deck_cards/chance`}
                                  >
                                    {tile.cards ? (
                                      <>
                                        {tile.cards} carta
                                        {tile.cards !== 1 && "s"}
                                      </>
                                    ) : (
                                      "0 cartas"
                                    )}
                                  </Link>
                                ) : (
                                  <>
                                    {tile.type === "train" ? (
                                      <Link
                                        to={`/admin/${this.props.params.board}/${tile.boardPosition}/train_cards`}
                                      >
                                        {tile.cards ? (
                                          <>
                                            {tile.cards} carta
                                            {tile.cards !== 1 && "s"}
                                          </>
                                        ) : (
                                          "0 cartas"
                                        )}
                                      </Link>
                                    ) : (
                                      "-"
                                    )}
                                  </>
                                )}
                              </>
                            )}
                          </>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <button
              className="btn btn-lg btn-primary my-4"
              onClick={this.handleClick}
            >
              Guardar alterações
            </button>
          </div>
        )}
        <h4 className="mt-4">Troféus</h4>
        {this.state.badges.length > 0 && (
          <table className="table table-hover mt-3">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nome</th>
                <th scope="col">Multiplicador</th>
                <th scope="col">Custo</th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {this.state.badges.map((badge, i) => {
                return (
                  <tr>
                    <th scope="row">{i + 1}</th>
                    <td>{badge.name}</td>
                    <td>x{badge.multiplier}</td>
                    <td>
                      {badge.cost} ponto{badge.cost !== 1 && "s"}
                    </td>
                    <td>
                      <Link
                        to={`/admin/${this.props.params.board}/badge/${badge._id}/edit`}
                      >
                        <FontAwesomeIcon icon={faPencil} />
                      </Link>
                    </td>
                    <td>
                      <Link
                        to="#"
                        className="text-danger"
                        onClick={() => this.handleDelete(badge._id)}
                      >
                        <FontAwesomeIcon icon={faTrashCan} />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        <Link
          to={"/admin/" + this.props.params.board + "/badges/new"}
          style={{ textDecoration: "none" }}
        >
          <button className="btn btn-lg btn-primary my-4">
            Adicionar troféu
          </button>
        </Link>
      </div>
    );
  }
}

export default withParams(EditBoard);
