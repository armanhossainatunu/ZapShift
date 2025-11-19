import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import Coverage from "../pages/Coverage/Coverage";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import PrivetRouter from "../Contexts/PrivetRouter";
import Rider from "../pages/Rider/Rider";
import SendParcel from "../pages/Send_Parce/SendParcel";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },

      {
        path: "/rider",
        element: (
          <PrivetRouter>
            <Rider></Rider>
          </PrivetRouter>
        ),
      },
      {
        path: "/send-parcel",
        element: (
          <PrivetRouter>
            <SendParcel></SendParcel>
          </PrivetRouter>
        ),
      },
      {
        path: "coverage",
        Component: Coverage,
        loader: () => fetch("/serviceCenters.json").then((res) => res.json()),
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "/auth/login",
        element: <Login></Login>,
      },
      {
        path: "/auth/signup",
        element: <Signup></Signup>,
      },
    ],
  },
]);
