import { httpService } from "./http.service";
import { utilService } from "./util.service";
// import { socketService } from "./socket.service";

export const gameService = {
  getGame,
  removeGame,
  getGameById,
};

async function getGame(player) {
  player.id = utilService.makeId();
  const game = await httpService.get(`game`, { player });
  return game;
}

async function removeGame(gameId) {
  const game = await httpService.delete(`game/${gameId}`);
  return game;
}

async function getGameById(gameId) {
  const game = await httpService.get(`game/${gameId}`);
  return game;
}
