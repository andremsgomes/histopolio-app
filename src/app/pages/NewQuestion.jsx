import React, { useState } from "react";

import api from "../api";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import QuestionForm from "../components/QuestionForm";
import EditAndLogout from "../components/EditAndLogout";

function NewQuestion() {
  const { t } = useTranslation(undefined, { keyPrefix: "new-question" });
  const { board, tile } = useParams();

  const [question, setQuestion] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [answers, setAnswers] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [correctAnswer, setCorrectAnswer] = useState(1);

  const handleImageChange = (files) => {
    const imageFile = files[0];
    setImage(imageFile);
    setPreview(URL.createObjectURL(imageFile));
  };

  const handleAnswerChange = (e, i) => {
    let newAnswers = [...answers];
    newAnswers[i] = e.target.value;

    setAnswers(newAnswers);
  };

  const handleSelectChange = (e) => {
    setCorrectAnswer(parseInt(e.target.value));
  };

  const handleClick = async () => {
    // TODO: validar tudo
    const boardPosition = parseInt(tile);
    let finalAnswers = [];

    answers.forEach((answer) => {
      if (answer.length > 0) finalAnswers.push(answer);
    });

    const payload = new FormData();

    if (image && preview.length > 0) {
      const response = await fetch(preview);
      const blob = await response.blob();
      payload.append("image", blob, image.name);
    }

    payload.append("boardName", board);
    payload.append("boardPosition", boardPosition);
    payload.append("question", question);
    payload.append("answers", JSON.stringify(finalAnswers));
    payload.append("correctAnswer", correctAnswer);

    api
      .newQuestion(payload)
      .then(() => {
        window.location.href = `/admin/${board}/${tile}/questions`;
      })
      .catch((error) => {
        console.log(error.message);
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
          <li className="breadcrumb-item" aria-current="page">
            <Link
              to={`/admin/${board}/${tile}/questions`}
              className="text-decoration-none"
            >
              {t("breadcrumbs.questions")}
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {t("breadcrumbs.new-question")}
          </li>
        </ol>
        <div>
          <EditAndLogout />
        </div>
      </nav>
      <div className="text-center mt-5">
        <h1>
          {t("title", {
            board: board,
            tile: tile,
          })}
        </h1>
        <div className="card my-5 mx-md-5 py-2 px-0">
          <div className="card-body px-0">
            <h3 className="card-title">{t("subtitle")}</h3>
            <QuestionForm
              onQuestionChange={setQuestion}
              question={question}
              onImageChange={handleImageChange}
              preview={preview}
              answers={answers}
              onAnswerChange={handleAnswerChange}
              correctAnswer={correctAnswer}
              onSelectChange={handleSelectChange}
              onClick={handleClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewQuestion;
