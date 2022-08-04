import { StartForm } from "./cmps/start-form";
import { AppHome } from "./pages/app-home";
import { DrawApp } from "./pages/draw-app";
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
  {
    path: "/start",
    element: <StartForm />,
    id: 3,
  },
];

export default routes;
