import { HTTP } from "../../axios";
import type { LoaderFunctionArgs } from "react-router-dom";
import helpers from "../../helpers";

export async function getCity(queryOBJ, id) {
  const urlSearchParams = helpers.queryValidation(queryOBJ);

  let url = "/City?";
  if (id) {
    url = `/City/${id}`;
  }
  url = url.concat(urlSearchParams.toString());

  const data = HTTP.get(url).then((res) => {
    return res.data;
  });
  return data;
}

export async function getCityList(queryOBJ) {
  const urlSearchParams = helpers.queryValidation(queryOBJ);
  let url = "/City/list?".concat(urlSearchParams.toString());

  const data = HTTP.get(url).then((res) => {
    return res.data;
  });
  return data;
}

export async function postCity<T>(data: T) {
  {
    const request = await HTTP.post("/City", data);
    return request;
  }
}
export async function putCity<T>(data: T, id: string) {
  {
    const request = await HTTP.put(`/City/${id}`, data);
    return request;
  }
}
export async function deleteCity(id) {
  {
    const request = await HTTP.delete(`/City/togglerDelete/${id}`);
    return request;
  }
}
export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const pageSize = url.searchParams.get("pageSize");
  const currentPage = url.searchParams.get("currentPage");
  const currentOrderBy = url.searchParams.get("currentOrderBy");
  const isAscending = url.searchParams.get("isAscending");
  const search = url.searchParams.get("search");

  return await getCity(
    {
      pageSize,
      currentPage,
      currentOrderBy,
      isAscending,
      search,
    },
    params.id
  );
};
