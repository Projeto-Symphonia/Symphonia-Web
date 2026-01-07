import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { SearchBar } from "../SearchBar/SearchBar";
import Logo from '../../assets/logo.png'

export default function Navbar({ posts, setSearchResults, isHomePage, showLogoutButton = false }) {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

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

                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    {showLogoutButton && (
                        <button 
                            onClick={handleLogout}
                            style={{
                                backgroundColor: '#ff4444',
                                color: 'white',
                                border: 'none',
                                padding: '8px 16px',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                                fontSize: '14px'
                            }}
                        >
                            Sair
                        </button>
                    )}
                    <img
                        onClick={() => {
                            navigate(`/user/${user?._id}`);
                        }}
                        className="perfil-topo"
                        src={user?.photo}
                        alt="user-photo"
                    />
                </div>
            </header>
        </>
    );
}
