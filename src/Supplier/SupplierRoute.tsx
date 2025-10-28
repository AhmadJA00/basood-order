import { Route } from "react-router";
import RenderRoute from "../components/RenderRoute";
import Home from "./pages/home";
import Layout from "./Layout";

import { homeLoader as supplierHomeLoader } from "../Supplier/supplierside.api";
import { orderByStatusLoader as supplierOrderByStatusLoader } from "../Supplier/supplierside.api";
import { balanceLoader } from "../Supplier/supplierside.api";
import OrderStatus from "./pages/OrderStatus";
import Balance from "./pages/balance";
import React from "react";

const SupplierOrdersCreate = React.lazy(
  () => import("../modules/SupplierOrders/supplierorders.create")
);

export const SupplierRoutes = (
  <Route path="supplier-side" element={<Layout />}>
    <Route
      index
      element={<RenderRoute element={<Home />} />}
      loader={supplierHomeLoader}
    />
    <Route
      path="orders"
      element={<RenderRoute element={<OrderStatus />} />}
      loader={supplierOrderByStatusLoader}
    />
    <Route
      path="balance"
      element={<RenderRoute element={<Balance />} />}
      loader={balanceLoader}
    />
    <Route
      path="create"
      element={<RenderRoute element={<SupplierOrdersCreate />} />}
      loader={balanceLoader}
    />
  </Route>
);
