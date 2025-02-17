import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

interface Post {
  id: number;
  title: string;
  content: string;
}

interface DecodedToken {
  userId: number;
  name: string;
}

const UserPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [userName, setUserName] = useState<string | null>(null);
  const [streak, setStreak] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decoded: DecodedToken = jwtDecode(token);
          setUserName(decoded.name);

          const response = await axios.get(`http://localhost:5000/users/${decoded.userId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          setStreak(response.data.streak);
        } catch (error) {
          console.error("Error al obtener los datos del usuario:", error);
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

  const handleSeeMore = async (id: number) => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);

        await axios.post(`http://localhost:5000/users/${decoded.userId}/click`, {}, {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        const response = await axios.get(`http://localhost:5000/users/${decoded.userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        setStreak(response.data.streak);
      } catch (error) {
        console.error("Error al actualizar la racha:", error);
      }
    }
  
    navigate(`/newsletter/post/${id}`);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-5">
      <div className="flex justify-between items-center mb-6">
        <div className="text-left">
          <h1 className="text-4xl font-bold text-gray-900">The News</h1>
          <h2 className="text-lg text-gray-600">Posts Recientes</h2>
        </div>
        {userName && (
          <div>
            <p className="text-lg font-semibold text-gray-700">Hello, {userName}!</p>
            {streak !== null && (
              <p className="text-sm text-gray-500">
                {streak === 0
                  ? "Streak: Open one article to start your streak!"
                  : `Streak: ${streak} ${streak === 1 ? "day" : "days in a row"}`}
              </p>
            )}
          </div>
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