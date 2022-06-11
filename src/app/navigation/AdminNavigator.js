import React from "react";

import { Route, Routes, Navigate } from "react-router-dom";

import Admin from "../pages/Admin";
import EditSave from "../pages/EditSave";
import EditBoard from "../pages/EditBoard";
import EditQuestions from "../pages/EditQuestions";
import NewQuestion from "../pages/NewQuestion";
import NewDeckCard from "../pages/NewDeckCard";
import EditTrainCards from "../pages/EditTrainCards";
import EditDeckCards from "../pages/EditDeckCards";
import NewTrainCard from "../pages/NewTrainCard";
import NewBadge from "../pages/NewBadge";
import EditQuestion from "../pages/EditQuestion";
import EditDeckCard from "../pages/EditDeckCard";

function AdminNavigator() {
  return (
    <Routes>
      <Route path="/admin" element={<Admin />} />
      <Route path="/admin/:board" element={<EditBoard />} />
      <Route path="/admin/:board/:tile/questions" element={<EditQuestions />} />
      <Route path="/admin/:board/:tile/questions/new" element={<NewQuestion />} />
      <Route path="/admin/:board/:tile/question/:id/edit" element={<EditQuestion />} />
      <Route path="/admin/:board/deck_cards/:deck" element={<EditDeckCards />} />
      <Route path="/admin/:board/:tile/train_cards" element={<EditTrainCards />} />
      <Route path="/admin/:board/:tile/train_cards/new" element={<NewTrainCard />} />
      <Route path="/admin/:board/cards/deck/new" element={<NewDeckCard />} />
      <Route path="/admin/:board/cards/deck/:id/edit" element={<EditDeckCard />} />
      <Route path="/admin/:board/badges/new" element={<NewBadge />} />
      <Route path="/admin/:board/:save" element={<EditSave />} />
      <Route path="/*" element={<Navigate replace to="/admin" />} />
    </Routes>
  );
}

export default AdminNavigator;
