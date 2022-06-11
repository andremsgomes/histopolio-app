import React, { Component } from "react";

import api from "../api";
import { useParams } from "react-router-dom";
import DeckCard from "../components/DeckCard";

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

class NewDeckCard extends Component {
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

    const boardName = this.props.params.board;
    const deck = this.state.deck;
    const info = this.state.info;
    const points = parseInt(this.state.points);
    const action = this.state.action;
    const actionValue = this.state.actionValue;

    const payload = { boardName, deck, info, points, action, actionValue };

    api
      .newDeckCard(payload)
      .then(() => {
        window.location.href = `/admin/${this.props.params.board}/deck_cards/${deck}`;
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  render() {
    return (
      <DeckCard
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
    );
  }
}

export default withParams(NewDeckCard);
