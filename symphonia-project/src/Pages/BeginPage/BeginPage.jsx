import { useNavigate } from "react-router-dom";

import logo from "../../assets/logo.png";

import "./style.css";

export default function BeginPage() {
    const navigate = useNavigate();
    return (
        <>
            {/*
            <h1>bem vindo(a) à homePage</h1>
            <button
                onClick={() => {
                    navigate("/register");
                }}
            >
                cadastro
            </button>
            <button
                onClick={() => {
                    navigate("/login");
                }}
            >
                logar
            </button>
            */}

            {/*topo*/}
            <header class="topo">
                <img src={logo} alt="Logo Symphonia" class="logo" />

                <div class="topo-botoes">
                    <button class="btn-login" onClick={()=>{navigate('/login')}}>Fazer login</button>
                    <button class="btn-cadastrar" onClick={()=>{navigate('/register')}}>Cadastre-se</button>
                </div>
            </header>

            {/*frase maior*/}
            <section class="intro">
                <h1 class="intro-texto">
                    Apresentamos o <span class="destaque">Symphonia</span>, a
                    sua plataforma livre para compartilhamento de avaliações
                    sobre músicas, álbuns, EPs e muito mais!
                </h1>
            </section>

            {/*<!-- quadrados centrais -->*/}
            <section class="quadros">
                <div className="row">
                    <div class="quadro">
                        Monte seu portfólio musical, avaliando as músicas que
                        você ouve ao longo do dia, e compartilhe com todos as
                        sensações que elas despertam em você!
                    </div>

                    <div class="quadro">
                        Avalie cada uma das músicas, álbuns ou EPs que você
                        escuta em uma escala de zero a cinco estrelas e
                        compartilhe as suas reações.
                    </div>
                </div>

                <div className="row">
                    <div class="quadro">
                        Demonstre carinho pelas suas músicas favoritas com
                        curtidas.
                    </div>

                    <div class="quadro">
                        Escreva e compartilhe avaliações. Além disso, siga
                        amigos e outros membros para ler as avaliações deles.
                    </div>
                </div>
            </section>

            {/*<!-- frase final verde -->*/}
            <section class="final" onClick={()=> {navigate('/register')}}>
                <div class="final-box">Aproveite você também, comece já!</div>
            </section>
        </>
    );
}
