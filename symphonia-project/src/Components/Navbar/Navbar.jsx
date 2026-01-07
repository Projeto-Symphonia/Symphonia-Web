import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { SearchBar } from "../SearchBar/SearchBar";
import Logo from '../../assets/logo.png'

export default function Navbar({ posts, setSearchResults, isHomePage}) {
    const { user } = useAuth();
    const navigate = useNavigate();

    return (
        <>
            <header className="topo">
                <img onClick={()=>{navigate("/home")}} src={Logo} alt="Logo" className="logo" />

                {isHomePage? <SearchBar posts={posts} setSearchResults={setSearchResults} /> : null}

                {/* <input
                          type="text"
                          placeholder="Pesquise aqui..."
                          className="pesquisa"
                       /> */}

                <img
                    onClick={() => {
                        navigate(`/user/${user?._id}`);
                    }}
                    className="perfil-topo"
                    src={user?.photo}
                    alt="user-photo"
                />
            </header>
        </>
    );
}
