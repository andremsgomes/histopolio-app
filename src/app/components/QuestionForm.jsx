import React from "react";

import Dropzone from "react-dropzone";
import styled from "styled-components";

const DropContainer = styled.div.attrs({
  className: "dropzone",
})`
  border: 1px dashed #6c757d;
  background-color: #6c757d;
  border-radius: 4px;
  cursor: pointer;
  height: 2.8rem;
  font-size: 1rem;
  display: grid;
	align-items: center;
`;

function QuestionForm(props) {
  return (
    <div className="row mx-4 mt-3">
      <div className="col-sm-12 col-md-8 col-lg-6 mx-auto">
        <div className="text-start fw-bold">
          <label for="question" className="form-label">
            Pergunta
          </label>
          <input
            type="text"
            className="form-control"
            id="questionInput"
            name="question"
            onChange={props.onQuestionChange}
            value={props.question}
          />
        </div>
        <div className="text-start fw-bold mt-4">
          <label for="image" className="form-label">
            Imagem da pergunta
          </label>
          <div className="col-6 mx-auto text-white text-center">
            <Dropzone
              accept="image/*"
              multiple={false}
              onDropAccepted={props.onImageChange}
            >
              {({ getRootProps, getInputProps }) => (
                <DropContainer {...getRootProps()}>
                  <input {...getInputProps()} name="image" />
                  Selecionar imagem
                </DropContainer>
              )}
            </Dropzone>
          </div>
        </div>
        {props.preview && props.preview.length > 0 && (
          <div className="text-center mt-3">
            <img
              src={props.preview}
              className="rounded"
              alt="question"
              width="100%"
            />
          </div>
        )}
        <div className="mt-4">
          {props.answers.map((answer, i) => {
            return (
              <div className="text-start fw-bold mt-3" key={i}>
                <label for={"answer" + i} className="form-label">
                  Resposta {i + 1}
                </label>
                <input
                  type="text"
                  className="form-control"
                  name={"answer" + i}
                  onChange={(e) => props.onAnswerChange(e, i)}
                  value={answer}
                />
              </div>
            );
          })}
        </div>
        <div className="text-start fw-bold mt-4">
          <label for="correctAnswer" className="form-label">
            Resposta correta
          </label>
          <select
            class="form-select"
            name="correctAnswer"
            onChange={props.onSelectChange}
          >
            {props.answers.map((_, i) => {
              return (
                <option selected={props.correctAnswer === i + 1} value={i + 1}>
                  Resposta {i + 1}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="text-center">
        <button
          className="btn btn-lg btn-outline-success mt-3"
          onClick={props.onClick}
        >
          Guardar pergunta
        </button>
      </div>
    </div>
  );
}

export default QuestionForm;
