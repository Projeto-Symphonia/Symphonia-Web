import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../../Components/Navbar/Navbar";
import Select from "../../Components/Select/Select";

import api from "../../services/api";
import "./style.css";
import Stars from "../../assets/stars.jsx";

export default function CreatePostPage() {
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
        type: "album",
    }));
    const musicOptions = musics.map((music) => ({
        value: music._id,
        label: music.title,
        type: "music",
    }));

    const options = [
        { label: "Álbuns", options: albumOptions },
        { label: "Músicas", options: musicOptions },
    ];
    const options2 = [
        { value: "arroz", label: "Arroz" },
        { value: "arroz", label: "Arroz" },
        { value: "arroz", label: "Arroz" },
        { value: "arroz", label: "Arroz" },
    ];

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleAvaliationChange = (value) => {
        setAvaliation(value);
    };

    const handleOptionChange = (option) => {
        setSelectedOption(option);
    };

    const handleCreatePost = async () => {
        api.post(`/posts/criarpost/${user?._id}`, {
            userID: user?._id,
            albumID:
                selectedOption?.type === "album"
                    ? selectedOption.value
                    : undefined,
            musicID:
                selectedOption?.type === "music"
                    ? selectedOption.value
                    : undefined,
            title: user?.name,
            avaliation: avaliation,
            comment: input,
        })
            .then((response) => console.log("Post created:", response.data))
            .catch((error) => console.error("Error creating post:", error));
            navigate("/home")
    };

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

    return (
        <>
            <Navbar />
            <div className="feed feed-create-post-page">
                <p className="p1">Criar avaliação</p>

                <p className="select-texto-acima">
                    Selecione um álbum ou música
                </p>
                <Select
                    className="album-select"
                    options={options}
                    value={selectedOption}
                    onChange={handleOptionChange}
                />

                <p className="p2">Dê uma nota(0 a 5 estrelas)</p>
                <Stars
                    className="avaliation-stars"
                    avaliation={avaliation}
                    onChange={handleAvaliationChange}
                    isCreatePostPage={true}
                />

                <p className="p3">Deixe um comentário à música ou álbum avaliado</p>
                <input
                    className="comment-input"
                    type="text"
                    placeholder="Comente aqui..."
                    onChange={handleInputChange}
                ></input>

                <button
                    className="create-post-button"
                    onClick={handleCreatePost}
                >
                    Criar Post
                </button>
            </div>
        </>
    );
}
