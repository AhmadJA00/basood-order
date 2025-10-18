import type { QueryValidationType } from "./gloabal.type";

const helpers = {
  queryValidation: (queryOBJ: QueryValidationType) => {
    const { pageSize, currentPage, currentOrderBy, isAscending, search } =
      queryOBJ;

    const urlSearchParams = new URLSearchParams();

    if (pageSize !== null && pageSize !== undefined && pageSize !== "") {
      urlSearchParams.set("pageSize", pageSize);
    }

    if (
      currentPage !== null &&
      currentPage !== undefined &&
      currentPage !== ""
    ) {
      urlSearchParams.set("Page", currentPage);
    }

    if (search !== null && search !== undefined && search !== "") {
      urlSearchParams.set("search", search);
    }
    if (
      isAscending !== null &&
      isAscending !== undefined &&
      isAscending !== ""
    ) {
      urlSearchParams.set("isAscending", isAscending);
    }
    if (
      currentOrderBy !== null &&
      currentOrderBy !== undefined &&
      currentOrderBy !== ""
    ) {
      urlSearchParams.set("currentOrderBy", currentOrderBy);
    }

    return urlSearchParams;
  },
  getCookie: (name: string) => {
    const cookieName = name + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1);
      }
      if (c.indexOf(cookieName) === 0) {
        return c.substring(cookieName.length, c.length);
      }
    }
    return "";
  },
  setCookie: (name: string, value: string) => {
    const d = new Date();
    d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
    const expires = "expires=" + d.toUTCString();

    document.cookie = `${name}=${value};` + expires + ";path=/";
  },
  paymentTerm: [
    { value: 1, label: "prePaid" },
    { value: 2, label: "loan" },
  ],
};
export default helpers;
