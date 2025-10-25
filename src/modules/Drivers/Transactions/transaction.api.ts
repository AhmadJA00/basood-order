import { HTTP } from "../../../axios";
import type { LoaderFunctionArgs } from "react-router-dom";
import helpers from "../../../helpers";
import axios from "axios";
import type { LoaderGetFuncType } from "../../../gloabal.type";

export async function getTransaction({
  queryOBJ,
  id,
  signal,
}: LoaderGetFuncType) {
  const urlSearchParams = queryOBJ ? helpers.queryValidation(queryOBJ) : {};

  let url = "/Transaction?";
  if (id) {
    url = `/Transaction/${id}`;
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

export async function getCustomerTransaction(signal: AbortSignal) {
  {
    const response = await HTTP.get("/Transaction/ListTransactionToCustomer", {
      signal,
    });
    return response.data;
  }
}
export async function postTransaction<T>(data: T) {
  {
    const request = await HTTP.post("/Transaction", data);
    return request;
  }
}
export async function putTransaction<T>(data: T, id: string) {
  {
    const request = await HTTP.put(`/Transaction/${id}`, data);
    return request;
  }
}
export async function deleteTransaction(id: string) {
  {
    const request = await HTTP.put(`/Transaction/DisableEnable/${id}`);
    return request;
  }
}
export async function createTransactionAccount(id: string) {
  {
    const request = await HTTP.post(`/Transaction/CreateUser/${id}`);
    return request;
  }
}
export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const pageSize = url.searchParams.get("pageSize") || "";
  const currentPage = url.searchParams.get("currentPage") || "";
  const currentOrderBy = url.searchParams.get("currentOrderBy") || "";
  const isAscending = url.searchParams.get("isAscending") || "";
  const search = url.searchParams.get("search") || "";

  return await getTransaction({
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
