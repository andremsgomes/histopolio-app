import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Trans, useTranslation } from "react-i18next";
import { getOrdinalSuffix } from "../utils/ranking";

function PlayQuestion(props) {
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState();
  const { t } = useTranslation(undefined, { keyPrefix: "play-question" });

  return (
    <>
      <Modal
        show={selectedAnswerIndex !== undefined}
        onHide={() => setSelectedAnswerIndex(undefined)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{props.question.question}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Trans
            i18nKey="play-question.confirm"
            values={{ answer: props.question.answers[selectedAnswerIndex] }}
          >
            <b />
          </Trans>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setSelectedAnswerIndex(undefined)}
            size="lg"
          >
            {t("change-button")}
          </Button>
          <Button
            variant="primary"
            onClick={() => props.onAnswerConfirm(selectedAnswerIndex)}
            size="lg"
          >
            {t("confirm-button")}
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="row m-4">
        <div className="col-sm-12 col-md-8 col-lg-6 mx-auto text-center mb-4">
          <h5>{props.tile}</h5>
          <h2>{props.question.question}</h2>
          {props.question.image.length > 0 && (
            <img
              src={props.question.image}
              className="rounded mb-4"
              alt="question"
              width="100%"
            />
          )}
          {props.question.answers.map((answer, index) => (
            <button
              className="btn btn-primary btn-lg mt-2"
              style={{ height: "100px", width: "100%" }}
              onClick={() => setSelectedAnswerIndex(index)}
            >
              {answer}
            </button>
          ))}
        </div>
        <div className="mt-4 text-center">
          {props.rank !== 0 && (
            <h4>
              {t("rank", {
                rank: props.rank,
                suffix: getOrdinalSuffix(props.rank),
              })}
            </h4>
          )}
          <h5>
            {t("score", {
              count: props.points,
            })}
          </h5>
        </div>
      </div>
    </>
  );
}

export default PlayQuestion;
