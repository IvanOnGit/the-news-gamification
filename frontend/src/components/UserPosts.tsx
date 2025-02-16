import { useEffect, useState } from "react";
import axios from "axios";

interface Post {
  id: number;
  title: string;
  content: string;
}

const UserPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
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

    fetchPosts();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-5">
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold text-gray-900">The News</h1>
        <h2 className="text-lg text-gray-600">Posts Recientes</h2>
      </div>

      <div className="space-y-6">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div
              key={post.id}
              className="bg-white shadow-md rounded-lg p-6 border border-gray-200"
            >
              <h2 className="text-xl font-semibold text-gray-900">{post.title}</h2>
              <p className="text-gray-700 mt-2">{post.content}</p>
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