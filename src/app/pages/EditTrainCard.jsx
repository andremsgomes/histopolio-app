import React, { Component } from "react";

import api from "../api";
import { Link, useParams } from "react-router-dom";

import EditAndLogout from "../components/EditAndLogout";
import TrainCardForm from "../components/TrainCardForm";

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

  componentDidMount() {
    api
      .card(this.props.params.id)
      .then((res) => {
        this.setState({
          info: res.data.info,
          content: res.data.content,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

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

    const id = this.props.params.id;
    const info = this.state.info;
    const content = this.state.content;

    const payload = { id, info, content };

    api
      .updateTrainCard(payload)
      .then(() => {
        window.location.href = `/admin/${this.props.params.board}/${this.props.params.tile}/train_cards`;
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
              Casa {this.props.params.tile}
            </li>
            <li className="breadcrumb-item" aria-current="page">
              <Link
                to={`/admin/${this.props.params.board}/${this.props.params.tile}/train_cards`}
                className="text-decoration-none"
              >
                Cartas de treino
              </Link>
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
          <h1>
            {this.props.params.board} - Casa {this.props.params.tile}
          </h1>
          <div className="card my-5 mx-md-5 py-2 px-0">
            <div className="card-body px-0">
              <h3 className="card-title">Editar carta</h3>
              <TrainCardForm
                onInfoChange={this.handleInfoChange}
                info={this.state.info}
                onContentChange={this.handleContentChange}
                content={this.state.content}
                onClick={this.handleClick}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withParams(NewTrainCard);
