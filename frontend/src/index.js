import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthPage, HomePage } from "./import";
import { OTPForm, PageNotFound, ResetPassword } from "./components";

const route = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/signup", element: <AuthPage flag={false} /> },
      { path: "/login", element: <AuthPage flag={true} /> },
      { path: "/reset-password/:token", element: <ResetPassword /> },
      { path: "/otp", element: <OTPForm /> },
      { path: "*", element: <PageNotFound /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={route} />
  </React.StrictMode>
);

reportWebVitals();
