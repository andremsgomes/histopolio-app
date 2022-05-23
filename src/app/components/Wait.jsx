import React from "react";

function Wait(props) {
  return (
    <div className="text-center page-center">
      <h2 className="mx-4">{props.title}</h2>
      <div className="mt-4">
        {props.rank !== 0 && <h4>Estás em {props.rank}º lugar</h4>}
        <h5>
          Tens {props.points} ponto{props.points !== 1 && "s"}
        </h5>
      </div>
      {props.storeButton && (
        <button
          className="btn btn-lg btn-primary mt-4"
          onClick={props.onStoreClick}
        >
          Comprar troféus
        </button>
      )}
    </div>
  );
}

export default Wait;
