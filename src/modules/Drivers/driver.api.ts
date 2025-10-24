import { HTTP } from "../../axios";
import type { LoaderFunctionArgs } from "react-router-dom";
import helpers from "../../helpers";
import axios from "axios";
import type { LoaderGetFuncType } from "../../gloabal.type";

export async function getDriver({ queryOBJ, id, signal }: LoaderGetFuncType) {
  const urlSearchParams = queryOBJ ? helpers.queryValidation(queryOBJ) : {};

  let url = "/Driver?";
  if (id) {
    url = `/Driver/${id}`;
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

export async function getCustomerDriver(signal: AbortSignal) {
  {
    const response = await HTTP.get("/Driver/ListDriverToCustomer", { signal });
    return response.data;
  }
}
export async function postDriver<T>(data: T) {
  {
    const request = await HTTP.post("/Driver", data);
    return request;
  }
}
export async function putDriver<T>(data: T, id: string) {
  {
    const request = await HTTP.put(`/Driver/${id}`, data);
    return request;
  }
}
export async function deleteDriver(id: string) {
  {
    const request = await HTTP.put(`/Driver/DisableEnable/${id}`);
    return request;
  }
}
export async function createDriverAccount(id: string) {
  {
    const request = await HTTP.post(`/Driver/CreateUser/${id}`);
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

  return await getDriver({
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
