import { createBrowserRouter } from "react-router-dom";
import { HomeRoute } from "./pages/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    ...HomeRoute,
  },
]);
