import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const login = (payload) => api.post("/api/auth/login", payload);
export const signup = (payload) => api.post("/api/auth/signup", payload);
export const saves = (board) => api.get(`/api/game/data/${board}/saves`);
export const board = (board) => api.get(`/api/game/data/${board}`);
export const questions = (board, tile) =>
  api.get(`/api/game/data/${board}/${tile}/questions`);
export const players = (board, save) =>
  api.get(`/api/game/data/${board}/saves/${save}`);
export const playerData = (board, userId) =>
  api.get(`/api/game/data/${board}/players/${userId}`);
export const updatePlayers = (payload) =>
  api.post("api/game/data/save/update", payload);
export const updateBoard = (payload) =>
  api.post("api/game/data/board/update", payload);
export const newQuestion = (payload) =>
  api.post("api/game/data/questions/new", payload);
export const deckCards = (board, deck) =>
  api.get(`/api/game/data/${board}/deck_cards/${deck}`);
export const newDeckCard = (payload) =>
  api.post("api/game/data/cards/deck/new", payload);
export const trainCards = (board, tile) =>
  api.get(`/api/game/data/${board}/${tile}/train_cards`);
export const newTrainCard = (payload) =>
  api.post("api/game/data/cards/train_cards/new", payload);
export const badges = (board) => api.get(`/api/game/data/${board}/badges`);
export const newBadge = (payload) =>
  api.post("/api/game/data/badges/new", payload);

const apiRoutes = {
  login,
  signup,
  saves,
  board,
  questions,
  players,
  playerData,
  updatePlayers,
  updateBoard,
  newQuestion,
  deckCards,
  newDeckCard,
  trainCards,
  newTrainCard,
  badges,
  newBadge,
};

export default apiRoutes;
