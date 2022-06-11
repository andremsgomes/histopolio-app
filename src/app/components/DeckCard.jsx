import React from "react";

function DeckCard(props) {
  return (
    <div className="row m-4">
      <div className="col-sm-12 col-md-8 col-lg-6 mx-auto">
        <div className="form-group row">
          <label for="deck" className="col-sm-2 col-form-label">
            Baralho
          </label>
          <div className="col-sm-10">
            <select
              class="form-select"
              name="deck"
              onChange={props.onDeckChange}
            >
              <option
                selected={props.deck === "community"}
                value="community"
              >
                Decisão do Senado
              </option>
              <option
                selected={props.deck === "chance"}
                value="chance"
              >
                Sorte
              </option>
            </select>
          </div>
        </div>
        <div className="form-group row mt-4">
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
          <label for="points" className="col-sm-2 col-form-label">
            Pontos imediatos
          </label>
          <div className="col-sm-10">
            <input
              type="number"
              className="form-control"
              id="pointsInput"
              name="points"
              onChange={props.onPointsChange}
              value={props.points}
            />
          </div>
        </div>
        <div className="form-group row mt-4">
          <label for="action" className="col-sm-2 col-form-label">
            Ação
          </label>
          <div className="col-sm-10">
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
        </div>
        {props.action !== "none" && (
          <div className="form-group row mt-4">
            <label for="actionValue" className="col-sm-2 col-form-label">
              {props.action === "move" ? (
                <div>Casas a avançar (negativo para recuar)</div>
              ) : (
                <div>Casa</div>
              )}
            </label>
            <div className="col-sm-10">
              <input
                type="number"
                className="form-control"
                id="actionValueInput"
                name="actionValue"
                onChange={props.onActionValueChange}
                value={props.actionValue}
              />
            </div>
          </div>
        )}
      </div>
      <div className="text-center mt-4">
        <button className="btn btn-lg btn-primary" onClick={props.onClick}>
          Guardar carta
        </button>
      </div>
    </div>
  );
}

export default DeckCard;
