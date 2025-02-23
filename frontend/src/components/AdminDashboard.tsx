import { useEffect, useState } from 'react';

const AdminDashboard = () => {
    const [metrics, setMetrics] = useState({ userCount: 0, postCount: 0 });

    useEffect(() => {
        const fetchMetrics = async () => {
            const response = await fetch('/api/admin/dashboard', {
                headers: { Authorization: localStorage.getItem('token') || '' },
            });
            const data = await response.json();
            setMetrics(data);
        };

        fetchMetrics();
    }, []);

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <p>Usuarios: {metrics.userCount}</p>
            <p>Publicaciones: {metrics.postCount}</p>
        </div>
    );
};

export default AdminDashboard;