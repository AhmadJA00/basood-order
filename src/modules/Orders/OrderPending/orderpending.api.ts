import axios from "axios";
import { HTTP } from "../../../axios";
import type { LoaderGetFuncType } from "../../../gloabal.type";

export async function postOrderPending<T>(data: T) {
  {
    const request = await HTTP.post("/Order/OrderPending", data);
    return request;
  }
}
export async function getSupplierOrderPending({ signal }: LoaderGetFuncType) {
  const url = "/order/SupplierOrderPending";

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
