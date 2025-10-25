import React, { useEffect } from "react";
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
import ThemeProvider from "./context/ThemeContext.tsx";
import Dashboard from "./pages/Dashboard.tsx";

const Login = React.lazy(() => import("./pages/Login.tsx"));

const BranchesList = React.lazy(
  () => import("./modules/Branches/branch.list.tsx")
);
const BranchesCreate = React.lazy(
  () => import("./modules/Branches/branch.create.tsx")
);
import { loader as branchesLoader } from "./modules/Branches/branch.api.ts";

const CitiesList = React.lazy(() => import("./modules/Cities/city.list.tsx"));
const CitiesCreate = React.lazy(
  () => import("./modules/Cities/city.create.tsx")
);
import { loader as citiesLoader } from "./modules/Cities/city.api.ts";

const SuppliersList = React.lazy(
  () => import("./modules/Suppliers/supplier.list.tsx")
);
const SuppliersCreate = React.lazy(
  () => import("./modules/Suppliers/supplier.create.tsx")
);
import { loader as suppliersLoader } from "./modules/Suppliers/supplier.api.ts";

const SafesList = React.lazy(() => import("./modules/Safes/safe.list.tsx"));
const SafesCreate = React.lazy(() => import("./modules/Safes/safe.create.tsx"));
import { loader as safesLoader } from "./modules/Safes/safe.api.ts";

const ExpensivesList = React.lazy(
  () => import("./modules/Expensives/expensive.list.tsx")
);
const ExpensivesCreate = React.lazy(
  () => import("./modules/Expensives/expensive.create.tsx")
);
import { loader as expensivesLoader } from "./modules/Expensives/expensive.api.ts";

const TransfersList = React.lazy(
  () => import("./modules/Transfers/transfer.list.tsx")
);
const TransfersCreate = React.lazy(
  () => import("./modules/Transfers/transfer.create.tsx")
);
import { loader as transfersLoader } from "./modules/Transfers/transfer.api.ts";

const ZonesList = React.lazy(() => import("./modules/Zones/zone.list.tsx"));
const ZonesCreate = React.lazy(() => import("./modules/Zones/zone.create.tsx"));
import { loader as zonesLoader } from "./modules/Zones/zone.api.ts";

const DriversList = React.lazy(
  () => import("./modules/Drivers/driver.list.tsx")
);
const DriversCreate = React.lazy(
  () => import("./modules/Drivers/driver.create.tsx")
);
import { loader as driversLoader } from "./modules/Drivers/driver.api.ts";

const TransactionsList = React.lazy(
  () => import("./modules/Drivers/Transactions/transaction.list.tsx")
);
const TransactionsCreate = React.lazy(
  () => import("./modules/Drivers/Transactions/transaction.create.tsx")
);
import { loader as transactionsLoader } from "./modules/Drivers/Transactions/transaction.api.ts";

const EmployeesList = React.lazy(
  () => import("./modules/Employees/employee.list.tsx")
);
const EmployeesCreate = React.lazy(
  () => import("./modules/Employees/employee.create.tsx")
);
import { loader as employeesLoader } from "./modules/Employees/employee.api.ts";

const OrdersList = React.lazy(() => import("./modules/Orders/order.list.tsx"));
const OrdersCreate = React.lazy(
  () => import("./modules/Orders/order.create.tsx")
);
import { loader as ordersLoader } from "./modules/Orders/order.api.ts";

const OrderPendingCreate = React.lazy(
  () => import("./modules/Orders/OrderPending/orderpending.create.tsx")
);
const OrderDetailsList = React.lazy(
  () => import("./modules/Orders/OrderDetails/orderdetails.list.tsx")
);
import { loader as ordersDetailsLoader } from "./modules/Orders/OrderDetails/orderdetails.api.ts";

const SupplierOrdersList = React.lazy(
  () => import("./modules/SupplierOrders/supplierorders.list.tsx")
);
const SupplierOrdersCreate = React.lazy(
  () => import("./modules/SupplierOrders/supplierorders.create.tsx")
);
import { loader as supplierOrdersLoader } from "./modules/SupplierOrders/supplierorders.api.ts";

const UsersList = React.lazy(() => import("./modules/Users/user.list.tsx"));
const UsersCreate = React.lazy(() => import("./modules/Users/user.create.tsx"));
import { loader as usersLoader } from "./modules/Users/user.api.ts";

const RolesList = React.lazy(
  () => import("./modules/Users/Roles/role.list.tsx")
);
const RolesCreate = React.lazy(
  () => import("./modules/Users/Roles/role.create.tsx")
);
import { loader as rolesLoader } from "./modules/Users/Roles/role.api.ts";

import { useTranslation } from "react-i18next";
import { NotificationProvider } from "./providers/NotificationProvider.tsx";
import ErrorEle from "./components/ErrorEle.tsx";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<AdminLayout />} errorElement={<ErrorEle />}>
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
        <Route path="drivers">
          <Route
            index
            element={<RenderRoute element={<DriversList />} />}
            loader={driversLoader}
          />
          <Route
            path="create"
            element={<RenderRoute element={<DriversCreate />} />}
          />
          <Route
            path="edit/:id"
            element={<RenderRoute element={<DriversCreate />} />}
            loader={driversLoader}
          />
          <Route path="transactions">
            <Route
              index
              element={<RenderRoute element={<TransactionsList />} />}
              loader={transactionsLoader}
            />
            <Route
              path="create"
              element={<RenderRoute element={<TransactionsCreate />} />}
            />
            <Route
              path="edit/:id"
              element={<RenderRoute element={<TransactionsCreate />} />}
              loader={transactionsLoader}
            />
          </Route>
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
        <Route path="orders">
          <Route
            index
            element={<RenderRoute element={<OrdersList />} />}
            loader={ordersLoader}
          />
          <Route
            path="create"
            element={<RenderRoute element={<OrdersCreate />} />}
          />
          <Route
            path="edit/:id"
            element={<RenderRoute element={<OrdersCreate />} />}
            loader={ordersLoader}
          />
          <Route
            path="pending"
            element={<RenderRoute element={<OrderPendingCreate />} />}
          />
          <Route
            path="order-details"
            element={<RenderRoute element={<OrderDetailsList />} />}
            loader={ordersDetailsLoader}
          />
        </Route>
        <Route path="supplierOrders">
          <Route
            index
            element={<RenderRoute element={<SupplierOrdersList />} />}
            loader={supplierOrdersLoader}
          />
          <Route
            path="create"
            element={<RenderRoute element={<SupplierOrdersCreate />} />}
          />
          <Route
            path="edit/:id"
            element={<RenderRoute element={<SupplierOrdersCreate />} />}
            loader={supplierOrdersLoader}
          />
        </Route>
        <Route path="suppliers">
          <Route
            index
            element={<RenderRoute element={<SuppliersList />} />}
            loader={suppliersLoader}
          />
          <Route
            path="create"
            element={<RenderRoute element={<SuppliersCreate />} />}
          />
          <Route
            path="edit/:id"
            element={<RenderRoute element={<SuppliersCreate />} />}
            loader={suppliersLoader}
          />
        </Route>

        <Route path="accountant">
          <Route path="safes">
            <Route
              index
              element={<RenderRoute element={<SafesList />} />}
              loader={safesLoader}
            />
            <Route
              path="create"
              element={<RenderRoute element={<SafesCreate />} />}
            />
            <Route
              path="edit/:id"
              element={<RenderRoute element={<SafesCreate />} />}
              loader={safesLoader}
            />
          </Route>
          <Route path="expensives">
            <Route
              index
              element={<RenderRoute element={<ExpensivesList />} />}
              loader={expensivesLoader}
            />
            <Route
              path="create"
              element={<RenderRoute element={<ExpensivesCreate />} />}
            />
            <Route
              path="edit/:id"
              element={<RenderRoute element={<ExpensivesCreate />} />}
              loader={expensivesLoader}
            />
          </Route>
          <Route path="transfers">
            <Route
              index
              element={<RenderRoute element={<TransfersList />} />}
              loader={transfersLoader}
            />
            <Route
              path="create"
              element={<RenderRoute element={<TransfersCreate />} />}
            />
            <Route
              path="edit/:id"
              element={<RenderRoute element={<TransfersCreate />} />}
              loader={transfersLoader}
            />
          </Route>
        </Route>
        <Route path="zones">
          <Route
            index
            element={<RenderRoute element={<ZonesList />} />}
            loader={zonesLoader}
          />
          <Route
            path="create"
            element={<RenderRoute element={<ZonesCreate />} />}
          />
          <Route
            path="edit/:id"
            element={<RenderRoute element={<ZonesCreate />} />}
            loader={zonesLoader}
          />
        </Route>
        <Route path="employees">
          <Route
            index
            element={<RenderRoute element={<EmployeesList />} />}
            loader={employeesLoader}
          />
          <Route
            path="create"
            element={<RenderRoute element={<EmployeesCreate />} />}
          />
          <Route
            path="edit/:id"
            element={<RenderRoute element={<EmployeesCreate />} />}
            loader={employeesLoader}
          />
        </Route>
        <Route path="users">
          <Route
            index
            element={<RenderRoute element={<UsersList />} />}
            loader={usersLoader}
          />
          <Route
            path="create"
            element={<RenderRoute element={<UsersCreate />} />}
          />
          <Route
            path="edit/:id"
            element={<RenderRoute element={<UsersCreate />} />}
            loader={usersLoader}
          />
          <Route path="roles">
            <Route
              index
              element={<RenderRoute element={<RolesList />} />}
              loader={rolesLoader}
            />
            <Route
              path="create"
              element={<RenderRoute element={<RolesCreate />} />}
            />
            <Route
              path="edit/:id"
              element={<RenderRoute element={<RolesCreate />} />}
              loader={rolesLoader}
            />
          </Route>
        </Route>
      </Route>
      <Route path="login" element={<RenderRoute element={<Login />} />} />
      <Route path="*" element={<NotFound backURL="/" />} />
    </Route>
  )
);
function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const isRTL = ["ar", "he"].includes(i18n.language);
    document.body.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

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
