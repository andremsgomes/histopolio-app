import React, { Component } from "react";

import api from "../api";
import { Link, useParams } from "react-router-dom";

import EditAndLogout from "../components/EditAndLogout";
import BadgeForm from "../components/BadgeForm";

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
        window.location.href = `/admin/${this.props.params.board}/edit`;
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
              Troféus
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Novo troféu
            </li>
          </ol>
          <div>
            <EditAndLogout />
          </div>
        </nav>
        <div className="text-center mt-5">
          <h1>
            {this.props.params.board}
          </h1>
          <div className="card my-5 mx-md-5 py-2 px-0">
            <div className="card-body px-0">
              <h3 className="card-title">Novo troféu</h3>
              <BadgeForm
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
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withParams(NewBadge);
