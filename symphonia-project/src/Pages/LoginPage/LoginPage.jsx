import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function LoginPage() {
   const navigate = useNavigate();
   const { login, user } = useAuth();
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const [error, setError] = useState(null); 

   async function handleSubmit(e) {
      e.preventDefault();
      setError(null);
      const res = await login({ username, password });
      if (res.ok) {
         navigate("/home");
      } else {
         setError(res.message || "Falha no login");
      }
   }

   return (
      <div>
         <h1>Página de login</h1>
         {user && <div>Logado como: {user.name ?? user.email}</div>}
         <form onSubmit={handleSubmit}>
            <div>
               <label>Nome de usuário</label>
               <input value={username} onChange={e => setUsername(e.target.value)} />
            </div>
            <div>
               <label>Senha</label>
               <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            {error && <div style={{ color: "red" }}>{error}</div>}
            <button type="submit">Entrar</button>
            <button type="button" onClick={() => navigate("/register")}>Criar conta</button>
         </form>
      </div>
   );
}
