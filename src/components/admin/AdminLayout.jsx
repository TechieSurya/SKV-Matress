import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import AdminSidebar from './AdminSidebar';

const AdminLayout = () => {
    const { user, isAdmin, isLoading } = useAuth();
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        if (!isLoading && (!user || !isAdmin)) {
            navigate('/admin/login');
        }
    }, [user, isAdmin, isLoading, navigate]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!user || !isAdmin) {
        return null;
    }

    return (
        <div className="min-h-screen bg-background flex">
            <AdminSidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
            <main className="flex-1 p-6 lg:p-8 overflow-auto">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
