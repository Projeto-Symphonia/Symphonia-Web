//OBS: pasta com nome 'HomeFeedPage' e arquivo com nome 'HomePage'
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import PagePost from "../../Components/PagePost/PagePost";
import { useAuth } from "../../context/AuthContext";
import "./style.css";
import Navbar from "../../Components/Navbar/Navbar";

//página contendo o feed do site, mostrando posts de usuários variados
export default function HomePage() {
    const [posts, setPosts] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const { user } = useAuth();

    const navigate = useNavigate();

    useEffect(() => {
        api.get("/posts").then((response) => {
            console.log(response.data);
            setPosts(response.data);
            setSearchResults(response.data);
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

                <Navbar posts={posts} setSearchResults={setSearchResults} />

                {/*<button className="btn-criar">Criar Avaliação</button>*/}

                <main className="feed">
                    {searchResults.map((post) => {
                        return (
                            <PagePost
                                key={post._id}
                                post={post}
                                user={post.userID}
                                album={post.albumID}
                                music={post.musicID}
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
