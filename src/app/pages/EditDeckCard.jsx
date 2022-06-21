import React, { Component } from "react";

import api from "../api";
import { Link, useParams } from "react-router-dom";

import EditAndLogout from "../components/EditAndLogout";
import DeckCardForm from "../components/DeckCardForm";

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

class EditDeckCard extends Component {
  constructor(props) {
    super(props);

    this.handleDeckChange = this.handleDeckChange.bind(this);
    this.handleInfoChange = this.handleInfoChange.bind(this);
    this.handlePointsChange = this.handlePointsChange.bind(this);
    this.handleActionChange = this.handleActionChange.bind(this);
    this.handleActionValueChange = this.handleActionValueChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  state = {
    deck: "community",
    info: "",
    points: 0,
    action: "none",
    actionValue: "",
  };

  componentDidMount() {
    api
      .card(this.props.params.id)
      .then((res) => {
        this.setState({
          deck: res.data.subtype,
          info: res.data.info,
          points: res.data.points,
          action: res.data.action,
          actionValue: res.data.actionValue,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleDeckChange(e) {
    this.setState({
      deck: e.target.value,
    });
  }

  handleInfoChange(e) {
    this.setState({
      info: e.target.value,
    });
  }

  handlePointsChange(e) {
    this.setState({
      points: e.target.value,
    });
  }

  handleActionChange(e) {
    this.setState({
      action: e.target.value,
    });

    this.setState({
      actionValue: "",
    });
  }

  handleActionValueChange(e) {
    this.setState({
      actionValue: e.target.value,
    });
  }

  handleClick() {
    // TODO: validar tudo

    const id = this.props.params.id;
    const deck = this.state.deck;
    const info = this.state.info;
    const points = parseInt(this.state.points);
    const action = this.state.action;
    const actionValue = this.state.actionValue;

    const payload = { id, deck, info, points, action, actionValue };

    api
      .updateDeckCard(payload)
      .then(() => {
        window.location.href = `/admin/${this.props.params.board}/deck_cards/${deck}`;
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
              Cartas
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Editar carta
            </li>
          </ol>
          <div>
            <EditAndLogout />
          </div>
        </nav>
        <div className="text-center mt-5">
          <h1>{this.props.params.board}</h1>
          <div className="card my-5 mx-md-5 py-2 px-0">
            <div className="card-body px-0">
              <h3 className="card-title">Editar carta</h3>
              <DeckCardForm
                onDeckChange={this.handleDeckChange}
                deck={this.state.deck}
                onInfoChange={this.handleInfoChange}
                info={this.state.info}
                onPointsChange={this.handlePointsChange}
                points={this.state.points}
                onActionChange={this.handleActionChange}
                action={this.state.action}
                onActionValueChange={this.handleActionValueChange}
                actionValue={this.state.actionValue}
                onClick={this.handleClick}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withParams(EditDeckCard);
