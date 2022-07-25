import { AppHome } from "./pages/app-home";
import { DrawApp } from "./pages/draw-app";
import { GuessApp } from "./pages/guess-app";
const routes = [
  {
    path: "/",
    element: <AppHome />,
    id: 1,
  },
  {
    path: "/:gameId/draw",
    element: <DrawApp />,
    id: 2,
  },
  {
    path: "/:gameId/guess",
    element: <GuessApp />,
    id: 3,
  },
];

export default routes;
