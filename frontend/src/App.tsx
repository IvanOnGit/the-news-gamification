import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Bienvenido from "./components/Bienvenido";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/bienvenido" element={<Bienvenido />} />
      </Routes>
    </Router>
  );
}

export default App;