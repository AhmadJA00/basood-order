import { HTTP } from "../../../axios";
import type { LoaderFunctionArgs } from "react-router-dom";
import helpers from "../../../helpers";
import axios from "axios";
import type { LoaderGetFuncType } from "../../../gloabal.type";

export async function getRole({ queryOBJ, id, signal }: LoaderGetFuncType) {
  const urlSearchParams = queryOBJ ? helpers.queryValidation(queryOBJ) : {};
  let url = "/Role?";
  if (id) {
    url = `/Role/${id}`;
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
export async function getRoleList({ signal }: LoaderGetFuncType) {
  const url = "/Role/List";

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
export async function getPermissions({ signal }: LoaderGetFuncType) {
  const url = "/Role/Permissions";

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

export async function postRole<T>(data: T) {
  {
    const request = await HTTP.post("/Role", data);
    return request;
  }
}
export async function putRole<T>(data: T, id: string) {
  {
    const request = await HTTP.put(`/Role/${id}`, data);
    return request;
  }
}
export async function deleteRole(id: string) {
  {
    const request = await HTTP.delete(`/Role/togglerDelete/${id}`);
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

  return await getRole({
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
