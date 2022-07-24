import { AppHome } from "./pages/app-home";
import { DrawApp } from "./pages/draw-app";

const routes = [
  {
    path: "/",
    element: <AppHome />,
    id: 1,
  },
  {
    path: "/draw",
    element: <DrawApp />,
    id: 2,
  },
];

export default routes;
