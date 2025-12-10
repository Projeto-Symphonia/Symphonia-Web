import { useNavigate } from "react-router-dom";

import Stars from "../../assets/stars";

export default function PagePost({ album, avaliation, comment, user, title }) {
   const navigate = useNavigate();

   let username;
   let userphoto;
   if (user == null) {
      username = "unkown";
      userphoto =
         "https://i0.wp.com/upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg";
   } else {
      username = user?.name;
      userphoto = user?.photo;
   }

   return (
      <>
         <div className="post">
            <div className="barra-superior">
               <img
                  onClick={() => {
                     navigate(`/user/${user?._id}`);
                  }}
                  className="perfil-post"
                  src={userphoto}
                  alt="userphoto"
               />
               <span className="avaliacao">Avaliação por</span>
               <span onClick={()=>{navigate(`/user/${user._id}`)}} className="user">{username}</span>
               {/*<span className="tempo">Há 15 segundos</span>*/}

               {/*<div className="icones">
                  <img
                     src="../assets/favorite.png"
                     className="icon-heart"
                     alt="Curtir"
                  />
                  <span className="like-count">1</span>

                  <img
                     src="../assets/comment.png"
                     className="icon-comment"
                     alt="Comentar"
                  />
               </div>*/}
            </div>

            <div className="conteudo">
               <img
                  className="capa-musica"
                  src={album?.photo}
                  alt="album-photo"
               />

               <div className="info-musica">
                  <Stars avaliation={avaliation} />

                  <h3 className="titulo">{}</h3>
                  <p className="banda">{album?.title}</p>
                  <p className="avaliacao-texto">{comment}</p>
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
