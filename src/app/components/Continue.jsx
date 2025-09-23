import React from "react";
import { useTranslation } from "react-i18next";
import { getOrdinalSuffix } from "../utils/ranking"

function Continue(props) {
  const { t } = useTranslation(undefined, { keyPrefix: "continue" });

  document.body.style = `background: ${props.bodyColor};`;

  return (
    <div className="text-center page-center">
      {props.info.length > 0 && (
        <h2 className={`mx-4 ${props.bodyColor !== "#f8f9fa" && "text-white"}`}>
          {props.info}
        </h2>
      )}
      <button
        className={`btn btn-primary btn-lg continue ${
          props.bodyColor !== "#f8f9fa" && "border-white"
        }`}
        onClick={props.onContinueClick}
      >
        {t("button")}
      </button>
      <div>
        {props.rank !== 0 && (
          <h4 className={props.bodyColor !== "#f8f9fa" && "text-white"}>
            {t("rank", {
              rank: props.rank,
              suffix: getOrdinalSuffix(props.rank),
            })}
          </h4>
        )}
        <h5 className={props.bodyColor !== "#f8f9fa" && "text-white"}>
          {t("score", {
            points: props.points,
            suffix: props.points !== 1 ? "s" : "",
          })}
        </h5>
      </div>
      {props.storeButton && (
        <button
          className={`btn btn-lg btn-primary mt-4 ${
            props.bodyColor !== "#f8f9fa" && "border-white"
          }`}
          onClick={props.onStoreClick}
        >
          {t("badges.button")}
        </button>
      )}
    </div>
  );
}

export default Continue;
