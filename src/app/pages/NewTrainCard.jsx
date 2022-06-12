import React, { Component } from "react";

import api from "../api";
import { useParams } from "react-router-dom";
import TrainCard from "../components/TrainCard";

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

class NewTrainCard extends Component {
  constructor(props) {
    super(props);

    this.handleInfoChange = this.handleInfoChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  state = {
    info: "",
    content: "",
  };

  handleInfoChange(e) {
    this.setState({
      info: e.target.value,
    });
  }

  handleContentChange(e) {
    this.setState({
      content: e.target.value,
    });
  }

  handleClick() {
    // TODO: validar tudo

    const boardName = this.props.params.board;
    const boardPosition = parseInt(this.props.params.tile);
    const info = this.state.info;
    const content = this.state.content;

    const payload = { boardName, boardPosition, info, content };

    api
      .newTrainCard(payload)
      .then(() => {
        window.location.href = `/admin/${this.props.params.board}/${this.props.params.tile}/train_cards`;
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  render() {
    return (
      <TrainCard
        onInfoChange={this.handleInfoChange}
        info={this.state.info}
        onContentChange={this.handleContentChange}
        content={this.state.content}
        onClick={this.handleClick}
      />
    );
  }
}

export default withParams(NewTrainCard);
