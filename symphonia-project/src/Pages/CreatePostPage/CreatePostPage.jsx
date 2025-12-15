import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";
import "./style.css";


export default function CreatePostPage(){
    const [musics, setMusics] = useState([]);
    const [albums, setAlbums] = useState([]);
    const { login, user } = useAuth();
    // const navigate = useNavigate();
useEffect(() => {
      api.get("/albums").then((response) => {
         console.log(response.data);
         setAlbums(response.data);
      });
   }, []);
useEffect(() => {
      api.get("/musics").then((response) => {
         console.log(response.data);
         setMusics(response.data);
      });
   }, []);

    return(
        <>
            <header className="topo">
               <img src="../src/assets/logo.png" alt="Logo" className="logo" />
               <img onClick={()=>{navigate(`/user/${user._id}`)}} className="perfil-topo" src={user?.photo} alt="user-photo" />
            </header>

            <main className="criar-post">
            
            </main>
        </>
    )
}