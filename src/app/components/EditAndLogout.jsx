import React from "react";

import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

function EditAndLogout() {
  const logout = () => {
    sessionStorage.removeItem("user");
    window.location.href = "/login";
  }

  return (
    <span>
      <Link
        to="/profile/edit"
        className="text-black text-decoration-none fw-bold"
      >
        <FontAwesomeIcon icon={faUser} />
      </Link>
      <Link
        to="#"
        className="text-danger text-decoration-none fw-bold"
        style={{marginLeft: "1em"}}
        onClick={logout}
      >
        <FontAwesomeIcon icon={faRightFromBracket} />
      </Link>
    </span>
  );
}

export default EditAndLogout;
