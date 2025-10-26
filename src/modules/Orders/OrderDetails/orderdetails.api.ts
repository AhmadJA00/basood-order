import type { LoaderFunctionArgs } from "react-router-dom";
import axios from "axios";
import helpers from "../../../helpers";
import type { LoaderGetFuncType } from "../../../gloabal.type";
import { HTTP } from "../../../axios";

export async function getOrderDetails({ queryOBJ, signal }: LoaderGetFuncType) {
  const urlSearchParams = queryOBJ ? helpers.queryValidation(queryOBJ) : {};
  let url = "/Order/OrderReport?";

  url = url.concat(urlSearchParams.toString());

  try {
    const response = await HTTP.get(url, { signal });
    return response.data;
  } catch (error: unknown) {
    if (axios.isCancel(error) || error.name === "CanceledError") {
      throw error;
    }
    throw error;
  }
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const pageSize = url.searchParams.get("pageSize") || "";
  const currentPage = url.searchParams.get("currentPage") || "";
  const currentOrderBy = url.searchParams.get("currentOrderBy") || "";
  const isAscending = url.searchParams.get("isAscending") || "";
  const search = url.searchParams.get("search") || "";
  const supplierId = url.searchParams.get("supplierId") || "";
  const driverId = url.searchParams.get("driverId") || "";
  const status = url.searchParams.get("status") || "";
  const fromDate = url.searchParams.get("fromDate") || "";
  const toDate = url.searchParams.get("toDate") || "";

  return await getOrderDetails({
    queryOBJ: {
      pageSize,
      currentPage,
      currentOrderBy,
      isAscending,
      search,
      supplierId,
      driverId,
      status,
      fromDate,
      toDate,
    },
    signal: request.signal,
  });
};
