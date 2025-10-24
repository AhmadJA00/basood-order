import { createContext } from "react";
import { type AuthContextType } from "../gloabal.type";

const AuthContext = createContext<AuthContextType | null>(null);

export default AuthContext;
