import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function RegisterPage() {
   const navigate = useNavigate();
   const { register } = useAuth();
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const [confirm, setConfirm] = useState("");
   const [error, setError] = useState(null);

   async function handleSubmit(e) {
      e.preventDefault();
      setError(null);
      if (password !== confirm) {
         setError('Senhas não conferem');
         return;
      }
      const res = await register({ name: username, password });
      if (res.ok) {
         navigate("/home");
      } else {
         setError(res.message || "Falha no registro");
      }
   }

   return (
      <div>
         <h1>Tela de cadastro</h1>
         <form onSubmit={handleSubmit}>
            <div>
               <label>Nome de usuário</label>
               <input value={username} onChange={e => setUsername(e.target.value)} />
            </div>
            <div>
               <label>Senha</label>
               <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <div>
               <label>Confirmar Senha</label>
               <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} />
            </div>
            {error && <div style={{ color: "red" }}>{error}</div>}
            <button type="submit">Criar conta</button>
            <button type="button" onClick={() => navigate(-1)}>Voltar</button>
         </form>
      </div>
   );
}

