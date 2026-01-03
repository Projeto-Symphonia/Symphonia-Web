import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Select from "react-select";
import api from "../../services/api";
import "./style.css";
import Stars from "../../assets/stars.jsx";


export default function CreatePostPage(){
    const [musics, setMusics] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [posts, setPosts] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [avaliation, setAvaliation] = useState(0);
    const [input, setInput] = useState("");
    const { login, user } = useAuth();
    const navigate = useNavigate();
    const albumOptions = albums.map((album) => ({
      value: album._id,
      label: album.title,
      type: 'album'
   }));
   const musicOptions = musics.map((music) => ({
      value: music._id,
      label: music.title,
      type: 'music'
   }));

   const options = [
      { label: 'Álbuns', options: albumOptions },
      { label: 'Músicas', options: musicOptions },
   ]

   const handleInputChange = (e) => {
      setInput(e.target.value);
   }

   const handleAvaliationChange = (value) => {
      setAvaliation(value);
   }

   const handleOptionChange = (option) => {
      setSelectedOption(option);
   }

   const handleCreatePost = async () => {
      api.post(`/posts/criarpost/${user?._id}`, {
         userID: user?._id,
         albumID: selectedOption?.type === 'album' ? selectedOption.value : undefined,
         musicID: selectedOption?.type === 'music' ? selectedOption.value : undefined,
         title: user?.name,
         avaliation: avaliation,
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
            <Select
               className="album-select"
               classNamePrefix="select"
               options={options}
               placeholder="Selecione um álbum ou música"
               value={selectedOption}
               onChange={handleOptionChange}
            />
            <br/>
            <input className="comment-input" type="text" placeholder="Comente aqui..." onChange={handleInputChange}></input>
            <Stars className="avaliation-stars" avaliation={avaliation} onChange={handleAvaliationChange} />
            <button className="create-post-button" onClick={handleCreatePost}>
               Criar Post
            </button>
            </main>
        </>
    )
}