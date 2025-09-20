import React from "react";
import { useTranslation } from "react-i18next";

function Store(props) {
  const { t } = useTranslation(undefined, { keyPrefix: "store" });

  return (
    <div className="text-center store">
      <h2 className="mt-4">{t("title")}</h2>
      <h5>
        {t("score", {
          points: props.points,
          suffix: props.points !== 1 ? "s" : "",
        })}
      </h5>
      <div className="row justify-content-center m-4">
        {props.badges.map((badge) => {
          return (
            <div className="col-sm-12 col-md-6 col-lg-3">
              <div className="card m-2 p-3">
                <img
                  src={badge.image}
                  className="card-img-top"
                  style={{ objectFit: "cover", width: "100%", height: "450px" }}
                  alt={"badge" + badge._id}
                />
                <div className="card-body">
                  <h5 class="card-title">{badge.name}</h5>
                  <p className="card-text mb-1 mt-3">
                    <Trans
                      i18nKey="store.multiplier"
                      values={{
                        multiplier: badge.multiplier,
                      }}
                    >
                      <b />
                    </Trans>
                  </p>
                  <p className="card-text mb-0">
                    <Trans
                      i18nKey="store.price"
                      values={{
                        price: badge.cost,
                        suffix: badge.cost !== 1 ? "s" : "",
                      }}
                    >
                      <b />
                    </Trans>
                  </p>
                  {props.userBadges.find(
                    (userBadge) => userBadge === badge._id
                  ) ? (
                    <p className="card-text mt-4 mb-4 fw-bold">
                      {t("purchased")}
                    </p>
                  ) : (
                    <button
                      className="btn btn-primary mt-4 purchase-button"
                      disabled={badge.cost > props.points}
                      onClick={() =>
                        props.onPurchaseClick(badge._id, badge.cost)
                      }
                    >
                      {t("buy")}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <button
        className="btn btn-lg btn-primary my-4"
        onClick={props.onCloseClick}
      >
        {t("back-button")}
      </button>
    </div>
  );
}

export default Store;
