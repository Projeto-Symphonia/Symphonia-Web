//OBS: pasta com nome 'HomeFeedPage' e arquivo com nome 'HomePage'
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import PagePost from "../../Components/PagePost/PagePost";

//página contendo o feed do site, mostrando posts de usuários variados
export default function HomePage() {
    const [posts, setPosts] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        api.get("/posts").then((response) => {
            console.log(response.data);
            setPosts(response.data);
        });
    }, []);
    return (
        <>
            <h1>Página da home/feed</h1>
            <button
                onClick={() => {
                    navigate("/user/1234");
                }}
            >
                pagina do usuário
            </button>

            {posts.map((post) => {
                return (
                    <PagePost
                        key={post._id}
                        user={post.userID}
                        album={post.albumID}
                        avaliation={post.avaliation}
                        title={post.title}
                        comment = {post.comment}
                    />
                );
            })}
        </>
    );
}
