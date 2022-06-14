import React from "react";

function Continue(props) {
  document.body.style = `background: ${props.bodyColor};`;

  return (
    <div className="text-center page-center">
      {props.info.length > 0 && <h2 className={`mx-4 ${props.bodyColor !== "#f8f9fa" && ("text-white")}`}>{props.info}</h2>}
      <button
        className={`btn btn-primary btn-lg continue ${props.bodyColor !== "#f8f9fa" && ("border-white")}`}
        onClick={props.onContinueClick}
      >
        Continuar
      </button>
      <div>
        {props.rank !== 0 && <h4 className={props.bodyColor !== "#f8f9fa" && ("text-white")}>Estás em {props.rank}º lugar</h4>}
        <h5 className={props.bodyColor !== "#f8f9fa" && ("text-white")}>
          Tens {props.points} ponto{props.points !== 1 && "s"}
        </h5>
      </div>
      {props.storeButton && (
        <button
          className={`btn btn-lg btn-primary mt-4 ${props.bodyColor !== "#f8f9fa" && ("border-white")}`}
          onClick={props.onStoreClick}
        >
          Comprar troféus
        </button>
      )}
    </div>
  );
}

export default Continue;
