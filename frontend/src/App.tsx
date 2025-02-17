import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import UserPosts from "./components/UserPosts";
import Register from "./components/Register";
import PostDetail from "./components/PostDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/newsletter" element={<UserPosts />} />
        <Route path="/newsletter/post/:id" element={<PostDetail />} />
      </Routes>
    </Router>
  );
}

export default App;