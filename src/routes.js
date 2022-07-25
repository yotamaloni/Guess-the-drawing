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
    path: "/:gameId/:type",
    element: <DrawApp />,
    id: 2,
  },
  // {
  //   path: "/:gameId/:type",
  //   element: <GuessApp />,
  //   id: 3,
  // },
];

export default routes;
