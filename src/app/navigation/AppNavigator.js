import React from "react";

import { Route, Routes, Navigate } from "react-router-dom";

import PlayerMenu from "../pages/PlayerMenu";
import GameController from "../pages/GameController";
import PlayerSaves from "../pages/PlayerSaves";
import EditProfile from "../pages/EditProfile";

function AppNavigator() {
  return (
    <Routes>
      <Route path="/" element={<PlayerMenu />} />
      <Route path="/profile/edit" element={<EditProfile />} />
      <Route path="/:board/saves" element={<PlayerSaves />} />
      <Route path="/:board/play" element={<GameController />} />
      <Route path="/*" element={<Navigate replace to="/" />} />
    </Routes>
  );
}

export default AppNavigator;
