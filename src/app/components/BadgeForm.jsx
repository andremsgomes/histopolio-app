import React from "react";

function BadgeForm(props) {
  return (
    <div className="row m-4">
      <div className="col-sm-12 col-md-8 col-lg-6 mx-auto">
        <div className="text-start fw-bold">
          <label for="name" className="form-label">
            Nome
          </label>
          <input
            type="text"
            className="form-control"
            id="nameInput"
            name="name"
            onChange={props.onNameChange}
            value={props.name}
          />
        </div>
        <div className="text-start fw-bold mt-4">
          <label for="image" className="form-label">
            Link da imagem
          </label>
          <input
            type="text"
            className="form-control"
            id="imageInput"
            name="image"
            onChange={props.onImageChange}
            value={props.image}
          />
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
        <div className="text-start fw-bold mt-4">
          <label for="multiplier" className="form-label">
            Multiplicador
          </label>
          <input
            type="number"
            className="form-control"
            id="multiplierInput"
            name="multiplier"
            onChange={props.onMultiplierChange}
            value={props.multiplier}
          />
        </div>
        <div className="text-start fw-bold mt-4">
          <label for="cost" className="form-label">
            Custo (pontos)
          </label>
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
      <div className="text-center">
        <button
          className="btn btn-lg btn-outline-success mt-3"
          onClick={props.onClick}
        >
          Guardar troféu
        </button>
      </div>
    </div>
  );
}

export default BadgeForm;
