import { HTTP } from "../../axios";
import type { LoaderFunctionArgs } from "react-router-dom";
import helpers from "../../helpers";
import axios from "axios";
import type { LoaderGetFuncType } from "../../gloabal.type";

export async function getOrder({ queryOBJ, id, signal }: LoaderGetFuncType) {
  const urlSearchParams = queryOBJ ? helpers.queryValidation(queryOBJ) : {};

  let url = "/Order?";
  if (id) {
    url = `/Order/${id}`;
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

export async function postOrder<T>(data: T) {
  {
    const request = await HTTP.post("/Order", data);
    return request;
  }
}
export async function putOrder<T>(data: T, id: string) {
  {
    const request = await HTTP.put(`/Order/${id}`, data);
    return request;
  }
}
export async function putDriverAmount<T>(data: T, id: string) {
  {
    const request = await HTTP.put(
      `/DriverOrder/DriverChangeAmount/${id}`,
      data
    );
    return request;
  }
}
export async function deleteOrder(id: string) {
  {
    const request = await HTTP.put(`/Order/DisableEnable/${id}`);
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

  return await getOrder({
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
export async function assignOrderToDriver(
  driverId: string,
  orderDetailId: string
) {
  {
    const request = await HTTP.put(
      `/Order/assignOrderPendingToDriver?driverId=${driverId}&orderDEtailId=${orderDetailId}`
    );
    return request;
  }
}
export async function changeOrderStatus(id: string, status: number) {
  {
    const request = await HTTP.put(`/Order/status/${id}`, { status });
    return request;
  }
}
