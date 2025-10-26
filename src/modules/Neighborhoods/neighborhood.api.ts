import { HTTP } from "../../axios";
import type { LoaderFunctionArgs } from "react-router-dom";
import helpers from "../../helpers";
import axios from "axios";
import type { LoaderGetFuncType } from "../../gloabal.type";

export async function getNeighborhood({
  queryOBJ,
  id,
  signal,
}: LoaderGetFuncType) {
  const urlSearchParams = queryOBJ ? helpers.queryValidation(queryOBJ) : {};
  let url = "/Neighborhood?";
  if (id) {
    url = `/Neighborhood/${id}`;
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
export async function getNeighborhoodByCityId({
  id,
  signal,
}: LoaderGetFuncType) {
  const url = `/Neighborhood/getByCityId/${id}`;

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

export async function postNeighborhood<T>(data: T) {
  {
    const request = await HTTP.post("/Neighborhood", data);
    return request;
  }
}
export async function putNeighborhood<T>(data: T, id: string) {
  {
    const request = await HTTP.put(`/Neighborhood/${id}`, data);
    return request;
  }
}
export async function deleteNeighborhood(id: string) {
  {
    const request = await HTTP.delete(`/Neighborhood/togglerDelete/${id}`);
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

  return await getNeighborhood({
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
