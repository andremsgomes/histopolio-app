import React from "react";

function DeckCardForm(props) {
  return (
    <div className="row m-4">
      <div className="col-sm-12 col-md-8 col-lg-6 mx-auto">
        <div className="text-start fw-bold">
          <label for="question" className="form-label">
            Baralho
          </label>
          <select class="form-select" name="deck" onChange={props.onDeckChange}>
            <option selected={props.deck === "community"} value="community">
              Decisões do Senado
            </option>
            <option selected={props.deck === "chance"} value="chance">
              Sorte
            </option>
          </select>
        </div>
        <div className="text-start fw-bold mt-4">
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
            Pontos imediatos
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
          <label for="question" className="form-label">
            Ação
          </label>
          <select
            class="form-select"
            name="action"
            onChange={props.onActionChange}
          >
            <option selected={props.action === "none"} value="none">
              Sem ação
            </option>
            <option selected={props.action === "move"} value="move">
              Avançar
            </option>
            <option selected={props.action === "tile"} value="tile">
              Mover para casa
            </option>
          </select>
        </div>
        {props.action !== "none" && (
          <div className="text-start fw-bold mt-4">
            <label for="question" className="form-label">
              {props.action === "move" ? (
                <div>Casas a avançar (negativo para recuar)</div>
              ) : (
                <div>Casa</div>
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
          Guardar carta
        </button>
      </div>
    </div>
  );
}

export default DeckCardForm;
