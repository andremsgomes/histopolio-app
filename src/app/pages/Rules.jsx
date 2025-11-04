import React, { Component } from "react";

import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

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
                  <span className="fw-bold">Casa de perguntas: </span>Responde a
                  uma pergunta para tentares receber os pontos indicados.
                </li>
                <li className="text-start">
                  <span className="fw-bold">Decisões do senado: </span>Faz a
                  atividade que te foi indicada na carta de Decisões do senado.
                </li>
                <li className="text-start">
                  <span className="fw-bold">Casa de azar: </span>Responde a uma
                  pergunta para tentares evitares perder os pontos indicados.
                </li>
                <li className="text-start">
                  <span className="fw-bold">Estação de treino: </span>Vê o
                  conteúdo indicado para receberes os pontos indicados.
                </li>
                <li className="text-start">
                  <span className="fw-bold">Sorte: </span>Faz a atividade que te
                  foi indicada na carta da Sorte.
                </li>
                <li className="text-start">
                  <span className="fw-bold">Biblioteca: </span>Responde a uma
                  pergunta da linha anterior para tentares receber os pontos
                  indicados.
                </li>
                <li className="text-start">
                  <span className="fw-bold">Associação de estudantes: </span>
                  Responde a uma pergunta da linha anterior para tentares
                  receber os pontos indicados.
                </li>
                <li className="text-start">
                  <span className="fw-bold">Vá para a biblioteca: </span>
                  Responde a uma pergunta para tentares evitar voltar para a
                  biblioteca.
                </li>
                <li className="text-start">
                  <span className="fw-bold">Partida: </span>Recebe os pontos
                  indicados.
                </li>
              </ul>
              <p className="card-text text-start mb-0">
                {t("go")}
              </p>
            </div>
          </div>
          <div className="card my-5 mx-md-5 py-2 px-0">
            <div className="card-body px-5">
              <h3 className="card-title mb-3">Troféus</h3>
              <p className="card-text text-start mb-1">
                Ao longo do jogo vais ter a possibilidade de comprares troféus.
                Cada troféu tem um custo e um multiplicador associado.
              </p>
              <p className="card-text text-start mb-1">
                Se tiveres pontos suficientes e comprares um troféu, o valor do
                custo do troféu é retirado dos teus pontos. Porém, a partir
                desse momento, sempre que o jogo te atribuir pontos irás receber
                os pontos multiplicados pelo valor do multiplicador associado ao
                troféu.
              </p>
              <p className="card-text text-start mb-0">
                Se tiveres mais que um troféu, apenas será considerado o
                multiplicador mais alto para multiplicar os pontos que recebes.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Rules;
