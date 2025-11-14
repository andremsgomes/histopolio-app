import React, { useState, useEffect } from "react";

import api from "../api";
import EditAndLogout from "../components/EditAndLogout";

import { Link, useParams } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

function EditQuestions() {
  const { t } = useTranslation(undefined, { keyPrefix: "edit-questions" });
  const { board, tile } = useParams();

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    api
      .questions(board, tile)
      .then((res) => {
        setQuestions(res.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [board, tile]);

  const handleDelete = (questionId) => {
    api.deleteQuestion(questionId).then(() => {
      const newQuestions = questions.filter((question) => {
        return question._id !== questionId;
      });

      setQuestions(newQuestions);
    });
  };

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
            <Link to={`/admin/${board}`} className="text-decoration-none">
              {board}
            </Link>
          </li>
          <li className="breadcrumb-item" aria-current="page">
            <Link to={`/admin/${board}/edit`} className="text-decoration-none">
              {t("breadcrumbs.edit")}
            </Link>
          </li>
          <li className="breadcrumb-item" aria-current="page">
            {t("breadcrumbs.tile", { tile: tile })}
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {t("breadcrumbs.questions")}
          </li>
        </ol>
        <div>
          <EditAndLogout />
        </div>
      </nav>
      <div className="text-center mt-5">
        <h1>
          {t("tile", {
            board: board,
            tile: tile,
          })}
        </h1>
        <div className="card my-5 mx-md-5 py-2 px-0">
          <div className="card-body px-0">
            <h3 className="card-title">{t("subtitle")}</h3>
            <div className="table-responsive mt-3">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">{t("table.question-column.name")}</th>
                    <th scope="col">{t("table.correct-option-column.name")}</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {questions.map((question, i) => {
                    return (
                      <tr>
                        <th scope="row">{i + 1}</th>
                        <td>{question.question}</td>
                        <td>{question.answers[question.correctAnswer - 1]}</td>
                        <td>
                          <Link
                            to={`/admin/${board}/${tile}/question/${question._id}/edit`}
                          >
                            <FontAwesomeIcon icon={faPencil} />
                          </Link>
                        </td>
                        <td>
                          <Link
                            to="#"
                            className="text-danger"
                            onClick={() => handleDelete(question._id)}
                          >
                            <FontAwesomeIcon icon={faTrashCan} />
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <Link
              to={"/admin/" + board + "/" + tile + "/questions/new"}
              className="text-decoration-none"
            >
              <button className="btn btn-lg btn-primary mt-3">
                {t("create-question-button")}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditQuestions;
