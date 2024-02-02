export const isValidEmail = (email, setEmailErrorMessage) => {
  if (email.length === 0) {
    setEmailErrorMessage("Por favor introduz um email válido.");
    return false;
  } 
  if (!/\w*@edu.up.pt/.test(email)) {
    setEmailErrorMessage(
      "Por favor introduz um email válido (formato: utilizador@edu.up.pt)."
    );
    return false;
  }

  return true;
};
