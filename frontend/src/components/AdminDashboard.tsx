import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const AdminDashboard = () => {
  const [metrics, setMetrics] = useState({ userCount: 0, postCount: 0 });

  useEffect(() => {
    const fetchMetrics = async () => {
        try {
            const token = localStorage.getItem('token') || '';
            console.log("Token de autenticación:", token);

            const response = await fetch('http://localhost:5000/admin/dashboard', {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`,
                },
              });

            console.log("Código de estado:", response.status);

            const text = await response.text();
            console.log("Respuesta completa del backend:", text);

            const data = JSON.parse(text);
            setMetrics(data);
        } catch (error) {
            console.error("Error obteniendo métricas:", error);
        }
    };

    fetchMetrics();
}, []);
  const data = [
    { name: "Usuarios", count: metrics.userCount },
    { name: "Publicaciones", count: metrics.postCount },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Admin Dashboard</h1>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-blue-500 text-white rounded-lg shadow-md text-center">
            <h2 className="text-lg font-semibold">Users</h2>
            <p className="text-2xl font-bold">{metrics.userCount}</p>
          </div>
          <div className="p-4 bg-green-500 text-white rounded-lg shadow-md text-center">
            <h2 className="text-lg font-semibold">Posts</h2>
            <p className="text-2xl font-bold">{metrics.postCount}</p>
          </div>
        </div>

        <div className="bg-white p-4 shadow-md rounded-lg">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Stats</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#4A90E2" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;