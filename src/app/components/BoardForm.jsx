import React from "react";
import { useTranslation  } from "react-i18next";

function BoardForm(props) {
  const { t } = useTranslation(undefined, { keyPrefix: "board-form" });

  return (
    <div className="card my-5 mx-md-5 py-2 px-0">
      <div className="card-body px-0">
        <h3 className="card-title">{props.title}</h3>
        <div className="row mx-4 mt-3">
          <div className="col-sm-12 col-md-8 col-lg-6 mx-auto">
            <div className="text-start fw-bold">
              <label for="name" class="form-label">
                {t('name')}
              </label>
              <input
                type="text"
                className="form-control"
                name="name"
                onChange={props.onNameChange}
                value={props.name}
                placeholder={t('name')}
              />
            </div>
            <div className="text-start mt-4 fw-bold">
              <label for="description" class="form-label">
                {t('description')}
              </label>
              <input
                type="text"
                className="form-control"
                name="description"
                onChange={props.onDescriptionChange}
                value={props.description}
                placeholder={t('description')}
              />
            </div>
            <div className="text-start mt-4 fw-bold">
              <label for="image" class="form-label">
                {t('image-link')}
              </label>
              <input
                type="text"
                className="form-control"
                name="image"
                onChange={props.onImageChange}
                value={props.image}
                placeholder={t('image-link')}
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
