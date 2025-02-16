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
    <>
      <div>
        <h1>The News</h1>
        <h2>Posts</h2>
      </div>
      <div>
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
            </div>
          ))
        ) : (
          <p>No hay posts disponibles.</p>
        )}
      </div>
    </>
  );
};

export default UserPosts;