import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2 } from 'lucide-react';

const CheckoutModal = ({ isOpen, onClose, items, totalPrice }) => {
    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        address: '',
        city: '',
        pincode: '',
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.mobile.trim()) {
            newErrors.mobile = 'Mobile number is required';
        } else if (!/^\d{10}$/.test(formData.mobile.replace(/\D/g, ''))) {
            newErrors.mobile = 'Enter a valid 10-digit mobile number';
        }
        if (!formData.address.trim()) newErrors.address = 'Address is required';
        if (!formData.city.trim()) newErrors.city = 'City is required';
        if (!formData.pincode.trim()) newErrors.pincode = 'Pincode is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handlePlaceOrder = () => {
        if (!validate()) return;
        setIsSubmitting(true);

        // 1. Format Order Details
        let message = `*New Order Request*\n----------------\n*Customer Details:*\nName: ${formData.name}\nMobile: ${formData.mobile}\nAddress: ${formData.address}, ${formData.city} - ${formData.pincode}\n----------------\n*Order Summary:*\n`;

        items.forEach((item, index) => {
            message += `${index + 1}. ${item.product.name} (Size: ${item.selectedSize}${item.selectedThickness ? `, ${item.selectedThickness}` : ''}) x ${item.quantity} - ₹${item.totalPrice.toLocaleString()}\n`;
        });

        const shippingCost = totalPrice >= 5000 ? 0 : 199;
        const finalTotal = totalPrice + shippingCost;

        message += `----------------\nSubtotal: ₹${totalPrice.toLocaleString()}\nShipping: ${shippingCost === 0 ? 'Free' : `₹${shippingCost}`}\n*Total: ₹${finalTotal.toLocaleString()}*\n----------------\nPlease confirm my order.`;

        // 2. Redirect to WhatsApp
        // Using the placeholder number from CTA.jsx, should be updated to real business number
        const phoneNumber = '919876543210';
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

        window.open(whatsappUrl, '_blank');
        setIsSubmitting(false);
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[85vh] flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                            <h2 className="text-xl font-display font-bold text-gray-900">Checkout Details</h2>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-gray-700"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="p-6 overflow-y-auto">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className={`w-full px-4 py-3 rounded-lg border ${errors.name ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:ring-green-200'} focus:outline-none focus:ring-2 transition-all`}
                                        placeholder="Enter your name"
                                    />
                                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number *</label>
                                    <input
                                        type="tel"
                                        value={formData.mobile}
                                        onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                                        className={`w-full px-4 py-3 rounded-lg border ${errors.mobile ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:ring-green-200'} focus:outline-none focus:ring-2 transition-all`}
                                        placeholder="Enter 10-digit mobile number"
                                    />
                                    {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Address *</label>
                                    <textarea
                                        value={formData.address}
                                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                        className={`w-full px-4 py-3 rounded-lg border ${errors.address ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:ring-green-200'} focus:outline-none focus:ring-2 transition-all resize-none h-24`}
                                        placeholder="Enter full address (House No, Street, Area)"
                                    />
                                    {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                                        <input
                                            type="text"
                                            value={formData.city}
                                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                            className={`w-full px-4 py-3 rounded-lg border ${errors.city ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:ring-green-200'} focus:outline-none focus:ring-2 transition-all`}
                                            placeholder="City"
                                        />
                                        {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Pincode *</label>
                                        <input
                                            type="text"
                                            value={formData.pincode}
                                            onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                                            className={`w-full px-4 py-3 rounded-lg border ${errors.pincode ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:ring-green-200'} focus:outline-none focus:ring-2 transition-all`}
                                            placeholder="Pincode"
                                        />
                                        {errors.pincode && <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-6 border-t border-gray-100 bg-gray-50/50">
                            <button
                                onClick={handlePlaceOrder}
                                disabled={isSubmitting}
                                className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        Place Order on WhatsApp
                                    </>
                                )}
                            </button>
                            <p className="text-center text-xs text-gray-500 mt-3">
                                You will be redirected to WhatsApp to send the order details.
                            </p>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default CheckoutModal;
