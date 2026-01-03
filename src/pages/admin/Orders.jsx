import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Eye, ShoppingCart, Filter, Calendar, Package, ChevronRight } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, getDocs, updateDoc, doc, orderBy, query } from 'firebase/firestore';
import { toast } from '@/hooks/use-toast';
import OrderDetailModal from '@/components/admin/OrderDetailModal';

const statusOptions = [
    'pending',
    'confirmed',
    'processing',
    'shipped',
    'out_for_delivery',
    'delivered',
    'cancelled',
    'returned',
];

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [statusFilter, setStatusFilter] = useState('all');

    useEffect(() => {
        fetchOrders();
    }, []);

    const dummyOrders = [
        {
            id: 'dummy-1',
            order_number: 'ORD-001',
            created_at: new Date('2024-03-10'),
            customer_name: 'Rajesh Kumar',
            email: 'rajesh.k@example.com',
            phone: '+91 98765 43210',
            shipping_address: '42, Gandhi Road, Anna Nagar, Chennai - 600040',
            status: 'pending',
            total: 15498,
            items: [
                { name: 'Ilavam Panju Mattress', variant: 'Queen (60x78)', quantity: 1, price: 12999 },
                { name: 'Organic Cotton Pillow', variant: 'Standard', quantity: 2, price: 1249.50 }
            ]
        },
        {
            id: 'dummy-2',
            order_number: 'ORD-002',
            created_at: new Date('2024-03-09'),
            customer_name: 'Priya Sharma',
            email: 'priya.s@example.com',
            phone: '+91 98765 12345',
            shipping_address: '15, Lake View Apartments, HSR Layout, Bangalore - 560102',
            status: 'processing',
            total: 8999,
            items: [
                { name: 'Single Cotton Mattress', variant: 'Single (36x78)', quantity: 2, price: 4499.50 }
            ]
        },
        {
            id: 'dummy-3',
            order_number: 'ORD-003',
            created_at: new Date('2024-03-08'),
            customer_name: 'David Wilson',
            email: 'david.w@example.com',
            phone: '+91 99887 76655',
            shipping_address: '7, Hill Top Villa, Ooty - 643001',
            status: 'delivered',
            total: 24999,
            items: [
                { name: 'Luxury King Mattress', variant: 'King (72x78)', quantity: 1, price: 24999 }
            ]
        }
    ];

    const fetchOrders = async () => {
        try {
            const q = query(collection(db, 'orders'), orderBy('created_at', 'desc'));
            const querySnapshot = await getDocs(q);
            const ordersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

            if (ordersData.length === 0) {
                setOrders(dummyOrders);
            } else {
                setOrders(ordersData);
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
            setOrders(dummyOrders);
            toast({ title: 'Notice', description: 'Showing demo data', variant: 'default' });
        } finally {
            setIsLoading(false);
        }
    };

    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            // Check if it's a dummy order
            if (orderId.startsWith('dummy-')) {
                setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
                toast({ title: 'Success', description: 'Order status updated (Demo)' });
                return;
            }

            await updateDoc(doc(db, 'orders', orderId), { status: newStatus });
            toast({ title: 'Success', description: 'Order status updated' });
            fetchOrders();
        } catch (error) {
            console.error('Error updating order:', error);
            toast({ title: 'Error', description: 'Failed to update order', variant: 'destructive' });
        }
    };

    const getStatusColor = (status) => {
        const colors = {
            pending: 'bg-amber-100 text-amber-700 border-amber-200',
            confirmed: 'bg-blue-100 text-blue-700 border-blue-200',
            processing: 'bg-purple-100 text-purple-700 border-purple-200',
            shipped: 'bg-indigo-100 text-indigo-700 border-indigo-200',
            out_for_delivery: 'bg-orange-100 text-orange-700 border-orange-200',
            delivered: 'bg-emerald-100 text-emerald-700 border-emerald-200',
            cancelled: 'bg-red-100 text-red-700 border-red-200',
            returned: 'bg-gray-100 text-gray-700 border-gray-200',
        };
        return colors[status] || 'bg-gray-100 text-gray-700 border-gray-200';
    };

    const filteredOrders = orders.filter((o) => {
        const matchesSearch =
            o.order_number?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            o.status?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            o.customer_name?.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStatus = statusFilter === 'all' || o.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

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
                <title>Orders | Admin - SKV Natural Beds</title>
            </Helmet>

            <div className="space-y-8 max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="font-display text-3xl font-bold text-gray-900">Orders</h1>
                        <p className="text-gray-500 mt-1">Manage and track customer orders</p>
                    </div>
                    <div className="flex items-center gap-2 bg-white p-1 rounded-lg border border-gray-200 shadow-sm">
                        <div className="px-3 py-1 bg-primary/10 text-primary rounded-md text-sm font-medium">
                            Total: {orders.length}
                        </div>
                        <div className="h-4 w-px bg-gray-200"></div>
                        <div className="px-3 py-1 text-gray-500 text-sm">
                            Pending: {orders.filter(o => o.status === 'pending').length}
                        </div>
                    </div>
                </div>

                {/* Filters & Search */}
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            placeholder="Search orders, customers..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        />
                    </div>

                    <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
                        <Filter className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary cursor-pointer min-w-[140px]"
                        >
                            <option value="all">All Status</option>
                            {statusOptions.map(status => (
                                <option key={status} value={status}>{status.replace('_', ' ').charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Orders Content */}
                <AnimatePresence mode="wait">
                    {filteredOrders.length > 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="grid gap-4"
                        >
                            {/* Desktop Table View */}
                            <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Order Info</th>
                                                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
                                                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Items</th>
                                                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Total</th>
                                                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                                <th className="text-right py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-50">
                                            {filteredOrders.map((order, index) => (
                                                <motion.tr
                                                    key={order.id}
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: index * 0.05 }}
                                                    className="hover:bg-gray-50/50 transition-colors group"
                                                >
                                                    <td className="py-4 px-6">
                                                        <div className="flex flex-col">
                                                            <span className="font-semibold text-gray-900">{order.order_number}</span>
                                                            <span className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                                                                <Calendar className="w-3 h-3" />
                                                                {order.created_at?.toDate ? order.created_at.toDate().toLocaleDateString() : new Date(order.created_at).toLocaleDateString()}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-6">
                                                        <div className="flex flex-col">
                                                            <span className="text-sm font-medium text-gray-900">{order.customer_name}</span>
                                                            <span className="text-xs text-gray-500">{order.email}</span>
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-6">
                                                        <div className="flex items-center gap-2">
                                                            <span className="px-2.5 py-1 bg-gray-100 rounded-md text-xs font-medium text-gray-600">
                                                                {Array.isArray(order.items) ? order.items.length : 0} items
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-6">
                                                        <span className="font-semibold text-gray-900">₹{order.total?.toLocaleString()}</span>
                                                    </td>
                                                    <td className="py-4 px-6">
                                                        <select
                                                            value={order.status}
                                                            onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                                                            className={`px-3 py-1.5 rounded-full text-xs font-medium border cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-1 transition-all ${getStatusColor(order.status)}`}
                                                        >
                                                            {statusOptions.map((status) => (
                                                                <option key={status} value={status}>
                                                                    {status.replace('_', ' ').charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </td>
                                                    <td className="py-4 px-6 text-right">
                                                        <button
                                                            onClick={() => setSelectedOrder(order)}
                                                            className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm group-hover:shadow-md"
                                                        >
                                                            <Eye className="w-4 h-4" />
                                                        </button>
                                                    </td>
                                                </motion.tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Mobile Card View */}
                            <div className="md:hidden space-y-4">
                                {filteredOrders.map((order, index) => (
                                    <motion.div
                                        key={order.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
                                    >
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="font-bold text-gray-900">{order.order_number}</h3>
                                                <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                                                    <Calendar className="w-3 h-3" />
                                                    {order.created_at?.toDate ? order.created_at.toDate().toLocaleDateString() : new Date(order.created_at).toLocaleDateString()}
                                                </p>
                                            </div>
                                            <select
                                                value={order.status}
                                                onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                                                className={`px-3 py-1 rounded-full text-xs font-medium border cursor-pointer focus:outline-none ${getStatusColor(order.status)}`}
                                            >
                                                {statusOptions.map((status) => (
                                                    <option key={status} value={status}>
                                                        {status.replace('_', ' ')}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="space-y-3 mb-4">
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-gray-500">Customer</span>
                                                <span className="font-medium text-gray-900">{order.customer_name}</span>
                                            </div>
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-gray-500">Items</span>
                                                <span className="font-medium text-gray-900">{Array.isArray(order.items) ? order.items.length : 0} items</span>
                                            </div>
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-gray-500">Total</span>
                                                <span className="font-bold text-primary">₹{order.total?.toLocaleString()}</span>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => setSelectedOrder(order)}
                                            className="w-full py-2.5 bg-gray-50 text-gray-700 font-medium rounded-xl hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 text-sm"
                                        >
                                            View Details
                                            <ChevronRight className="w-4 h-4" />
                                        </button>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-dashed border-gray-200"
                        >
                            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                                <Package className="w-8 h-8 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">No orders found</h3>
                            <p className="text-gray-500 mt-1 text-sm">Try adjusting your search or filters</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Order Detail Modal */}
            {selectedOrder && (
                <OrderDetailModal
                    order={selectedOrder}
                    onClose={() => setSelectedOrder(null)}
                />
            )}
        </>
    );
};

export default Orders;
