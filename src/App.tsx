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

const BranchesList = React.lazy(
  () => import("./modules/Branches/Branch.List.tsx")
);
const BranchesCreate = React.lazy(
  () => import("./modules/Branches/Branch.Create.tsx")
);
import { loader as branchesLoader } from "./modules/Branches/branch.api.ts";

const CitiesList = React.lazy(() => import("./modules/Cities/City.List.tsx"));
const CitiesCreate = React.lazy(
  () => import("./modules/Cities/City.Create.tsx")
);
import { loader as citiesLoader } from "./modules/Cities/city.api.ts";

function App() {
  const routes = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        {/* Root route with AdminLayout */}
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="branches">
            <Route
              index
              element={<RenderRoute element={<BranchesList />} />}
              loader={branchesLoader}
            />
            <Route
              path="create"
              element={<RenderRoute element={<BranchesCreate />} />}
            />
            <Route
              path="edit/:id"
              element={<RenderRoute element={<BranchesCreate />} />}
              loader={branchesLoader}
            />
          </Route>
          <Route path="cities">
            <Route
              index
              element={<RenderRoute element={<CitiesList />} />}
              loader={citiesLoader}
            />
            <Route
              path="create"
              element={<RenderRoute element={<CitiesCreate />} />}
            />
            <Route
              path="edit/:id"
              element={<RenderRoute element={<CitiesCreate />} />}
              loader={citiesLoader}
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
