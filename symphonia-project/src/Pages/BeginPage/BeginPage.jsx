import { useNavigate } from "react-router-dom";

export default function BeginPage() {
    const navigate = useNavigate();
    return (
        <>
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
            {/*<button onClick={()=> {navigate('/home')}}>home</button>
            <button onClick={()=> {navigate('/user/:1234')}}>pagina do usuário</button>
            <button onClick={()=> {navigate('/create-post')}}>criar post</button>*/}
        </>
    );
}
