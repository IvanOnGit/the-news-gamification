import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // Usamos useParams para obtener el id del post

interface Post {
  id: number;
  title: string;
  content: string;
}

const PostDetail = () => {
  const { id } = useParams<{ id: string }>();  // Obtenemos el id del post desde la URL
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:5000/posts/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setPost(response.data);
      } catch (error) {
        console.error("Error al obtener el post:", error);
      }
    };

    if (id) {
      fetchPostDetail();
    }
  }, [id]);

  if (!post) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-5">
      <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
        <h1 className="text-3xl font-bold text-gray-900">{post.title}</h1>
        <p className="text-gray-700 mt-4">{post.content}</p>
      </div>
    </div>
  );
};

export default PostDetail;