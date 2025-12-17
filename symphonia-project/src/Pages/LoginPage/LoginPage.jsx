import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import logo from "../../assets/logo.png";

import "./style.css";

export default function LoginPage() {
    const navigate = useNavigate();
    const { login } = useAuth();
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
        <>
            {/* header */}
            <header className="topo">
                <img src={logo} alt="Logo Symphonia" className="logo" />
            </header>
            <form onSubmit={handleSubmit}>
                <div className="container">
                    <div className="card">
                        <h1 className="titulo">Login</h1>

                        <p className="descricao">
                            Por favor, insira o seu nome de usuário e senha para
                            sabermos quem é você.
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

                        {error && <div style={{ color: "red" }}>{error}</div>}

                        <div className="botoes">
                            <button
                                className="btn-voltar"
                                type="button"
                                onClick={() => navigate(-1)}
                            >
                                Voltar
                            </button>
                            <button className="btn-entrar" type="submit">
                                Entrar
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
}

