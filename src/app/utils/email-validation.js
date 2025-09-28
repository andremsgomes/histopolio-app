import i18n from "../../i18n";

export const isValidEmail = (email, setEmailErrorMessage) => {
  const errorMsg = i18n.t("email-validation.error-message");

  if (email.length === 0) {
    setEmailErrorMessage(errorMsg);
    return false;
  }
  if (!/\w+@\w+.\w+/.test(email)) {
    setEmailErrorMessage(errorMsg);
    return false;
  }

  return true;
};
