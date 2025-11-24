//OBS: pasta com nome 'HomeFeedPage' e arquivo com nome 'HomePage'

import { useNavigate } from "react-router-dom"

//página contendo o feed do site, mostrando posts de usuários variados
export default function HomePage(){
const navigate = useNavigate()

    return(
        <>
            <h1>Página da home/feed</h1>
            <button onClick={()=> {navigate('/user/1234')}}>pagina do usuário</button>
        </>
    )
}