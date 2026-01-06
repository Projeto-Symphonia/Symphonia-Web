import React, { createContext, useContext, useState, useEffect } from "react";
import api, { setAuthToken } from "../services/api";

const AuthContext = createContext(null);

function normalizeUser(data) {
  if (!data) return null;
  const _id = data._id ?? data.id ?? data.userID;
  return { ...data, _id };
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("symphonia_user");
    const savedToken = localStorage.getItem("symphonia_token");
    if (savedUser) setUser(normalizeUser(JSON.parse(savedUser)));
    if (savedToken) {
      setToken(savedToken);
      setAuthToken(savedToken);
    }
  }, []);

  async function login(credentials) {
    const payload = {
      name: credentials.username ?? credentials.name ?? credentials.email,
      password: credentials.password,
    };

    try {
      const res = await api.post("/users/login", payload);
      const userData = normalizeUser(res?.data?.user);
      if (userData) {
        const t = res?.data?.token ?? "session"; // backend ainda não devolve token real
        setToken(t);
        setUser(userData);
        localStorage.setItem("symphonia_token", t);
        localStorage.setItem("symphonia_user", JSON.stringify(userData));
        setAuthToken(t);
        return { ok: true };
      }
      return { ok: false, message: res?.data?.message ?? "Login failed" };
    } catch (e) {
      const message = e?.response?.data?.message ?? "Login failed";
      return { ok: false, message };
    }
  }

  async function register(payload) {
    try {
      const res = await api.post("/users", payload);
      if (res.status === 201 || res.status === 200) {
        await login({ email: payload.email ?? payload.name, password: payload.password });
        return { ok: true };
      }
    } catch (e) {
      if (e?.message === "Network Error") {
        console.error("AuthContext.register network error:", e);
        return { ok: false, message: "Erro de conexão com o servidor (Network Error)" };
      }
      console.error("AuthContext.register error:", e);
      return { ok: false, message: e.message };
    }
    return { ok: false };
  }

  function logout() {
    setUser(null);
    setToken(null);
    localStorage.removeItem("symphonia_token");
    localStorage.removeItem("symphonia_user");
    setAuthToken(null);
  }

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthContext;

