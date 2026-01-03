import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, Users, Settings, LogOut, Leaf, Menu, X } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';

import logo from '@/assets/logo.png';

const AdminSidebar = ({ isOpen, onToggle }) => {
    const { signOut } = useAuth();

    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
        { icon: Package, label: 'Products', path: '/admin/products' },
        { icon: ShoppingCart, label: 'Orders', path: '/admin/orders' },
    ];

    return (
        <>
            {/* Mobile toggle */}
            <button
                onClick={onToggle}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-cotton-white rounded-lg shadow-soft"
            >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Overlay */}
            {isOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-foreground/50 z-40"
                    onClick={onToggle}
                />
            )}

            {/* Sidebar */}
            <aside
                className={cn(
                    'fixed lg:static inset-y-0 left-0 z-40 w-64 bg-cotton-white border-r border-border transition-transform duration-300 flex flex-col',
                    isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                )}
            >
                {/* Logo */}
                <div className="p-6 border-b border-border">
                    <div className="flex items-center gap-3">
                        <img src={logo} alt="SKV Natural Beds" className="w-12 h-12 object-contain" />
                        <div>
                            <p className="font-display text-lg font-semibold text-foreground leading-tight">SKV Natural Beds</p>
                            <p className="text-xs text-muted-foreground">Admin Panel</p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-1">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            end={item.path === '/admin'}
                            className={({ isActive }) =>
                                cn(
                                    'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors',
                                    isActive
                                        ? 'bg-primary text-primary-foreground'
                                        : 'text-foreground hover:bg-muted'
                                )
                            }
                        >
                            <item.icon className="w-5 h-5" />
                            {item.label}
                        </NavLink>
                    ))}
                </nav>

                {/* Footer */}
                <div className="p-4 border-t border-border">
                    <button
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-md transition-colors"
                        onClick={signOut}
                    >
                        <LogOut className="w-5 h-5" />
                        Sign Out
                    </button>
                    <a
                        href="/"
                        className="flex items-center gap-3 px-4 py-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                        ← Back to Store
                    </a>
                </div>
            </aside>
        </>
    );
};

export default AdminSidebar;
