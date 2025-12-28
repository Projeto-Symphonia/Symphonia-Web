import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import api from "../../services/api";
import Navbar from "../../Components/Navbar/Navbar";
import PagePost from "../../Components/PagePost/PagePost";
import { useAuth } from "../../context/AuthContext";

import "./style.css";
import "./altStyle.css";

export default function UserPage() {
    const [posts, setPosts] = useState([]);
    const [userFromParam, setUserFromParam] = useState();

    const { userID } = useParams();
    const navigate = useNavigate();

    const { user } = useAuth();

    useEffect(() => {
        api.get(`/users/${userID}`).then((response) => {
            console.log(response.data.posts);
            setPosts(response.data.posts);

            console.log(response.data);
            setUserFromParam(response.data);
        });
    }, [navigate]);

    if (user != null) {
        //se usuario n estiver logado, ira ser redirecionado para a pagina inicial, beginpage
        if (user?._id == userID) {
            return (
                <>
                    <Navbar />
                    <button
                        className="mk-avaliation"
                        onClick={() => {
                            navigate("/create-post");
                        }}
                    >
                        Criar avaliação
                    </button>

                    <main>
                        <div className="feed-userpage">
                            <div className="menu">
                                <div className="column">
                                    <div className="imagem">
                                        <img
                                            src={user?.photo}
                                            alt="user-photo"
                                            className="imagem-img"
                                        />
                                        <FontAwesomeIcon
                                            icon={faPen}
                                            className="icon"
                                            style={{ color: "#ffffffff" }}
                                        />
                                        {/*ÍCONE PARA EDITAR FOTO ACIMA*/}
                                    </div>
                                </div>
                                <div className="row">
                                    <h1 className="name">{user?.name}</h1>
                                    <FontAwesomeIcon
                                        icon={faPen}
                                        style={{ color: "#fff" }}
                                        className="pencil"
                                    />
                                    {/*ÍCONE PARA EDITAR NOME ACIMA*/}
                                </div>
                            </div>

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
                        </div>
                    </main>
                </>
            );
        } else if (user?._id != userID) {
            return (
                <>
                    <Navbar />
                    <div className="feed-userpage">
                        <main>
                            <div className="menu">
                                <div className="column">
                                    <div className="imagem">
                                        <img
                                            src={userFromParam?.photo}
                                            alt="user-photo"
                                            id="imagem-img"
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <h1 className="name">
                                        {userFromParam?.name}
                                    </h1>
                                </div>
                            </div>

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
                    </div>
                </>
            );
        }
    }   else {
        navigate("/")
    }
}
