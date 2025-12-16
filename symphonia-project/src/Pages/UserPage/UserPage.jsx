import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";
import Navbar from "../../Components/Navbar/Navbar";
import PagePost from "../../Components/PagePost/PagePost";
import { useAuth } from "../../context/AuthContext";

export default function UserPage() {
    const [posts, setPosts] = useState([]);

    const { userID } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        api.get(`/users/${userID}`).then((response) => {
            console.log(response.data.posts);
            setPosts(response.data.posts)
        });
    }, [navigate]);

    return (
        <>
            <Navbar />
            <button
                onClick={() => {
                    navigate("/create-post");
                }}
            >
                fazer avaliação
            </button>

            <main>
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
}
