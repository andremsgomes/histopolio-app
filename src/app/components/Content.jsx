import React from "react";

function Content(props) {
  return (
    <div className="text-center page-center">
      <h2 className="mx-4">Vê a carta que te saíu no ecrã de jogo!</h2>
      <a href={props.content} target="_blank" rel="noreferrer">
        <button
          className="btn btn-primary btn-lg continue"
          onClick={props.onContentClick}
        >
          Ver conteúdo
        </button>
      </a>
      <div>
        {props.rank !== 0 && <h4>Estás em {props.rank}º lugar</h4>}
        <h5>
          Tens {props.points} ponto{props.points !== 1 && "s"}
        </h5>
      </div>
    </div>
  );
}

export default Content;
