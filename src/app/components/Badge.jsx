import React from "react";

function TrainCard(props) {
  return (
    <div className="row m-4">
      <div className="col-sm-12 col-md-8 col-lg-6 mx-auto">
        <div className="form-group row">
          <label for="name" className="col-sm-2 col-form-label">
            Nome
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="nameInput"
              name="name"
              onChange={props.onNameChange}
              value={props.name}
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
        <div className="text-center mt-3">
          {props.image.length > 0 ? (
            <img
              src={props.image}
              alt="Badge"
              className="rounded-circle border"
              style={{ objectFit: "cover", width: "250px", height: "250px" }}
            />
          ) : (
            <img
              src="https://www.linkpicture.com/q/badge_9.png"
              alt="Badge"
              className="rounded-circle border"
              style={{ objectFit: "cover", width: "250px", height: "250px" }}
            />
          )}
        </div>
        <div className="form-group row mt-4">
          <label for="multiplier" className="col-sm-2 col-form-label">
            Multiplicador
          </label>
          <div className="col-sm-10">
            <input
              type="number"
              className="form-control"
              id="multiplierInput"
              name="multiplier"
              onChange={props.onMultiplierChange}
              value={props.multiplier}
            />
          </div>
        </div>
        <div className="form-group row mt-4">
          <label for="cost" className="col-sm-2 col-form-label">
            Custo (pontos)
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="costInput"
              name="cost"
              onChange={props.onCostChange}
              value={props.cost}
            />
          </div>
        </div>
      </div>
      <div className="text-center mt-4">
        <button className="btn btn-lg btn-primary" onClick={props.onClick}>
          Guardar troféu
        </button>
      </div>
    </div>
  );
}

export default TrainCard;
