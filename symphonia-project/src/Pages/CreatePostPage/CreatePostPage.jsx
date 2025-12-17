import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Select from "react-select";
import api from "../../services/api";
import "./style.css";


export default function CreatePostPage(){
    const [musics, setMusics] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [posts, setPosts] = useState([]);
    const [input, setInput] = useState("");
    const { login, user } = useAuth();
    const navigate = useNavigate();
    const albumOptions = albums.map((album) => ({
      value: album._id,
      label: album.title,
   }));

   const handleChange = (e) => {
      setInput(e.target.value);
   }

   const handleCreatePost = async () => {
      //lógica de criação de post
      api.post("/posts", {
         userID: user._id.name,
         comment: input,
      })
      .then(response => console.log('Post created:', response.data))
      .catch(error => console.error('Error creating post:', error));
   }

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
               <img onClick={()=>{navigate("/home")}} src="../src/assets/logo.png" alt="Logo" className="logo" />
               <img onClick={()=>{navigate(`/user/${user._id}`)}} className="perfil-topo" src={user?.photo} alt="user-photo" />
            </header>

            <main className="criar-post">
            <Select options={albumOptions} placeholder="Selecione um álbum"
            />
            <br/>
            <input className="comment-input" type="text" placeholder="Comente aqui..." onChange={handleChange}></input>
            <button onClick={handleCreatePost()}>
               Criar Post
            </button>
            </main>
        </>
    )
}