import { BrowserRouter, Routes, Route } from "react-router-dom";
import BeginPage from "./Pages/BeginPage/BeginPage";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import HomePage from "./Pages/HomeFeedPage/HomePage";
import UserPage from "./Pages/UserPage/UserPage";
import CreatePostPage from "./Pages/CreatePostPage/CreatePostPage";
import CommentPage from "./Pages/CommentPage/CommentPage";

function App() {
   return (
      <BrowserRouter>
         <Routes>
            <Route path="/" element={<BeginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/user/:userID" element={<UserPage />} />
            <Route path="/create-post" element={<CreatePostPage />} />
            <Route path="/post/comments/:postID" element={<CommentPage />} />
         </Routes>
      </BrowserRouter>
   );
}

export default App;
