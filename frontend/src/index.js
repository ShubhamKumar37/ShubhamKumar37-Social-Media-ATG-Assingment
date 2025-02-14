import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthPage, HomePage } from "./import";
import {
  ForgetPassword,
  OTPForm,
  PageNotFound,
  ResetPassword,
} from "./components";
import { Toaster } from "react-hot-toast";
import { store } from "./redux/store";

const route = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/signup", element: <AuthPage flag={false} /> },
      { path: "/login", element: <AuthPage flag={true} /> },
      { path: "/forget-password", element: <ForgetPassword /> },
      { path: "/reset-password/:token", element: <ResetPassword /> },
      { path: "/verify-email", element: <OTPForm /> },
      { path: "*", element: <PageNotFound /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Toaster />
      <RouterProvider router={route} />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
