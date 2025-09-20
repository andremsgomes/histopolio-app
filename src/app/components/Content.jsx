import React from "react";
import { useTranslation } from "react-i18next";

function Content(props) {
  const { t } = useTranslation(undefined, { keyPrefix: "content" });

  return (
    <div className="text-center page-center">
      <h2 className="mx-4">{t("card")}</h2>
      <a href={props.content} target="_blank" rel="noreferrer">
        <button
          className="btn btn-primary btn-lg continue"
          onClick={props.onContentClick}
        >
          {t("button")}
        </button>
      </a>
      <div>
        {props.rank !== 0 && (
          <h4>
            {t("rank", {
              rank: props.rank,
              suffix: getOrdinalSuffix(props.rank),
            })}
          </h4>
        )}
        <h5>
          {t("score", {
            points: props.points,
            suffix: props.points !== 1 ? "s" : "",
          })}
        </h5>
      </div>
    </div>
  );
}

export default Content;
