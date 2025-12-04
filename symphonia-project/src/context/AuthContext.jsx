import React, { createContext, useContext, useState, useEffect } from "react";
import api, { setAuthToken } from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("symphonia_user");
    const savedToken = localStorage.getItem("symphonia_token");
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedToken) {
      setToken(savedToken);
      setAuthToken(savedToken);
    }
  }, []);

  async function login(credentials) {
    try {
      const res = await api.post("/login", credentials);
      if (res?.data?.token) {
        const t = res.data.token;
        const u = res.data.user ?? { name: credentials.username ?? credentials.name };
        setToken(t);
        setUser(u);
        localStorage.setItem("symphonia_token", t);
        localStorage.setItem("symphonia_user", JSON.stringify(u));
        setAuthToken(t);
        return { ok: true };
      }
    } catch (e) {
    }

    try {
      const resp = await api.get("/users");
      const users = resp.data || [];
      const suppliedName = credentials.username ?? credentials.name ?? credentials.email;
      const found = users.find(u => (u.name === suppliedName) && u.password === credentials.password);
      if (found) {
        const fakeToken = "local-dev-token";
        setToken(fakeToken);
        setUser(found);
        localStorage.setItem("symphonia_token", fakeToken);
        localStorage.setItem("symphonia_user", JSON.stringify(found));
        setAuthToken(fakeToken);
        return { ok: true };
      }
    } catch (e) {
    }

    return { ok: false, message: "Login failed" };
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
