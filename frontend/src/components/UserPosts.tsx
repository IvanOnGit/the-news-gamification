import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom"; // Importamos useNavigate

interface Post {
  id: number;
  title: string;
  content: string;
}

interface DecodedToken {
  userId: number;
  name: string; // Asegúrate de que el backend envíe el nombre en el token
}

const UserPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [userName, setUserName] = useState<string | null>(null);
  const navigate = useNavigate(); // Hook para redirigir

  useEffect(() => {
    const fetchUserData = () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decoded: DecodedToken = jwtDecode(token);
          setUserName(decoded.name);
        } catch (error) {
          console.error("Error al decodificar el token:", error);
        }
      }
    };

    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/posts", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setPosts(response.data);
      } catch (error) {
        console.error("Error al obtener los posts:", error);
      }
    };

    fetchUserData();
    fetchPosts();
  }, []);

  const handleSeeMore = (id: number) => {
    navigate(`/newsletter/post/${id}`); // Redirigimos al detalle del post
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-5">
      <div className="flex justify-between items-center mb-6">
        <div className="text-left">
          <h1 className="text-4xl font-bold text-gray-900">The News</h1>
          <h2 className="text-lg text-gray-600">Posts Recientes</h2>
        </div>
        {userName && (
          <p className="text-lg font-semibold text-gray-700">Hello, {userName}!</p>
        )}
      </div>

      <div className="space-y-6">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div
              key={post.id}
              className="bg-white shadow-md rounded-lg p-6 border border-gray-200"
            >
              <h2 className="text-xl font-semibold text-gray-900">{post.title}</h2>
              <p className="text-gray-700 mt-2">{post.content.slice(0, 100)}...</p>
              <button
                onClick={() => handleSeeMore(post.id)}
                className="mt-4 text-blue-600 hover:underline"
              >
                See more
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No hay posts disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default UserPosts;