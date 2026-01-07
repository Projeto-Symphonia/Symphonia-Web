import { useNavigate } from "react-router-dom";

import CommentIcon from "../../assets/comment.png";
import Stars from "../../assets/stars";
import api from "../../services/api";
import "./stylePagePost.css";

export default function PagePost({
    album,
    music,
    avaliation,
    comment,
    user,
    title,
    post,
    isUser,
}) {
    const navigate = useNavigate();

    async function handleDelete(e) {
        e.stopPropagation();
        if (!window.confirm("Confirma exclusão do post e dos comentários?"))
            return;
        try {
            await api.delete(`/posts/${post?._id}`);
        } catch (err) {
            console.error(err);
            alert("Erro ao excluir o post. Veja o console.");
        }
    }

    let username;
    let userphoto;
    if (user == null) {
        username = "unknown";
        userphoto =
            "https://i0.wp.com/upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg";
    } else {
        username = user?.name;
        userphoto = user?.photo;
    }

    return (
        <>
            <div className="pagepost-container col">
                <div className="pagepost-barra-superior row">
                    <div className="row">
                        <img
                            onClick={() => {
                                if (user != null) {
                                    navigate(`/user/${user?._id}`);
                                }
                            }}
                            className="pagepost-user-photo"
                            src={userphoto}
                            alt="user-photo"
                        />
                        <p>
                            Avaliado por:{" "}
                            <span
                                onClick={() => {
                                    if (user != null) {
                                        navigate(`/user/${user?._id}`);
                                    }
                                }}
                                className="pagepost-username"
                            >
                                @{username}{" "}
                            </span>
                        </p>
                    </div>

                    {/*isUser ? (
                            <span onClick={handleDelete} className="trashicon">
                                X
                            </span>
                        ) : (
                            none
                        )*/}
                    <img
                        onClick={() => {
                            navigate(`/post/comments/${post?._id}`);
                        }}
                        className="pagepost-comment-icon"
                        src={CommentIcon}
                        alt=""
                    />
                </div>
                <div className="pagepost-conteudo row">
                    <div className="col col1">
                        <img
                            className="pagepost-album-photo"
                            src={album?.photo}
                            alt="album-photo"
                        />
                        <p className="cp1">{album?.title}</p>
                        <p className="cp1">{music?.title}</p>
                    </div>
                    <div className="col col2">
                        <Stars avaliation={avaliation} />
                        <p>{comment}</p>
                    </div>
                </div>
            </div>
        </>
    );
}

/*<div className="pagepost-div">
         <div className="pagepost-row">
            <img
               onClick={() => {
                  if (user != null) {
                    navigate(`/user/${user?._id}`)
                  }
               }}
               className="user-photo"
               src={userphoto}
               alt="user-photo"
            />
            <p>
               Avaliado por: <span className="username">@{username}</span>
            </p>
         </div>
         <div className="pagepost-row">
            <div className="col">
               <img
                  className="album-photo"
                  src={album?.photo}
                  alt="album-photo"
               />
               <p>{album?.title}</p>
            </div>
            <div className="avaliation">
               <Stars avaliation={avaliation} />
               <p>{comment}</p>
            </div>
         </div>
      </div>*/
