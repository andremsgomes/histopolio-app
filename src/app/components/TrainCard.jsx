import React from "react";

function TrainCard(props) {
  return (
    <div className="row m-4">
      <div className="col-sm-12 col-md-8 col-lg-6 mx-auto">
        <div className="form-group row">
          <label for="info" className="col-sm-2 col-form-label">
            Descrição
          </label>
          <div className="col-sm-10">
            <textarea
              className="form-control"
              id="infoInput"
              name="info"
              onChange={props.onInfoChange}
              value={props.info}
              rows="3"
            />
          </div>
        </div>
        <div className="form-group row mt-4">
          <label for="content" className="col-sm-2 col-form-label">
            Link para o conteúdo
          </label>
          <div className="col-sm-10">
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
      </div>
      <div className="text-center mt-4">
        <button className="btn btn-lg btn-primary" onClick={props.onClick}>
          Guardar carta
        </button>
      </div>
    </div>
  );
}

export default TrainCard;
