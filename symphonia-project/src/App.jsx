import { BrowserRouter, Routes, Route } from "react-router-dom";
import BeginPage from "./Pages/BeginPage/BeginPage";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import HomePage from "./Pages/HomeFeedPage/HomePage";
import UserPage from "./Pages/UserPage/UserPage";
//import CreatePostPage from "./Pages/CreatePostPage/CreatePostPage";

function App() {
   return (
      <BrowserRouter>
         <Routes>
            <Route path="/" element={<BeginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/user/:userID" element={<UserPage />} />
            {/*<Route path="/create-post" element={<CreatePostPage />} />*/}
         </Routes>
      </BrowserRouter>
   );
}

export default App;
