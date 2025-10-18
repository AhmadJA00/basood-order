import { HTTP } from "../../../axios";

export async function postOrderPending<T>(data: T) {
  {
    const request = await HTTP.post("/Order/OrderPending", data);
    return request;
  }
}
