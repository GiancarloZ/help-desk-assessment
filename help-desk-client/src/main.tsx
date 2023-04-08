import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import RouteLayout from "./components/RouteLayout";
import App from "./App";
import Staff from "./pages/Staff";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RouteLayout component={App} />} />
      <Route path="/staff" element={<RouteLayout component={Staff} />} />
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <>
    <RouterProvider router={router} />
  </>
);
