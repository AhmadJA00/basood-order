import { HTTP } from "../../axios";
import type { LoaderFunctionArgs } from "react-router-dom";
import helpers from "../../helpers";
import axios from "axios";
import type { LoaderGetFuncType } from "../../gloabal.type";

export async function getSupplierOrder({
  queryOBJ,
  id,
  signal,
}: LoaderGetFuncType) {
  const urlSearchParams = queryOBJ ? helpers.queryValidation(queryOBJ) : {};

  let url = "/SupplierOrder?";
  if (id) {
    url = `/SupplierOrder/${id}`;
  }
  url = url.concat(urlSearchParams.toString());

  try {
    const response = await HTTP.get(url, { signal });
    return response.data;
  } catch (error: unkown) {
    if (axios.isCancel(error) || error.name === "CanceledError") {
      throw error;
    }
    throw error;
  }
}

export async function postSupplierOrder<T>(data: T) {
  {
    const request = await HTTP.post("/SupplierOrder", data);
    return request;
  }
}
export async function putSupplierOrder<T>(data: T, id: string) {
  {
    const request = await HTTP.put(`/SupplierOrder/${id}`, data);
    return request;
  }
}
export async function receivedOrderPending(id: string) {
  {
    const request = await HTTP.put(`/DriverOrder/ReceivedOrderPending/${id}`);
    return request;
  }
}

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const pageSize = url.searchParams.get("pageSize") || "";
  const currentPage = url.searchParams.get("currentPage") || "";
  const isAscending = url.searchParams.get("isAscending") || "";
  const search = url.searchParams.get("search") || "";

  return await getSupplierOrder({
    queryOBJ: {
      pageSize,
      currentPage,
      isAscending,
      search,
    },
    id: params.id,
    signal: request.signal,
  });
};
