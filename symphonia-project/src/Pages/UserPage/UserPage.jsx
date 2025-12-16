import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";
import Navbar from "../../Components/Navbar/Navbar";
export default function UserPage() {
   const { userID } = useParams();
   const navigate = useNavigate();

   useEffect(() => {
      api.get(`/posts/${userID}`)
   }, []);

   return (
      <>
         <Navbar />
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
