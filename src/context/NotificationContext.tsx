import { createContext } from "react";
import type { NotificationContextType } from "../gloabal.type";

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export default NotificationContext;
