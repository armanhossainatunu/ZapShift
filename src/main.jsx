import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router/dom";
import "./index.css";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { router } from "./routes/router.jsx";
import AuthProvider from "./Contexts/AuthProvider.jsx";
import { ToastContainer } from "react-toastify";

const queryClient = new QueryClient()
createRoot(document.getElementById("root")).render(
  <StrictMode>

    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
      <ToastContainer />
    </QueryClientProvider>
  </StrictMode>
);
