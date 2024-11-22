import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import ErrorPage from "./components/error-page/ErrorPage";
import ProductsDetails from "./components/product-details/ProductsDetails";
import LayoutSection from "./components/layout/LayoutSection";
import { Provider } from "react-redux";
import 'react-toastify/dist/ReactToastify.css';
import { store } from "./store";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutSection />,
    children: [
      {
        path: "",
        element: <App />
      },
      {
        path: "product-details/:product_id",
        element: <ProductsDetails />,
      },
    ],
    errorElement: <ErrorPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
