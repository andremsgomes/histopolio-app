import React, { Component } from "react";

import api from "../api";
import { useParams } from "react-router-dom";
import Badge from "../components/Badge";

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

class NewBadge extends Component {
  constructor(props) {
    super(props);

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleMultiplierChange = this.handleMultiplierChange.bind(this);
    this.handleCostChange = this.handleCostChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  state = {
    name: "",
    image: "",
    multiplier: 1,
    cost: 0,
  };

  handleNameChange(e) {
    this.setState({
      name: e.target.value,
    });
  }

  handleImageChange(e) {
    this.setState({
      image: e.target.value,
    });
  }

  handleMultiplierChange(e) {
    this.setState({
      multiplier: parseInt(e.target.value),
    });
  }

  handleCostChange(e) {
    this.setState({
      cost: parseInt(e.target.value),
    });
  }

  handleClick() {
    // TODO: validar tudo

    const boardName = this.props.params.board;
    const name = this.state.name;
    const multiplier = this.state.multiplier;
    const cost = this.state.cost;

    // image validation
    const image =
      this.state.image.length > 0
        ? this.state.image
        : "https://www.linkpicture.com/q/badge_9.png";

    const payload = { boardName, name, image, multiplier, cost };

    api
      .newBadge(payload)
      .then(() => {
        window.location.href = `/admin/${this.props.params.board}`;
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  render() {
    return (
      <Badge
        onNameChange={this.handleNameChange}
        name={this.state.name}
        onImageChange={this.handleImageChange}
        image={this.state.image}
        onMultiplierChange={this.handleMultiplierChange}
        multiplier={this.state.multiplier}
        onCostChange={this.handleCostChange}
        cost={this.state.cost}
        onClick={this.handleClick}
      />
    );
  }
}

export default withParams(NewBadge);
