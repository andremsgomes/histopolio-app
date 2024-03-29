import React from "react";

function BoardForm(props) {
  return (
    <div className="card my-5 mx-md-5 py-2 px-0">
      <div className="card-body px-0">
        <h3 className="card-title">{props.title}</h3>
        <div className="row mx-4 mt-3">
          <div className="col-sm-12 col-md-8 col-lg-6 mx-auto">
            <div className="text-start fw-bold">
              <label for="name" class="form-label">
                Nome
              </label>
              <input
                type="text"
                className="form-control"
                name="name"
                onChange={props.onNameChange}
                value={props.name}
                placeholder="Nome"
              />
            </div>
            <div className="text-start mt-4 fw-bold">
              <label for="description" class="form-label">
                Descrição
              </label>
              <input
                type="text"
                className="form-control"
                name="description"
                onChange={props.onDescriptionChange}
                value={props.description}
                placeholder="Descrição"
              />
            </div>
            <div className="text-start mt-4 fw-bold">
              <label for="image" class="form-label">
                Link da imagem
              </label>
              <input
                type="text"
                className="form-control"
                name="image"
                onChange={props.onImageChange}
                value={props.image}
                placeholder="Link da imagem"
              />
            </div>
            {props.image.length > 0 && (
              <div className="text-center mt-3">
                <img
                  src={props.image}
                  className="rounded-circle border"
                  style={{
                    objectFit: "cover",
                    width: "250px",
                    height: "250px",
                  }}
                  alt="game board"
                />
              </div>
            )}
          </div>
        </div>
        <button
          className="btn btn-lg btn-outline-success mt-3"
          onClick={props.onClick}
        >
          {props.buttonText}
        </button>
      </div>
    </div>
  );
}

export default BoardForm;
