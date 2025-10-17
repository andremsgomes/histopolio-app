import React, { Component } from "react";

import api from "../api";
import EditAndLogout from "../components/EditAndLogout";

import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

class EditSave extends Component {
  constructor(props) {
    super(props);

    this.handlePositionChange = this.handlePositionChange.bind(this);
    this.handlePointsChange = this.handlePointsChange.bind(this);
    this.handleNumTurnsChange = this.handleNumTurnsChange.bind(this);
    this.handleAnswersChange = this.handleAnswersChange.bind(this);
    this.handleCorrectAnswersChange =
      this.handleCorrectAnswersChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  state = {
    players: [],
    alertType: "",
    alertMessage: "",
  };

  componentDidMount() {
    api
      .players(this.props.params.board, this.props.params.save)
      .then((res) => {
        this.setState({
          players: res.data,
        });
      })
      .catch((error) => {
        console.log(error.message);
        this.setState({
          alertType: "danger",
          alertMessage: error.message,
        });
      });
  }

  handlePositionChange(e, userId) {
    const newPlayers = this.state.players.map((player) => {
      if (player.userId === userId) {
        player.boardPosition = parseInt(e.target.value);
      }

      return player;
    });

    this.setState({
      players: newPlayers,
    });
  }

  handlePointsChange(e, userId) {
    const newPlayers = this.state.players.map((player) => {
      if (player.userId === userId) {
        player.points = parseInt(e.target.value);
      }

      return player;
    });

    this.setState({
      players: newPlayers,
    });
  }

  handleNumTurnsChange(e, userId) {
    const newPlayers = this.state.players.map((player) => {
      if (player.userId === userId) {
        player.turns = parseInt(e.target.value);
      }

      return player;
    });

    this.setState({
      players: newPlayers,
    });
  }

  handleAnswersChange(e, userId) {
    const newPlayers = this.state.players.map((player) => {
      if (player.userId === userId) {
        player.totalAnswers = parseInt(e.target.value);
      }

      return player;
    });

    this.setState({
      players: newPlayers,
    });
  }

  handleCorrectAnswersChange(e, userId) {
    const newPlayers = this.state.players.map((player) => {
      if (player.userId === userId) {
        player.correctAnswers = parseInt(e.target.value);
      }

      return player;
    });

    this.setState({
      players: newPlayers,
    });
  }

  handleClick(t) {
    const players = JSON.parse(JSON.stringify(this.state.players));
    players.forEach((player) => {
      delete player.name;
      delete player.email;
    });

    const payload = { players };

    api
      .updatePlayers(payload)
      .then(() => {
        this.setState({
          alertType: "success",
          alertMessage: t("handle-click.success"),
        });
      })
      .catch((error) => {
        console.log(error.message);
        this.setState({
          alertType: "danger",
          alertMessage: error.message,
        });
      });
  }

  render() {
    const { t } = useTranslation(undefined, { keyPrefix: "edit-save" });

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
              {this.props.params.save}
            </li>
          </ol>
          <div>
            <EditAndLogout />
          </div>
        </nav>
        <div className="text-center mt-5">
          <h1>
            {this.props.params.board} - {this.props.params.save}
          </h1>
          <div className="card my-5 mx-md-5 py-2 px-0">
            <div className="card-body px-0">
              {this.state.alertMessage.length > 0 && (
                <div
                  className={"m-4 alert alert-" + this.state.alertType}
                  role="alert"
                >
                  {this.state.alertMessage}
                </div>
              )}
              <h3 className="card-title">Tabela de jogadores</h3>
              <div className="table-responsive mt-3">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Nome</th>
                      <th scope="col">Email</th>
                      <th scope="col">Posição no tabuleiro</th>
                      <th scope="col">Número de jogadas</th>
                      <th scope="col">Pontuação</th>
                      <th scope="col">Total de respostas</th>
                      <th scope="col">Respostas corretas</th>
                      <th scope="col">% de respostas corretas</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.players.map((player, i) => {
                      const percCorrect =
                        !player.totalAnswers || player.totalAnswers === 0
                          ? "-"
                          : Math.round(
                              (player.correctAnswers / player.totalAnswers) *
                                100 *
                                100
                            ) /
                              100 +
                            "%";

                      return (
                        <tr key={player._id}>
                          <th scope="row">{i + 1}</th>
                          <td>{player.name}</td>
                          <td>{player.email}</td>
                          <td>
                            <input
                              id={"position" + player.userId}
                              className="table-input-number"
                              onChange={(e) =>
                                this.handlePositionChange(e, player.userId)
                              }
                              type="number"
                              value={player.boardPosition}
                            />
                          </td>
                          <td>
                            <input
                              id={"numTurns" + player.userId}
                              className="table-input-number"
                              onChange={(e) =>
                                this.handleNumTurnsChange(e, player.userId)
                              }
                              type="number"
                              value={player.turns}
                            />
                          </td>
                          <td>
                            <input
                              id={"points" + player.userId}
                              className="table-input-number"
                              onChange={(e) =>
                                this.handlePointsChange(e, player.userId)
                              }
                              type="number"
                              value={player.points}
                            />
                          </td>
                          <td>
                            <input
                              id={"answers" + player.userId}
                              className="table-input-number"
                              onChange={(e) =>
                                this.handleAnswersChange(e, player.userId)
                              }
                              type="number"
                              value={player.totalAnswers}
                            />
                          </td>
                          <td>
                            <input
                              id={"correctAnswers" + player.userId}
                              className="table-input-number"
                              onChange={(e) =>
                                this.handleCorrectAnswersChange(
                                  e,
                                  player.userId
                                )
                              }
                              type="number"
                              value={player.correctAnswers}
                            />
                          </td>
                          <td>{percCorrect}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <button
                className="btn btn-lg btn-outline-success mt-3"
                onClick={() => this.handleClick(t)}
              >
                Guardar alterações
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withParams(EditSave);
