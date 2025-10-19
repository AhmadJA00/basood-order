import { HTTP } from "../../axios";
import type { LoaderFunctionArgs } from "react-router-dom";
import helpers from "../../helpers";
import type { LoaderGetFuncType } from "../../gloabal.type";
import axios from "axios";

export async function getSupplier({ queryOBJ, id, signal }: LoaderGetFuncType) {
  const urlSearchParams = queryOBJ ? helpers.queryValidation(queryOBJ) : {};

  let url = "/Supplier?";
  if (id) {
    url = `/Supplier/${id}`;
  }
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

export async function postSupplier<T>(data: T) {
  {
    const request = await HTTP.post("/Supplier", data);
    return request;
  }
}
export async function putSupplier<T>(data: T, id: string) {
  {
    const request = await HTTP.put(`/Supplier/${id}`, data);
    return request;
  }
}
export async function deleteSupplier(id: string) {
  {
    const request = await HTTP.delete(`/Supplier/togglerDelete/${id}`);
    return request;
  }
}
export async function createSupplierAccount(id: string) {
  {
    const request = await HTTP.post(`/Supplier/CreateUser/${id}`);
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

  return await getSupplier({
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
