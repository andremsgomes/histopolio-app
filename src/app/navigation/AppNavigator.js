import React from "react";

import { Route, Routes, Navigate } from "react-router-dom";

import PlayerMenu from "../pages/PlayerMenu";
import GameController from "../pages/GameController";
import EnterGameSession from "../pages/EnterGameSession";
import EditProfile from "../pages/EditProfile";

function AppNavigator() {
  document.body.style = "background: #f8f9fa;";

  return (
    <Routes>
      <Route path="/" element={<PlayerMenu />} />
      <Route path="/profile/edit" element={<EditProfile />} />
      <Route path="/:board/enter" element={<EnterGameSession />} />
      <Route path="/:board/play" element={<GameController />} />
      <Route path="/*" element={<Navigate replace to="/" />} />
    </Routes>
  );
}

export default AppNavigator;
