import { useTranslation } from "react-i18next";

export const isValidEmail = (email, setEmailErrorMessage) => {
  const { t } = useTranslation(undefined, { keyPrefix: "email-validation" });

  if (email.length === 0) {
    setEmailErrorMessage(t("error-message"));
    return false;
  }
  if (!/\w+@\w+.\w+/.test(email)) {
    setEmailErrorMessage(t("error-message"));
    return false;
  }

  return true;
};
