import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { SearchBar } from "../SearchBar/SearchBar";
import { useState, useEffect } from "react";
import api from "../../services/api";

export default function Navbar() {
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
    return (
        <>
            <header className="topo">
                <img src="../src/assets/logo.png" alt="Logo" className="logo" />

                <SearchBar posts={posts} setSearchResults={setSearchResults} />

                {/* <input
                          type="text"
                          placeholder="Pesquise aqui..."
                          className="pesquisa"
                       /> */}

                <img
                    onClick={() => {
                        navigate(`/user/${user._id}`);
                    }}
                    className="perfil-topo"
                    src={user?.photo}
                    alt="user-photo"
                />
            </header>
        </>
    );
}
