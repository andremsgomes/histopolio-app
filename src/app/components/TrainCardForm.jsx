import React from "react";

function TrainCardForm(props) {
  return (
    <div className="row m-4">
      <div className="col-sm-12 col-md-8 col-lg-6 mx-auto">
        <div className="text-start fw-bold">
          <label for="question" className="form-label">
            Descrição
          </label>
          <textarea
            className="form-control"
            id="infoInput"
            name="info"
            onChange={props.onInfoChange}
            value={props.info}
            rows="3"
          />
        </div>
        <div className="text-start fw-bold mt-4">
          <label for="question" className="form-label">
            Link para o conteúdo
          </label>
          <input
            type="text"
            className="form-control"
            id="contentInput"
            name="content"
            onChange={props.onContentChange}
            value={props.content}
          />
        </div>
      </div>
      <div className="text-center">
        <button
          className="btn btn-lg btn-outline-success mt-3"
          onClick={props.onClick}
        >
          Guardar carta
        </button>
      </div>
    </div>
  );
}

export default TrainCardForm;
