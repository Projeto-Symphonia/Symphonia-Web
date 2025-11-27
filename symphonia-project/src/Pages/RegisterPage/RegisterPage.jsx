import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
   const navigate = useNavigate();

   return (
      <>
         <h1>Página de registro</h1>
         <button
            onClick={() => {
               navigate("/home");
            }}
         >
            ir para home
         </button>
      </>
   );
}
