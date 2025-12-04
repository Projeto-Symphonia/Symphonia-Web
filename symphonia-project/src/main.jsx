import { createRoot } from "react-dom/client";
//import './index.css'
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext";

const root = createRoot(document.querySelector("#root"));

root.render(
   <AuthProvider>
      <App />
   </AuthProvider>
);
