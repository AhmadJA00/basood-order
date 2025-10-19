import type { OrderStatus, QueryValidationType } from "./gloabal.type";

const helpers = {
  getStatus: (statusNumber: number): OrderStatus | null => {
    if (statusNumber === 1) {
      return "OrderPending";
    } else if (statusNumber === 2) {
      return "DriverReceived";
    } else if (statusNumber === 3) {
      return "OfficeReceived";
    } else if (statusNumber === 4) {
      return "DriverPending";
    } else if (statusNumber === 5) {
      return "DriverPickUp";
    } else if (statusNumber === 6) {
      return "PostPone";
    } else if (statusNumber === 7) {
      return "PartiallyDelivered";
    } else if (statusNumber === 8) {
      return "Delivered";
    } else if (statusNumber === 9) {
      return "Cancelled";
    } else if (statusNumber === 10) {
      return "CancelledOfficeReceived";
    } else if (statusNumber === 11) {
      return "PartiallyCancelledOfficeReceived";
    } else if (statusNumber === 12) {
      return "CancelledDriverReceived";
    } else if (statusNumber === 13) {
      return "PartiallyCancelledDriverReceived";
    } else if (statusNumber === 14) {
      return "PaymentProcessing";
    } else if (statusNumber === 15) {
      return "PartiallyPaymentProcessing";
    } else if (statusNumber === 16) {
      return "CancelledSupplierReceived";
    } else if (statusNumber === 17) {
      return "PartiallyCancelledSupplierReceived";
    } else if (statusNumber === 18) {
      return "Completed";
    }
    return null;
  },
  orderStatus: [
    { value: 1, label: "OrderPending" },
    { value: 2, label: "DriverReceived" },
    { value: 3, label: "OfficeReceived" },
    { value: 4, label: "DriverPending" },
    { value: 5, label: "DriverPickUp" },
    { value: 6, label: "PostPone" },
    { value: 7, label: "PartiallyDelivered" },
    { value: 8, label: "Delivered" },
    { value: 9, label: "Cancelled" },
    { value: 10, label: "CancelledOfficeReceived" },
    { value: 11, label: "PartiallyCancelledOfficeReceived" },
    { value: 12, label: "CancelledDriverReceived" },
    { value: 13, label: "PartiallyCancelledDriverReceived" },
    { value: 14, label: "PaymentProcessing" },
    { value: 15, label: "PartiallyPaymentProcessing" },
    { value: 16, label: "CancelledSupplierReceived" },
    { value: 17, label: "PartiallyCancelledSupplierReceived" },
    { value: 18, label: "Completed" },
  ],
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
