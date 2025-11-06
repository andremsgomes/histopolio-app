import React, { Component } from "react";

import { Link } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";

import EditAndLogout from "../components/EditAndLogout";

class Rules extends Component {
  render() {
    const { t } = useTranslation(undefined, { keyPrefix: "rules" });

    return (
      <div>
        <nav
          aria-label="breadcrumb"
          className="navbar navbar-light bg-white px-4"
        >
          <ol className="breadcrumb m-0">
            <li className="breadcrumb-item" aria-current="page">
              <Link to="/" className="text-decoration-none">
                {t("breadcrumbs.menu")}
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {t("breadcrumbs.rules")}
            </li>
          </ol>
          <div>
            <EditAndLogout />
          </div>
        </nav>
        <div className="text-center mt-5">
          <h1>{t("title")}</h1>
          <div className="card my-5 mx-md-5 py-2 px-0">
            <div className="card-body px-5">
              <h3 className="card-title mb-3">{t("turn-system.title")}</h3>
              <p className="card-text text-start mb-1">
                {t("turn-system.paragraph-1")}
              </p>
              <p className="card-text text-start mb-0">
                {t("turn-system.paragraph-2")}
              </p>
            </div>
          </div>
          <div className="card my-5 mx-md-5 py-2 px-0">
            <div className="card-body px-5">
              <h3 className="card-title mb-3">{t("your-turn.title")}</h3>
              <p className="card-text text-start mb-2">
                {t("your-turn.paragraph-1")}
              </p>
              <p className="card-text text-start mb-1">
                {t("your-turn.paragraph-2")}
              </p>
              <p className="card-text text-start mb-0">
                {t("your-turn.paragraph-3")}
              </p>
              <div className="my-3 mx-md-5">
                <img
                  src="/tile-types.png"
                  alt="types of tiles"
                  style={{
                    objectFit: "fit",
                    width: "80%",
                  }}
                />
              </div>
              <ul>
                <li className="text-start">
                  <Trans i18nKey="rules.your-turn.tiles.question-tile">
                    <span className="fw-bold"></span>
                  </Trans>
                </li>
                <li className="text-start">
                  <Trans i18nKey="rules.your-turn.tiles.senate-decisions">
                    <span className="fw-bold"></span>
                  </Trans>
                </li>
                <li className="text-start">
                  <Trans i18nKey="rules.your-turn.tiles.unlucky-tile">
                    <span className="fw-bold"></span>
                  </Trans>
                </li>
                <li className="text-start">
                  <Trans i18nKey="rules.your-turn.tiles.train-station">
                    <span className="fw-bold"></span>
                  </Trans>
                </li>
                <li className="text-start">
                  <Trans i18nKey="rules.your-turn.tiles.chance">
                    <span className="fw-bold"></span>
                  </Trans>
                </li>
                <li className="text-start">
                  <Trans i18nKey="rules.your-turn.tiles.library">
                    <span className="fw-bold"></span>
                  </Trans>
                </li>
                <li className="text-start">
                  <Trans i18nKey="rules.your-turn.tiles.student-association">
                    <span className="fw-bold"></span>
                  </Trans>
                </li>
                <li className="text-start">
                  <Trans i18nKey="rules.your-turn.tiles.go-to-library">
                    <span className="fw-bold"></span>
                  </Trans>
                </li>
                <li className="text-start">
                  <Trans i18nKey="rules.your-turn.tiles.go">
                    <span className="fw-bold"></span>
                  </Trans>
                </li>
              </ul>
              <p className="card-text text-start mb-0">{t("your-turn.go")}</p>
            </div>
          </div>
          <div className="card my-5 mx-md-5 py-2 px-0">
            <div className="card-body px-5">
              <h3 className="card-title mb-3">{t("badges.title")}</h3>
              <p className="card-text text-start mb-1">
                {t("badges.paragraph-1")}
              </p>
              <p className="card-text text-start mb-1">
                {t("badges.paragraph-2")}
              </p>
              <p className="card-text text-start mb-0">
                {t("badges.paragraph-3")}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Rules;
