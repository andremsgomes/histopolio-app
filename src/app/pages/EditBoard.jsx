import React, { Component } from "react";

import api from "../api";
import EditAndLogout from "../components/EditAndLogout";
import BoardForm from "../components/BoardForm";

import { Link, useParams } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

class EditBoard extends Component {
  constructor(props) {
    super(props);

    this.handleTileNameChange = this.handleTileNameChange.bind(this);
    this.handlePointsChange = this.handlePointsChange.bind(this);
    this.handleTilesSave = this.handleTilesSave.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleBoardSave = this.handleBoardSave.bind(this);
  }

  state = {
    name: "",
    description: "",
    image: "",
    tiles: [],
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
    goToPrison: "Vá para a biblioteca",
  };

  componentDidMount() {
    api
      .board(this.props.params.board)
      .then((res) => {
        this.setState({
          name: res.data.name,
          description: res.data.description,
          image: res.data.image,
          tiles: res.data.tiles,
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

  handleTileNameChange(e, boardPosition) {
    const newTiles = this.state.tiles;
    newTiles[boardPosition].name = e.target.value;

    this.setState({
      tiles: newTiles,
    });
  }

  handlePointsChange(e, boardPosition) {
    const newTiles = this.state.tiles;
    newTiles[boardPosition].points = parseInt(e.target.value);

    this.setState({
      tiles: newTiles,
    });
  }

  handleTilesSave() {
    const tiles = JSON.parse(JSON.stringify(this.state.tiles));

    tiles.forEach((tile) => {
      if ("questions" in tile) delete tile.questions;
      if ("cards" in tile) delete tile.cards;
    });

    const payload = { tiles };

    api
      .updateTiles(payload)
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

  handleNameChange(e) {
    this.setState({
      name: e.target.value,
    });
  }

  handleDescriptionChange(e) {
    this.setState({
      description: e.target.value,
    });
  }

  handleImageChange(e) {
    this.setState({
      image: e.target.value,
    });
  }

  handleBoardSave() {
    const payload = {
      boardName: this.props.params.board,
      name: this.state.name,
      description: this.state.description,
      image: this.state.image,
    };

    api
      .updateBoard(payload)
      .then(() => {
        if (this.state.name !== this.props.params.board)
          window.location.href = `/admin/${this.state.name}/edit`;
      })
      .catch((error) => {
        console.log(error);
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
            <li className="breadcrumb-item active" aria-current="page">
              Editar
            </li>
          </ol>
          <div>
            <EditAndLogout />
          </div>
        </nav>
        <div className="text-center mt-5">
          <h1>{this.props.params.board}</h1>
          {this.state.tiles.length > 0 && (
            <div className="card my-5 mx-md-5 py-2 px-0">
              <div className="card-body px-0">
                <h3 className="card-title">Tabuleiro</h3>
                <div className="table-responsive mt-3">
                  <table className="table table-hover">
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
                      {this.state.tiles.map((tile) => {
                        return (
                          <tr>
                            <th scope="row">{tile.boardPosition}</th>
                            <td>{this.types[tile.type]}</td>
                            <td>
                              <input
                                onChange={(e) =>
                                  this.handleTileNameChange(
                                    e,
                                    tile.boardPosition
                                  )
                                }
                                type="text"
                                value={tile.name}
                              />
                            </td>
                            <td>
                              {"points" in tile ? (
                                <input
                                  className="table-input-number"
                                  onChange={(e) =>
                                    this.handlePointsChange(
                                      e,
                                      tile.boardPosition
                                    )
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
                                  className="text-decoration-none"
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
                                      className="text-decoration-none"
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
                                          className="text-decoration-none"
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
                                              className="text-decoration-none"
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
                </div>
                <button
                  className="btn btn-lg btn-outline-success mt-3"
                  onClick={this.handleTilesSave}
                >
                  Guardar alterações
                </button>
              </div>
            </div>
          )}
          <div className="card my-5 mx-md-5 py-2 px-0">
            <div className="card-body px-0">
              <h3 className="card-title">Troféus</h3>
              {this.state.badges.length > 0 && (
                <div className="table-responsive mt-3">
                  <table className="table table-hover">
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
                </div>
              )}
              <Link
                to={"/admin/" + this.props.params.board + "/badges/new"}
                style={{ textDecoration: "none" }}
              >
                <button className="btn btn-lg btn-primary mt-3">
                  Adicionar troféu
                </button>
              </Link>
            </div>
          </div>
          {this.state.name.length > 0 && (
            <BoardForm
              title="Outras definições"
              onNameChange={this.handleNameChange}
              name={this.state.name}
              onDescriptionChange={this.handleDescriptionChange}
              description={this.state.description}
              onImageChange={this.handleImageChange}
              image={this.state.image}
              onClick={this.handleBoardSave}
              buttonText="Guardar alteraçoẽs"
            />
          )}
        </div>
      </div>
    );
  }
}

export default withParams(EditBoard);
