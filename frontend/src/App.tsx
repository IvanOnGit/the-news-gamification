import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import UserPosts from "./components/UserPosts";
import Register from "./components/Register";
import PostDetail from "./components/PostDetail";
import AdminDashboard from "./components/AdminDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/newsletter" element={<UserPosts />} />
        <Route path="/newsletter/post/:id" element={<PostDetail />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;