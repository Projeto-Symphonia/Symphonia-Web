import { useNavigate } from "react-router-dom";

export default function LoginPage() {
   const navigate = useNavigate();

   return (
      <>
         <h1>Página de login</h1>
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
