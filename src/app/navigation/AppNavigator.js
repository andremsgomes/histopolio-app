import React from "react";

import { Route, Routes, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import Play from "../pages/Play";
import PlayerSaves from "../pages/PlayerSaves";

function AppNavigator() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:board/saves" element={<PlayerSaves />} />
      <Route path="/:board/play" element={<Play />} />
      <Route path="/*" element={<Navigate replace to="/" />} />
    </Routes>
  );
}

export default AppNavigator;
