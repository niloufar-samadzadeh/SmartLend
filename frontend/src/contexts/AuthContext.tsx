import { createContext } from "react";

interface AuthContextType {
  token: string | null;
}

export const AuthContext =
  createContext<AuthContextType>({
    token: null,
  });