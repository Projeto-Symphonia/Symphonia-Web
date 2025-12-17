import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import logo from "../../assets/logo.png";

import "./style.css";

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
            setError("Senhas não conferem");
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
        <>
            {/*<!-- header -->*/}
            <header class="topo">
                <img src={logo} alt="Logo Symphonia" class="logo" />
            </header>
            <form onSubmit={handleSubmit}>
                <div className="container">
                    <div className="card">
                        <h1 class="titulo">Cadastro</h1>

                        <p class="descricao">
                            Por favor, escolha um nome de usuário, uma senha e
                            confirme.
                        </p>

                        <div className="grupo">
                            <label>Nome de usuário</label>
                            <input
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="grupo">
                            <label>Senha</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div class="linha"></div>

                        <div className="grupo">
                            <label>Confirmar Senha</label>
                            <input
                                type="password"
                                value={confirm}
                                onChange={(e) => setConfirm(e.target.value)}
                            />
                        </div>
                        {error && <div style={{ color: "red" }}>{error}</div>}

                        <div className="botoes">
                            <button
                                className="btn-voltar"
                                type="button"
                                onClick={() => navigate(-1)}
                            >
                                Voltar
                            </button>
                            <button 
                            className="btn-cria" 
                            type="submit"
                            >
                                Criar conta
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
}
