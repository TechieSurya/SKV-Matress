import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { DollarSign, ShoppingCart, Package, TrendingUp, ArrowUpRight, Calendar, CreditCard, Activity, BarChart3, ArrowDownRight } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalOrders: 0,
        totalRevenue: 0,
        totalProducts: 0,
        recentOrders: [],
    });
    const [isLoading, setIsLoading] = useState(true);

    // Dummy Data for Fallback/Demo
    const dummyStats = {
        totalOrders: 124,
        totalRevenue: 1549800,
        totalProducts: 45,
        recentOrders: [
            {
                id: 'dummy-1',
                order_number: 'ORD-001',
                created_at: new Date('2024-03-10'),
                customer_name: 'Rajesh Kumar',
                status: 'pending',
                total: 15498,
                items: [{ name: 'Ilavam Panju Mattress' }]
            },
            {
                id: 'dummy-2',
                order_number: 'ORD-002',
                created_at: new Date('2024-03-09'),
                customer_name: 'Priya Sharma',
                status: 'processing',
                total: 8999,
                items: [{ name: 'Single Cotton Mattress' }]
            },
            {
                id: 'dummy-3',
                order_number: 'ORD-003',
                created_at: new Date('2024-03-08'),
                customer_name: 'David Wilson',
                status: 'delivered',
                total: 24999,
                items: [{ name: 'Luxury King Mattress' }]
            },
            {
                id: 'dummy-4',
                order_number: 'ORD-004',
                created_at: new Date('2024-03-07'),
                customer_name: 'Anita Desai',
                status: 'shipped',
                total: 12499,
                items: [{ name: 'Queen Cotton Mattress' }]
            },
            {
                id: 'dummy-5',
                order_number: 'ORD-005',
                created_at: new Date('2024-03-06'),
                customer_name: 'Suresh Menon',
                status: 'confirmed',
                total: 6500,
                items: [{ name: 'Cotton Pillows (Set of 4)' }]
            }
        ]
    };

    // Dummy Chart Data
    const chartData = [
        { day: 'Mon', value: 45000, height: 'h-32' },
        { day: 'Tue', value: 32000, height: 'h-24' },
        { day: 'Wed', value: 58000, height: 'h-40' },
        { day: 'Thu', value: 42000, height: 'h-28' },
        { day: 'Fri', value: 65000, height: 'h-48' },
        { day: 'Sat', value: 85000, height: 'h-56' },
        { day: 'Sun', value: 72000, height: 'h-52' },
    ];

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const ordersSnapshot = await getDocs(collection(db, 'orders'));
            const orders = ordersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            const productsSnapshot = await getDocs(collection(db, 'products'));

            if (orders.length === 0 && productsSnapshot.empty) {
                setStats(dummyStats);
                setIsLoading(false);
                return;
            }

            const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);
            const recentOrdersQuery = query(collection(db, 'orders'), orderBy('created_at', 'desc'), limit(5));
            const recentOrdersSnapshot = await getDocs(recentOrdersQuery);
            const recentOrders = recentOrdersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

            setStats({
                totalOrders: orders.length,
                totalRevenue,
                totalProducts: productsSnapshot.size,
                recentOrders,
            });
        } catch (error) {
            console.error('Error fetching stats:', error);
            setStats(dummyStats);
        } finally {
            setIsLoading(false);
        }
    };

    const statCards = [
        {
            title: 'Total Revenue',
            value: `₹${stats.totalRevenue.toLocaleString()}`,
            icon: DollarSign,
            gradient: 'from-emerald-500 to-teal-600',
            shadow: 'shadow-emerald-200',
            trend: '+12.5%',
            trendUp: true,
            description: 'vs. last month'
        },
        {
            title: 'Total Orders',
            value: stats.totalOrders.toString(),
            icon: ShoppingCart,
            gradient: 'from-blue-500 to-indigo-600',
            shadow: 'shadow-blue-200',
            trend: '+8.2%',
            trendUp: true,
            description: 'vs. last month'
        },
        {
            title: 'Total Products',
            value: stats.totalProducts.toString(),
            icon: Package,
            gradient: 'from-purple-500 to-pink-600',
            shadow: 'shadow-purple-200',
            trend: '+2 New',
            trendUp: true,
            description: 'Added this week'
        },
    ];

    const getStatusColor = (status) => {
        const colors = {
            pending: 'bg-amber-50 text-amber-700 border-amber-200',
            confirmed: 'bg-blue-50 text-blue-700 border-blue-200',
            processing: 'bg-purple-50 text-purple-700 border-purple-200',
            shipped: 'bg-indigo-50 text-indigo-700 border-indigo-200',
            out_for_delivery: 'bg-orange-50 text-orange-700 border-orange-200',
            delivered: 'bg-emerald-50 text-emerald-700 border-emerald-200',
            cancelled: 'bg-red-50 text-red-700 border-red-200',
            returned: 'bg-gray-50 text-gray-700 border-gray-200',
        };
        return colors[status] || 'bg-gray-50 text-gray-700 border-gray-200';
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-[60vh]">
                <div className="relative">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-6 w-6 rounded-full bg-primary/20 animate-pulse"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            <Helmet>
                <title>Dashboard | Admin - SKV Natural Beds</title>
            </Helmet>

            <div className="space-y-8 max-w-7xl mx-auto pb-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="font-display text-3xl font-bold text-gray-900 tracking-tight">Dashboard</h1>
                        <p className="text-gray-500 mt-1">Welcome back, here's what's happening today.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="hidden md:flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-gray-200 shadow-sm text-sm font-medium text-gray-600">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </div>
                        <button className="bg-gray-900 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors shadow-lg shadow-gray-200">
                            Download Report
                        </button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {statCards.map((stat, index) => (
                        <motion.div
                            key={stat.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="relative overflow-hidden bg-white rounded-2xl p-6 shadow-sm border border-gray-100 group hover:shadow-md transition-all duration-300"
                        >
                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg ${stat.shadow} group-hover:scale-110 transition-transform duration-300`}>
                                        <stat.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <div className={`flex items-center gap-1 text-xs font-bold ${stat.trendUp ? 'text-emerald-600 bg-emerald-50' : 'text-red-600 bg-red-50'} px-2.5 py-1 rounded-full`}>
                                        {stat.trendUp ? <TrendingUp className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                                        {stat.trend}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-3xl font-bold text-gray-900 tracking-tight">{stat.value}</p>
                                    <p className="text-sm text-gray-500 font-medium mt-1">{stat.title}</p>
                                    <p className="text-xs text-gray-400 mt-2">{stat.description}</p>
                                </div>
                            </div>
                            {/* Decorative Background Blob */}
                            <div className={`absolute -right-6 -bottom-6 w-32 h-32 bg-gradient-to-br ${stat.gradient} opacity-5 rounded-full blur-2xl group-hover:opacity-10 transition-opacity duration-300`} />
                        </motion.div>
                    ))}
                </div>

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-3 gap-8">

                    {/* Revenue Chart Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
                    >
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="font-display text-lg font-semibold text-gray-900">Revenue Overview</h2>
                                <p className="text-sm text-gray-500">Weekly earnings performance</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-gray-50 border border-gray-200 text-xs font-medium text-gray-600">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                    Current Week
                                </div>
                            </div>
                        </div>

                        {/* Visual Bar Chart */}
                        <div className="flex items-end justify-between gap-4 h-64 w-full px-2">
                            {chartData.map((item, index) => (
                                <div key={item.day} className="flex flex-col items-center gap-2 flex-1 group">
                                    <div className="relative w-full flex justify-center items-end h-full bg-gray-50 rounded-xl overflow-hidden">
                                        <motion.div
                                            initial={{ height: 0 }}
                                            animate={{ height: '100%' }}
                                            transition={{ delay: 0.5 + (index * 0.1), duration: 0.8, ease: "easeOut" }}
                                            className={`w-full max-w-[40px] ${item.height} bg-gradient-to-t from-emerald-500 to-teal-400 rounded-t-lg opacity-80 group-hover:opacity-100 transition-opacity relative`}
                                        >
                                            {/* Tooltip */}
                                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                                ₹{item.value.toLocaleString()}
                                            </div>
                                        </motion.div>
                                    </div>
                                    <span className="text-xs font-medium text-gray-500">{item.day}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Activity Feed */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col"
                    >
                        <h2 className="font-display text-lg font-semibold text-gray-900 mb-6">Recent Activity</h2>
                        <div className="space-y-8 flex-1">
                            <div className="relative pl-6 border-l-2 border-gray-100 space-y-8">
                                <div className="relative">
                                    <div className="absolute -left-[29px] top-0 w-3 h-3 rounded-full bg-blue-500 ring-4 ring-white"></div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">New Order #ORD-001</p>
                                        <p className="text-xs text-gray-500 mt-0.5">Rajesh Kumar placed an order</p>
                                        <p className="text-xs text-gray-400 mt-1">2 mins ago</p>
                                    </div>
                                </div>
                                <div className="relative">
                                    <div className="absolute -left-[29px] top-0 w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-white"></div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">Payment Received</p>
                                        <p className="text-xs text-gray-500 mt-0.5">₹15,498 confirmed via Razorpay</p>
                                        <p className="text-xs text-gray-400 mt-1">15 mins ago</p>
                                    </div>
                                </div>
                                <div className="relative">
                                    <div className="absolute -left-[29px] top-0 w-3 h-3 rounded-full bg-purple-500 ring-4 ring-white"></div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">New Product Added</p>
                                        <p className="text-xs text-gray-500 mt-0.5">Luxury King Mattress added to catalog</p>
                                        <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button className="w-full mt-6 py-2.5 border border-gray-200 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">
                            View All Activity
                        </button>
                    </motion.div>

                    {/* Recent Orders Table - Full Width */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="lg:col-span-3 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                    >
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                            <div>
                                <h2 className="font-display text-lg font-semibold text-gray-900">Recent Orders</h2>
                                <p className="text-sm text-gray-500">Latest transactions from your store</p>
                            </div>
                            <a
                                href="/admin/orders"
                                className="px-4 py-2 bg-gray-50 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-100 transition-colors flex items-center gap-2"
                            >
                                View All Orders
                                <ArrowUpRight className="w-4 h-4" />
                            </a>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gray-50/50 border-b border-gray-100">
                                        <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Order ID</th>
                                        <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
                                        <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                                        <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="text-right py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {stats.recentOrders.map((order) => (
                                        <tr key={order.id} className="hover:bg-gray-50/50 transition-colors group">
                                            <td className="py-4 px-6">
                                                <span className="font-semibold text-gray-900 group-hover:text-primary transition-colors">{order.order_number}</span>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600">
                                                        {order.customer_name.charAt(0)}
                                                    </div>
                                                    <span className="text-sm font-medium text-gray-700">{order.customer_name}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className="text-sm text-gray-500">
                                                    {order.created_at?.toDate ? order.created_at.toDate().toLocaleDateString() : new Date(order.created_at).toLocaleDateString()}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                                                    {order.status.replace('_', ' ').charAt(0).toUpperCase() + order.status.slice(1).replace('_', ' ')}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6 text-right">
                                                <span className="font-semibold text-gray-900">₹{order.total?.toLocaleString()}</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
