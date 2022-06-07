import React from "react";

function Question(props) {
  return (
    <div className="row m-4">
      <div className="col-sm-12 col-md-8 col-lg-6 mx-auto">
        <div className="form-group row">
          <label for="question" className="col-sm-2 col-form-label">
            Pergunta
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="questionInput"
              name="question"
              onChange={props.onQuestionChange}
              value={props.question}
            />
          </div>
        </div>
        <div className="form-group row mt-4">
          <label for="image" className="col-sm-2 col-form-label">
            Link da imagem
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="imageInput"
              name="image"
              onChange={props.onImageChange}
              value={props.image}
            />
          </div>
        </div>
        {props.image.length > 0 && (
          <div className="text-center mt-3">
            <img
              src={props.image}
              className="rounded"
              alt="question"
              width="100%"
            />
          </div>
        )}
        <div className="mt-4">
          {props.answers.map((answer, i) => {
            return (
              <div className="form-group row mt-3" key={i}>
                <label for={"answer" + i} className="col-sm-2 col-form-label">
                  Resposta {i + 1}
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    name={"answer" + i}
                    onChange={(e) => props.onAnswerChange(e, i)}
                    value={answer}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <div className="form-group row mt-4">
          <label for="correctAnswer" className="col-sm-2 col-form-label">
            Resposta correta
          </label>
          <div className="col-sm-10">
            <select
              class="form-select"
              name="correctAnswer"
              onChange={props.onSelectChange}
            >
              {props.answers.map((_, i) => {
                return (
                  <option selected={i === 0} value={i + 1}>
                    Resposta {i + 1}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>
      <div className="text-center mt-4">
        <button className="btn btn-lg btn-primary" onClick={props.onClick}>
          Guardar pergunta
        </button>
      </div>
    </div>
  );
}

export default Question;
