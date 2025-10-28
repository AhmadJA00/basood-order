import axios from "axios";
import type { LoaderFunctionArgs } from "react-router";
import type { LoaderGetFuncType } from "../gloabal.type";
import { HTTP } from "../axios";
import helpers from "../helpers";

export async function getSupplierStatusTotal({ signal }: LoaderGetFuncType) {
  const url = "/Dashboard/SelfPerStatus?";

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
export const homeLoader = async ({ params, request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const pageSize = url.searchParams.get("pageSize") || "";
  const currentPage = url.searchParams.get("currentPage") || "";
  const currentOrderBy = url.searchParams.get("currentOrderBy") || "";
  const isAscending = url.searchParams.get("isAscending") || "";
  const search = url.searchParams.get("search") || "";

  return await getSupplierStatusTotal({
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
export async function getBalance({ signal }: LoaderGetFuncType) {
  const url = "/Supplier/Balance?";

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
export const balanceLoader = async ({
  params,
  request,
}: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const pageSize = url.searchParams.get("pageSize") || "";
  const currentPage = url.searchParams.get("currentPage") || "";
  const currentOrderBy = url.searchParams.get("currentOrderBy") || "";
  const isAscending = url.searchParams.get("isAscending") || "";
  const search = url.searchParams.get("search") || "";

  return await getBalance({
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

export async function getOrderByStatus({
  queryOBJ,
  signal,
}: LoaderGetFuncType) {
  const urlSearchParams = queryOBJ ? helpers.queryValidation(queryOBJ) : {};
  let url = "/Dashboard/ListSelfPerStatus?";

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
export const orderByStatusLoader = async ({
  params,
  request,
}: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const pageSize = "1000";
  const currentPage = url.searchParams.get("currentPage") || "";
  const currentOrderBy = url.searchParams.get("currentOrderBy") || "";
  const isAscending = url.searchParams.get("isAscending") || "";
  const search = url.searchParams.get("search") || "";
  const status = url.searchParams.get("status") || "";

  return await getOrderByStatus({
    queryOBJ: {
      pageSize,
      currentPage,
      currentOrderBy,
      isAscending,
      search,
      status,
    },
    id: params.id,
    signal: request.signal,
  });
};
