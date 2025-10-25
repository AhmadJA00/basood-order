import type {
  HelperFunctionErrorType,
  ObjType,
  OrderStatus,
  QueryValidationType,
} from "./gloabal.type";
import JsBarcode from "jsbarcode";

const helpers = {
  generateBarcode: (text: string) => {
    const canvas = document.createElement("canvas");
    JsBarcode(canvas, text, {
      format: "CODE128",
      displayValue: true,
      fontSize: 16,
      textMargin: 2,
      height: 30,
      width: 2,
    });
    return canvas.toDataURL("image/png");
  },
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
    { value: 1, label: "OrderPending", color: "#FFA500" },
    { value: 2, label: "DriverReceived", color: "#007BFF" },
    { value: 3, label: "OfficeReceived", color: "#0056B3" },
    { value: 4, label: "DriverPending", color: "#17A2B8" },
    { value: 5, label: "DriverPickUp", color: "#20C997" },
    { value: 6, label: "PostPone", color: "#6C757D" },
    { value: 7, label: "PartiallyDelivered", color: "#FFC107" },
    { value: 8, label: "Delivered", color: "#28A745" },
    { value: 9, label: "Cancelled", color: "#DC3545" },
    { value: 10, label: "CancelledOfficeReceived", color: "#C82333" },
    { value: 11, label: "PartiallyCancelledOfficeReceived", color: "#E4606D" },
    { value: 12, label: "CancelledDriverReceived", color: "#B21F2D" },
    { value: 13, label: "PartiallyCancelledDriverReceived", color: "#E57373" },
    { value: 14, label: "PaymentProcessing", color: "#6610F2" },
    { value: 15, label: "PartiallyPaymentProcessing", color: "#9B59B6" },
    { value: 16, label: "CancelledSupplierReceived", color: "#E74C3C" },
    {
      value: 17,
      label: "PartiallyCancelledSupplierReceived",
      color: "#F1948A",
    },
    { value: 18, label: "Completed", color: "#198754" },
  ],
  queryValidation: (queryOBJ: QueryValidationType) => {
    const {
      pageSize,
      currentPage,
      currentOrderBy,
      isAscending,
      search,
      supplierId,
      driverId,
      status,
      fromDate,
      toDate,
    } = queryOBJ;

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
    if (supplierId !== null && supplierId !== undefined && supplierId !== "") {
      urlSearchParams.set("supplierId", supplierId);
    }
    if (driverId !== null && driverId !== undefined && driverId !== "") {
      urlSearchParams.set("driverId", driverId);
    }
    if (status !== null && status !== undefined && status !== "") {
      urlSearchParams.set("status", status);
    }
    if (fromDate !== null && fromDate !== undefined && fromDate !== "") {
      urlSearchParams.set("fromDate", fromDate);
    }
    if (toDate !== null && toDate !== undefined && toDate !== "") {
      urlSearchParams.set("toDate", toDate);
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
  getErrorObjectKeyValue: (obj: ObjType) => {
    const errArray: HelperFunctionErrorType[] = [];
    for (const [key, value] of Object.entries(obj)) {
      if (Array.isArray(value)) {
        value.forEach((errorValue) => {
          let errorMessage = "";

          if (typeof errorValue === "object" && errorValue !== null) {
            const nestedErrors = Object.values(errorValue);
            errorMessage =
              nestedErrors.length > 0
                ? String(nestedErrors[0])
                : "Unknown Error";
          } else {
            errorMessage = String(errorValue);
          }

          errArray.push({
            label: key,
            error: errorMessage,
          });
        });
      }
    }
    return errArray;
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
  payerType: [
    { value: 1, label: "SendByDriver" },
    { value: 2, label: "ReceivedAtOffice" },
  ],
};
export default helpers;
