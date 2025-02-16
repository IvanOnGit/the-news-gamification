import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import UserPosts from "./components/UserPosts";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/newsletter" element={<UserPosts />} />
      </Routes>
    </Router>
  );
}

export default App;