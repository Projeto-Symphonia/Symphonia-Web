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

function EditNameModal({ isOpen, currentName, onClose, onSave, isLoading }) {
    const [newName, setNewName] = useState(currentName);

    useEffect(() => {
        setNewName(currentName);
    }, [currentName, isOpen]);

    const handleSave = async () => {
        if (newName.trim() && newName !== currentName) {
            await onSave(newName);
        } else {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>Editar Nome de Usuário</h2>
                <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Novo nome de usuário"
                    className="modal-input"
                    disabled={isLoading}
                    autoFocus
                />
                <div className="modal-buttons">
                    <button onClick={onClose} disabled={isLoading} className="modal-btn-cancel">
                        Cancelar
                    </button>
                    <button onClick={handleSave} disabled={isLoading} className="modal-btn-save">
                        {isLoading ? "Salvando..." : "Salvar"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function UserPage() {
    const [posts, setPosts] = useState([]);
    const [userFromParam, setUserFromParam] = useState();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    const { userID } = useParams();
    const navigate = useNavigate();

    const { user, setUser } = useAuth();

    useEffect(() => {
        if (!userID) return;
        api.get(`/users/${userID}`).then((response) => {
            setPosts(response.data?.posts ?? []);
            setUserFromParam(response.data);
        });
    }, [userID]);

    useEffect(() => {
        if (!user) navigate("/");
    }, [user, navigate]);

    const handleEditName = async (newName) => {
        setIsUpdating(true);
        try {
            const res = await api.put(`/users/${user._id}`, { name: newName });
            const updatedUser = { ...user, name: res.data.user.name };
            setUser(updatedUser);
            localStorage.setItem("symphonia_user", JSON.stringify(updatedUser));
            setIsEditModalOpen(false);
        } catch (error) {
            alert(error.response?.data?.message || "Erro ao atualizar nome");
        } finally {
            setIsUpdating(false);
        }
    };

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
                                        onClick={() => setIsEditModalOpen(true)}
                                    />
                                </div>
                            </div>

                            {posts.map((post) => {
                                return (
                                    <PagePost
                                        key={post._id}
                                        post={post}
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
                                    <div>
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
    } else {
        navigate("/")
    }

    return (
        <>
            <EditNameModal
                isOpen={isEditModalOpen}
                currentName={user?.name || ""}
                onClose={() => setIsEditModalOpen(false)}
                onSave={handleEditName}
                isLoading={isUpdating}
            />
        </>
    );
}
