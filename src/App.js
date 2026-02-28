import "./App.css";
import React from "react";

import RootNavigator from "./app/navigation/RootNavigator";

import i18n from "./i18n";

function App() {
  i18n.changeLanguage("pt");
  return (
    <RootNavigator />
  );
}

export default App;
