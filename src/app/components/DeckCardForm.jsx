import React from "react";
import { useTranslation  } from "react-i18next";

function DeckCardForm(props) {
  const { t } = useTranslation(undefined, { keyPrefix: "deck-card-form" });

  return (
    <div className="row m-4">
      <div className="col-sm-12 col-md-8 col-lg-6 mx-auto">
        <div className="text-start fw-bold">
          <label for="deck" className="form-label">
            {t('deck.label')}
          </label>
          <select class="form-select" name="deck" onChange={props.onDeckChange}>
            <option selected={props.deck === "community"} value="community">
              {t('deck.community-option')}
            </option>
            <option selected={props.deck === "chance"} value="chance">
              {t('deck.chance-option')}
            </option>
          </select>
        </div>
        <div className="text-start fw-bold mt-4">
          <label for="info" className="form-label">
            {t('description.label')}
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
          <label for="points" className="form-label">
            {t('points.label')}
          </label>
          <input
            type="number"
            className="form-control"
            id="pointsInput"
            name="points"
            onChange={props.onPointsChange}
            value={props.points}
          />
        </div>
        <div className="text-start fw-bold mt-4">
          <label for="action" className="form-label">
            {t('action.label')}
          </label>
          <select
            class="form-select"
            name="action"
            onChange={props.onActionChange}
          >
            <option selected={props.action === "none"} value="none">
              {t('action.none-option')}
            </option>
            <option selected={props.action === "move"} value="move">
              {t('action.move-option')}
            </option>
            <option selected={props.action === "tile"} value="tile">
              {t('action.tile-option')}
            </option>
          </select>
        </div>
        {props.action !== "none" && (
          <div className="text-start fw-bold mt-4">
            <label for="actionValue" className="form-label">
              {props.action === "move" ? (
                <div>{t('action-value.move')}</div>
              ) : (
                <div>{t('action-value.tile')}</div>
              )}
            </label>
            <input
              type="number"
              className="form-control"
              id="actionValueInput"
              name="actionValue"
              onChange={props.onActionValueChange}
              value={props.actionValue}
            />
          </div>
        )}
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

export default DeckCardForm;
