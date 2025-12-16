import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { SearchBar } from "../SearchBar/SearchBar";

export default function Navbar({posts, setSearchResults}) {

    const {user} = useAuth();
    const navigate = useNavigate();
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
