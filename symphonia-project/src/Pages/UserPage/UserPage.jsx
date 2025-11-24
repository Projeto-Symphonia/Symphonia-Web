import { useNavigate, useParams } from "react-router-dom";

export default function UserPage() {
   const { userID } = useParams();
   const navigate = useNavigate();

   return (
      <>
         <h1>usuário: {userID}</h1>
         <button
            onClick={() => {
               navigate("/create-post");
            }}
         >
            fazer avaliação
         </button>
         <button
            onClick={() => {
               navigate("/home");
            }}
         >
            voltar para home
         </button>
      </>
   );
}
