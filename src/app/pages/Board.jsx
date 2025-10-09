import React, { Component } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import api from "../api";
import EditAndLogout from "../components/EditAndLogout";

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

class Board extends Component {
  state = {
    saves: [],
  };

  componentDidMount() {
    api
      .saves(this.props.params.board)
      .then((res) => {
        this.setState({
          saves: res.data,
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  render() {
    const { t } = useTranslation(undefined, { keyPrefix: "board" });

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
            <li className="breadcrumb-item active" aria-current="page">
              {this.props.params.board}
            </li>
          </ol>
          <div>
            <EditAndLogout />
          </div>
        </nav>
        <div className="row text-center m-5">
          <div className="col-sm-12 col-md-8 col-lg-6 mx-auto">
            <h1 className="mb-5">{this.props.params.board}</h1>
            {this.state.saves.length > 0 && (
              <h3 className="mb-3">{t("saved-data.title")}</h3>
            )}
            {this.state.saves.map((save) => {
              return (
                <Link
                  to={`/admin/${this.props.params.board}/${save.name}`}
                  style={{ textDecoration: "none" }}
                  key={save._id}
                >
                  <div className="card mb-2 mx-4 p-3">
                    <div className="card-body">
                      <h4 className="card-title">{save.name}</h4>
                      <p className="card-text">
                        {t("saved-data.players", {
                          count: save.players,
                        })}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
            <Link
              to={`/admin/${this.props.params.board}/edit`}
              style={{ textDecoration: "none" }}
            >
              <button className="btn btn-lg btn-primary mt-4 mb-5">
                {t("edit")}
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default withParams(Board);
