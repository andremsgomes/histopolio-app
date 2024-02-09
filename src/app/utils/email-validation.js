export const isValidEmail = (email, setEmailErrorMessage) => {
  if (email.length === 0) {
    setEmailErrorMessage("Por favor introduz um email válido.");
    return false;
  } 
  if (!/\w+@\w+.\w+/.test(email)) {
    setEmailErrorMessage(
      "Por favor introduz um email válido."
    );
    return false;
  }

  return true;
};
