//OBS: pasta com nome 'HomeFeedPage' e arquivo com nome 'HomePage'
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import PagePost from "../../Components/PagePost/PagePost";
import { useAuth } from "../../context/AuthContext";

import "./style.css";

//página contendo o feed do site, mostrando posts de usuários variados
export default function HomePage() {
   const [posts, setPosts] = useState([]);
   const { login, user } = useAuth();

   const navigate = useNavigate();

   useEffect(() => {
      api.get("/posts").then((response) => {
         console.log(response.data);
         setPosts(response.data);
      });
   }, []);

   if (user != null) {
      return (
         <>
            {/*
            <h1>Página da home/feed</h1>
            <button
               onClick={() => {
                  navigate(`/user/${user._id}`);
               }}
            >
               pagina do usuário
            </button>
            */}

            <header className="topo">
               <img src="../assets/logo.png" alt="Logo" className="logo" />

               <input
                  type="text"
                  placeholder="Pesquise aqui..."
                  className="pesquisa"
               />

               <img onClick={()=>{navigate(`/user/${user._id}`)}} className="perfil-topo" src={user?.photo} alt="user-photo" />
            </header>

            {/*<button className="btn-criar">Criar Avaliação</button>*/}

            <main className="feed">
               {posts.map((post) => {
                  return (
                     <PagePost
                        key={post._id}
                        user={post.userID}
                        album={post.albumID}
                        avaliation={post.avaliation}
                        title={post.title}
                        comment={post.comment}
                     />
                  );
               })}
            </main>
         </>
      );
   } else {
      navigate("/");
   }
}
