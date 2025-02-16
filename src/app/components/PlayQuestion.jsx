import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function PlayQuestion(props) {
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState();

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
          Confirmar a seguinte resposta "
          <b>{props.question.answers[selectedAnswerIndex]}</b>"?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setSelectedAnswerIndex(undefined)}
            size="lg"
          >
            Alterar resposta
          </Button>
          <Button
            variant="primary"
            onClick={() => props.onAnswerConfirm(selectedAnswerIndex)}
            size="lg"
          >
            Confirmar resposta
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
          {props.rank !== 0 && <h4>Estás em {props.rank}º lugar</h4>}
          <h5>
            Tens {props.points} ponto{props.points !== 1 && "s"}
          </h5>
        </div>
      </div>
    </>
  );
}

export default PlayQuestion;
