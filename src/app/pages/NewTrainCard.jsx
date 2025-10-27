import React, { Component } from "react";

import api from "../api";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

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
    const { t } = useTranslation(undefined, { keyPrefix: "new-train-card" });

    return (
      <div>
        <nav
          aria-label="breadcrumb"
          className="navbar navbar-light bg-white px-4"
        >
          <ol className="breadcrumb m-0">
            <li className="breadcrumb-item" aria-current="page">
              <Link to="/admin" className="text-decoration-none">
                {t("breadcrumbs.menu")}
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
                {t("breadcrumbs.edit")}
              </Link>
            </li>
            <li className="breadcrumb-item" aria-current="page">
              {t("breadcrumbs.tile", { tile: this.props.params.tile })}
            </li>
            <li className="breadcrumb-item" aria-current="page">
              <Link
                to={`/admin/${this.props.params.board}/${this.props.params.tile}/train_cards`}
                className="text-decoration-none"
              >
                {t("breadcrumbs.train-cards")}
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {t("breadcrumbs.new-card")}
            </li>
          </ol>
          <div>
            <EditAndLogout />
          </div>
        </nav>
        <div className="text-center mt-5">
          <h1>
            {t("title", {
              board: this.props.params.board,
              tile: this.props.params.tile,
            })}
          </h1>
          <div className="card my-5 mx-md-5 py-2 px-0">
            <div className="card-body px-0">
              <h3 className="card-title">{t("subtitle")}</h3>
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
