import React from "react";
import { useTranslation } from "react-i18next";

function TrainCardForm(props) {
  const { t } = useTranslation(undefined, { keyPrefix: "train-card-form" });

  return (
    <div className="row m-4">
      <div className="col-sm-12 col-md-8 col-lg-6 mx-auto">
        <div className="text-start fw-bold">
          <label for="info" className="form-label">
            {t('description')}
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
          <label for="content" className="form-label">
            {t('content-link')}
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
          {t('save-button')}
        </button>
      </div>
    </div>
  );
}

export default TrainCardForm;
