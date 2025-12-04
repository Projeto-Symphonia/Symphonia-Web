import { useNavigate } from "react-router-dom";

import Stars from "../../assets/stars";
import "./style.css";

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
      <div className="pagepost-div">
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
      </div>
   );
}
