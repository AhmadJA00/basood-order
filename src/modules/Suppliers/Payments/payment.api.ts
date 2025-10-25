import { HTTP } from "../../../axios";
import type { LoaderFunctionArgs } from "react-router-dom";
import helpers from "../../../helpers";
import axios from "axios";
import type { LoaderGetFuncType } from "../../../gloabal.type";

export async function getPayment({ queryOBJ, id, signal }: LoaderGetFuncType) {
  const urlSearchParams = queryOBJ ? helpers.queryValidation(queryOBJ) : {};

  let url = "/Payment?";
  if (id) {
    url = `/Payment/${id}`;
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

export async function postPayment<T>(data: T) {
  {
    const request = await HTTP.post("/Payment", data);
    return request;
  }
}
export async function putPayment<T>(data: T, id: string) {
  {
    const request = await HTTP.put(`/Payment/${id}`, data);
    return request;
  }
}
export async function deletePayment(id: string) {
  {
    const request = await HTTP.put(`/Payment/DisableEnable/${id}`);
    return request;
  }
}
export async function getOrderDetailBySupplierId({
  id,
  signal,
}: LoaderGetFuncType) {
  const response = await HTTP.get(`/Payment/OrderDetailSupplier/${id}`, {
    signal,
  });
  return response.data;
}

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const pageSize = url.searchParams.get("pageSize") || "";
  const currentPage = url.searchParams.get("currentPage") || "";
  const currentOrderBy = url.searchParams.get("currentOrderBy") || "";
  const isAscending = url.searchParams.get("isAscending") || "";
  const search = url.searchParams.get("search") || "";

  return await getPayment({
    queryOBJ: {
      pageSize,
      currentPage,
      currentOrderBy,
      isAscending,
      search,
    },
    id: params.id,
    signal: request.signal,
  });
};
