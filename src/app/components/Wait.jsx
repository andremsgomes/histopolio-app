import React from "react";
import { useTranslation } from "react-i18next";

function Wait(props) {
  const { t } = useTranslation(undefined, { keyPrefix: "wait" });

  return (
    <div className="text-center page-center">
      <h2 className="mx-4">{props.title}</h2>
      <div className="mt-4">
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
      {props.storeButton && (
        <button
          className="btn btn-lg btn-primary mt-4"
          onClick={props.onStoreClick}
        >
          {t('store-button')}
        </button>
      )}
    </div>
  );
}

export default Wait;
