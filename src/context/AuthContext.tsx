// AuthContext.tsx
import { createContext } from "react";
import { type AuthContextType } from "../type";

const AuthContext = createContext<AuthContextType | null>(null);

export default AuthContext;
