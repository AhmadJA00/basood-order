import { HTTP } from "../../axios";
import type { LoaderFunctionArgs } from "react-router-dom";
import helpers from "../../helpers";

export async function getBranch(queryOBJ, id) {
  const urlSearchParams = helpers.queryValidation(queryOBJ);

  let url = "/branch?";
  if (id) {
    url = `/branch/${id}`;
  }
  url = url.concat(urlSearchParams.toString());

  const data = HTTP.get(url).then((res) => {
    return res.data;
  });
  return data;
}

export async function getBranchList(queryOBJ) {
  const urlSearchParams = helpers.queryValidation(queryOBJ);
  let url = "/branch/list?".concat(urlSearchParams.toString());

  const data = HTTP.get(url).then((res) => {
    return res.data;
  });
  return data;
}

export async function postBranch<T>(data: T) {
  {
    const request = await HTTP.post("/Branch", data);
    return request;
  }
}
export async function putBranch<T>(data: T, id: string) {
  {
    const request = await HTTP.put(`/Branch/${id}`, data);
    return request;
  }
}
export async function deleteBranch(id) {
  {
    const request = await HTTP.put(`/Branch/DisableEnable/${id}`);
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

  return await getBranch(
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
