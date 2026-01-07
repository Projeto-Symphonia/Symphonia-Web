import { useNavigate } from "react-router-dom";
import "./style.css";

export default function PageComment ({ post, user, title, comment }){
    const navigate = useNavigate();

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

    return(

        <div className="comment">
            <div className="barra-superior">
               <img
                  onClick={() => {
                     navigate(`/user/${user?._id}`);
                  }}
                  className="perfil-comment"
                  src={userphoto}
                  alt="userphoto"
               />
               <span className="comentario">Comentário por</span>
               <span onClick={()=>{navigate(`/user/${user._id}`)}} className="user">{username}</span>
            </div>

            <div className="conteudo">
                    <p className="comentario-texto">{comment}</p>
            </div>
        </div>
    );
}