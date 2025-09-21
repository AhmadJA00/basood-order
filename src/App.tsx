import React from "react";
import "./App.css";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import "../src/i18next/i18n.ts";

import NotFound from "./components/NotFound.tsx";
import RenderRoute from "./components/RenderRoute.tsx";
import AdminLayout from "./components/AdminLayout.tsx";
import AuthProvider from "./providers/AuthProvider.tsx";
import { NotificationProvider } from "./context/NotificationContext.tsx";
import ThemeProvider from "./context/ThemeContext.tsx";
import Dashboard from "./pages/Dashboard.tsx";

const Login = React.lazy(() => import("./components/Login.tsx"));
const Business = React.lazy(() => import("./modules/Businesses/Business.tsx"));
const BusinessCreate = React.lazy(
  () => import("./modules/Businesses/BusinessCreate.tsx")
);
const BusinessShow = React.lazy(
  () => import("./modules/Businesses/BusinessShow.tsx")
);

function App() {
  const routes = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        {/* Root route with AdminLayout */}
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="business">
            <Route index element={<RenderRoute element={<Business />} />} />
            <Route
              path="create"
              element={<RenderRoute element={<BusinessCreate />} />}
            />
            <Route
              path="edit/:id"
              element={<RenderRoute element={<BusinessCreate />} />}
            />
            <Route
              path=":id"
              element={<RenderRoute element={<BusinessShow />} />}
            />
          </Route>
        </Route>

        {/* Login route outside the layout */}
        <Route path="login" element={<RenderRoute element={<Login />} />} />

        {/* Catch-all route */}
        <Route path="*" element={<NotFound backURL="/business" />} />
      </Route>
    )
  );

  return (
    <AuthProvider>
      <NotificationProvider>
        <ThemeProvider>
          <RouterProvider router={routes} />
        </ThemeProvider>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;
