import React, { useRef } from 'react';
import { X, Printer, MapPin, Phone, Mail, Package, Calendar, User, CreditCard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '@/assets/logo.png';

const OrderDetailModal = ({ order, onClose }) => {
    const printRef = useRef();

    if (!order) return null;

    const handlePrint = () => {
        const printContent = printRef.current.innerHTML;

        // Create a hidden iframe for printing
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        document.body.appendChild(iframe);

        const doc = iframe.contentWindow.document;
        doc.open();
        doc.write(`
            <html>
                <head>
                    <title>Invoice - ${order.order_number}</title>
                    <script src="https://cdn.tailwindcss.com"></script>
                    <style>
                        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
                        body { font-family: 'Inter', sans-serif; -webkit-print-color-adjust: exact; }
                        @page { size: A4; margin: 2cm; }
                    </style>
                </head>
                <body class="bg-white p-8">
                    ${printContent}
                </body>
            </html>
        `);
        doc.close();

        // Wait for content to load
        setTimeout(() => {
            iframe.contentWindow.focus();
            iframe.contentWindow.print();
            document.body.removeChild(iframe);
        }, 500);
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

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col border border-gray-100"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50/50">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center">
                                <Package className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">Order Details</h2>
                                <p className="text-sm text-gray-500 flex items-center gap-2">
                                    <span className="font-mono">{order.order_number}</span>
                                    <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                    <span>{order.created_at?.toDate ? order.created_at.toDate().toLocaleDateString() : new Date(order.created_at).toLocaleDateString()}</span>
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={handlePrint}
                                className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 text-gray-700 rounded-xl transition-all font-medium text-sm shadow-sm"
                            >
                                <Printer className="w-4 h-4" />
                                <span className="hidden sm:inline">Print Invoice</span>
                            </button>
                            <button
                                onClick={onClose}
                                className="p-2.5 bg-white border border-gray-200 hover:bg-red-50 hover:border-red-200 hover:text-red-600 rounded-xl transition-all shadow-sm"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Scrollable Content */}
                    <div className="flex-1 overflow-y-auto p-6 bg-gray-50/30">
                        <div className="grid lg:grid-cols-3 gap-6">
                            {/* Main Info - Left Column */}
                            <div className="lg:col-span-2 space-y-6">
                                {/* Items Card */}
                                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                                        <Package className="w-4 h-4 text-gray-400" />
                                        Order Items
                                    </h3>
                                    <div className="space-y-4">
                                        {Array.isArray(order.items) && order.items.map((item, i) => (
                                            <div key={i} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                                                <div className="w-16 h-16 bg-white rounded-lg border border-gray-200 flex items-center justify-center flex-shrink-0">
                                                    <Package className="w-8 h-8 text-gray-300" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="font-semibold text-gray-900 truncate">{item.name}</h4>
                                                    {item.variant && <p className="text-sm text-gray-500 mt-0.5">{item.variant}</p>}
                                                    <div className="flex items-center gap-3 mt-2 text-sm">
                                                        <span className="bg-white px-2 py-0.5 rounded border border-gray-200 text-gray-600">Qty: {item.quantity}</span>
                                                        <span className="font-medium text-gray-900">₹{item.price?.toLocaleString()}</span>
                                                    </div>
                                                </div>
                                                <div className="text-right font-bold text-gray-900">
                                                    ₹{(item.price * item.quantity)?.toLocaleString()}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-6 pt-6 border-t border-gray-100 space-y-3">
                                        <div className="flex justify-between text-sm text-gray-600">
                                            <span>Subtotal</span>
                                            <span>₹{order.total?.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between text-sm text-gray-600">
                                            <span>Shipping</span>
                                            <span className="text-emerald-600 font-medium">Free</span>
                                        </div>
                                        <div className="flex justify-between text-lg font-bold text-gray-900 pt-3 border-t border-gray-100">
                                            <span>Total Amount</span>
                                            <span className="text-primary">₹{order.total?.toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Sidebar - Right Column */}
                            <div className="space-y-6">
                                {/* Status Card */}
                                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Order Status</h3>
                                    <div className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}>
                                        <span className="w-2 h-2 rounded-full bg-current mr-2 opacity-75"></span>
                                        {order.status.replace('_', ' ').charAt(0).toUpperCase() + order.status.slice(1).replace('_', ' ')}
                                    </div>
                                </div>

                                {/* Customer Details */}
                                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                                        <User className="w-4 h-4 text-gray-400" />
                                        Customer
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="flex items-start gap-3">
                                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                                                <User className="w-4 h-4 text-gray-500" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">{order.customer_name || 'Guest User'}</p>
                                                <p className="text-xs text-gray-500">Customer</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                                                <Mail className="w-4 h-4 text-gray-500" />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="font-medium text-gray-900 truncate">{order.email}</p>
                                                <p className="text-xs text-gray-500">Email</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                                                <Phone className="w-4 h-4 text-gray-500" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">{order.phone}</p>
                                                <p className="text-xs text-gray-500">Phone</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Shipping Address */}
                                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-gray-400" />
                                        Delivery Address
                                    </h3>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        {order.shipping_address || 'No address provided'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Hidden Printable Area (Preserved from previous implementation) */}
                        <div ref={printRef} className="hidden">
                            <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
                                {/* Invoice Header */}
                                <div className="flex justify-between items-start mb-8 border-b border-gray-100 pb-8">
                                    <div className="flex items-center gap-4">
                                        <img src={logo} alt="SKV Natural Beds" className="w-16 h-16 object-contain" />
                                        <div>
                                            <h1 className="text-2xl font-bold text-gray-900">SKV Natural Beds</h1>
                                            <p className="text-sm text-gray-500">Premium Natural Comfort</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <h3 className="text-lg font-semibold text-gray-900">INVOICE</h3>
                                        <p className="text-sm text-gray-500">#{order.order_number}</p>
                                        <p className="text-sm text-gray-500">
                                            {order.created_at?.toDate ? order.created_at.toDate().toLocaleDateString() : new Date(order.created_at).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>

                                {/* Addresses */}
                                <div className="grid md:grid-cols-2 gap-8 mb-8">
                                    <div>
                                        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Bill To</h4>
                                        <div className="space-y-1 text-sm text-gray-600">
                                            <p className="font-medium text-gray-900">{order.customer_name || 'Customer'}</p>
                                            <p>{order.email}</p>
                                            <p>{order.phone}</p>
                                            <p className="whitespace-pre-line">{order.shipping_address}</p>
                                        </div>
                                    </div>
                                    <div className="text-right md:text-left">
                                        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Order Status</h4>
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                            {order.status.replace('_', ' ')}
                                        </span>
                                    </div>
                                </div>

                                {/* Items Table */}
                                <div className="mb-8">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b border-gray-200">
                                                <th className="text-left py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Item</th>
                                                <th className="text-center py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Qty</th>
                                                <th className="text-right py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Price</th>
                                                <th className="text-right py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {Array.isArray(order.items) && order.items.map((item, i) => (
                                                <tr key={i}>
                                                    <td className="py-4 text-sm text-gray-900">
                                                        <p className="font-medium">{item.name}</p>
                                                        {item.variant && <p className="text-xs text-gray-500">{item.variant}</p>}
                                                    </td>
                                                    <td className="py-4 text-center text-sm text-gray-600">{item.quantity}</td>
                                                    <td className="py-4 text-right text-sm text-gray-600">₹{item.price?.toLocaleString()}</td>
                                                    <td className="py-4 text-right text-sm font-medium text-gray-900">
                                                        ₹{(item.price * item.quantity)?.toLocaleString()}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Summary */}
                                <div className="flex justify-end">
                                    <div className="w-64 space-y-3">
                                        <div className="flex justify-between text-sm text-gray-600">
                                            <span>Subtotal</span>
                                            <span>₹{order.total?.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between text-sm text-gray-600">
                                            <span>Shipping</span>
                                            <span>Free</span>
                                        </div>
                                        <div className="flex justify-between text-base font-bold text-gray-900 pt-3 border-t border-gray-200">
                                            <span>Total</span>
                                            <span>₹{order.total?.toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="mt-12 pt-8 border-t border-gray-100 text-center text-sm text-gray-500">
                                    <p>Thank you for choosing SKV Natural Beds!</p>
                                    <p className="mt-1">For any queries, please contact us at support@skvnaturalbeds.com</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default OrderDetailModal;
