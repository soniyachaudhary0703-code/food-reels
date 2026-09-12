
import {
  createContext,
  useContext,
  useState,
} from "react";

import api from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() =>
    JSON.parse(
      localStorage.getItem("foodreel_user") || "null"
    )
  );

  // Login
  const login = async (email, password, role) => {
    const { data } = await api.post("/auth/login", {
      email,
      password,
      role,
    });

    localStorage.setItem(
      "foodreel_token",
      data.token
    );

    localStorage.setItem(
      "foodreel_user",
      JSON.stringify(data.user)
    );

    setUser(data.user);

    return data.user;
  };

  // Register
  const register = (payload) => {
    return api.post("/auth/register", payload);
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("foodreel_token");
    localStorage.removeItem("foodreel_user");

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
