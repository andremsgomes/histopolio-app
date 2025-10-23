import React, { Component } from "react";

import api from "../api";
import EditAndLogout from "../components/EditAndLogout";
import BoardForm from "../components/BoardForm";

import { Link } from "react-router-dom";
import { useTranslation  } from "react-i18next";

class NewBoard extends Component {
  constructor(props) {
    super(props);

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  state = {
    name: "",
    description: "",
    image: "",
  };

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

  handleClick() {
    const user = JSON.parse(sessionStorage.getItem("user"));

    const payload = {
      userId: user.id,
      name: this.state.name,
      description: this.state.description,
      image: this.state.image,
    };

    api
      .newBoard(payload)
      .then(() => {
        window.location.href = "/admin";
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { t } = useTranslation(undefined, { keyPrefix: "new-board" });

    return (
      <div>
        <nav
          aria-label="breadcrumb"
          className="navbar navbar-light bg-white px-4"
        >
          <ol className="breadcrumb m-0">
            <li className="breadcrumb-item" aria-current="page">
              <Link to="/admin" className="text-decoration-none">
                {t('breadcrumbs.menu')}
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {t('breadcrumbs.new-game-board')}
            </li>
          </ol>
          <div>
            <EditAndLogout />
          </div>
        </nav>
        <div className="text-center mt-5">
          <BoardForm
            title="Novo tabuleiro"
            onNameChange={this.handleNameChange}
            name={this.state.name}
            onDescriptionChange={this.handleDescriptionChange}
            description={this.state.description}
            onImageChange={this.handleImageChange}
            image={this.state.image}
            onClick={this.handleClick}
            buttonText="Criar tabuleiro"
          />
        </div>
      </div>
    );
  }
}

export default NewBoard;
