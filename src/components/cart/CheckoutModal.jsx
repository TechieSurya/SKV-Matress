import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, MapPin, Phone, User, Building, Send } from 'lucide-react';

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
        const phoneNumber = '919876543210';
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

        window.open(whatsappUrl, '_blank');
        setIsSubmitting(false);
        onClose();
    };

    const InputField = ({ label, icon: Icon, error, ...props }) => (
        <div className="relative group">
            <label className="block text-sm font-medium text-forest-900 mb-1.5 ml-1">{label}</label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-gold-500 transition-colors">
                    <Icon className="w-5 h-5" />
                </div>
                <input
                    {...props}
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 bg-white/50 backdrop-blur-sm transition-all duration-300 outline-none
                    ${error
                            ? 'border-red-200 focus:border-red-500 focus:ring-4 focus:ring-red-500/10'
                            : 'border-sage-100 hover:border-gold-300 focus:border-gold-500 focus:ring-4 focus:ring-gold-500/10'
                        }`}
                />
            </div>
            {error && (
                <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-xs mt-1.5 ml-1 font-medium"
                >
                    {error}
                </motion.p>
            )}
        </div>
    );

    const shippingCost = totalPrice >= 5000 ? 0 : 199;
    const finalTotal = totalPrice + shippingCost;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center sm:p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-forest-950/60 backdrop-blur-md"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 100 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 100 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-lg bg-[#fafafa] sm:rounded-3xl rounded-t-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col border border-white/20"
                    >
                        {/* Header */}
                        <div className="px-6 py-5 border-b border-gray-100 bg-white sticky top-0 z-10 flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-serif font-bold text-forest-900">Checkout</h2>
                                <p className="text-sm text-gray-500 mt-0.5">Complete your order details</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2.5 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-red-500 group"
                            >
                                <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="p-6 overflow-y-auto space-y-6">
                            {/* Summary Card */}
                            <div className="bg-sage-50/50 rounded-2xl p-4 border border-sage-100 flex justify-between items-center">
                                <div>
                                    <p className="text-sm text-forest-700 font-medium opacity-80">Total Amount to Pay</p>
                                    <p className="text-2xl font-bold text-forest-900">₹{finalTotal.toLocaleString()}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-forest-600 bg-white px-2 py-1 rounded-md border border-sage-100 shadow-sm">
                                        {items.length} Item{items.length !== 1 && 's'}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <InputField
                                    label="Full Name"
                                    icon={User}
                                    type="text"
                                    placeholder="John Doe"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    error={errors.name}
                                />

                                <InputField
                                    label="Mobile Number"
                                    icon={Phone}
                                    type="tel"
                                    placeholder="98765 43210"
                                    value={formData.mobile}
                                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                                    error={errors.mobile}
                                    maxLength={10}
                                />

                                <div className="relative group">
                                    <label className="block text-sm font-medium text-forest-900 mb-1.5 ml-1">Delivery Address</label>
                                    <div className="relative">
                                        <div className="absolute top-3.5 left-3 pointer-events-none text-gray-400 group-focus-within:text-gold-500 transition-colors">
                                            <MapPin className="w-5 h-5" />
                                        </div>
                                        <textarea
                                            value={formData.address}
                                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                            className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 bg-white/50 backdrop-blur-sm transition-all duration-300 outline-none resize-none h-24
                                            ${errors.address
                                                    ? 'border-red-200 focus:border-red-500 focus:ring-4 focus:ring-red-500/10'
                                                    : 'border-sage-100 hover:border-gold-300 focus:border-gold-500 focus:ring-4 focus:ring-gold-500/10'
                                                }`}
                                            placeholder="House No, Street, Landmark..."
                                        />
                                    </div>
                                    {errors.address && <p className="text-red-500 text-xs mt-1.5 ml-1 font-medium">{errors.address}</p>}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <InputField
                                        label="City"
                                        icon={Building}
                                        type="text"
                                        placeholder="Coimbatore"
                                        value={formData.city}
                                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                        error={errors.city}
                                    />
                                    <InputField
                                        label="Pincode"
                                        icon={MapPin}
                                        type="text"
                                        placeholder="641001"
                                        value={formData.pincode}
                                        onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                                        error={errors.pincode}
                                        maxLength={6}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-6 border-t border-gray-100 bg-white sticky bottom-0 z-10 pb-8 sm:pb-6">
                            <button
                                onClick={handlePlaceOrder}
                                disabled={isSubmitting}
                                className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-4 rounded-xl shadow-lg shadow-green-500/20 hover:shadow-xl hover:shadow-green-500/30 transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed group relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Processing Order...
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-5 h-5" />
                                        Send Order via WhatsApp
                                    </>
                                )}
                            </button>
                            <p className="text-center text-xs text-gray-400 mt-4 flex items-center justify-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                Secure checkout via WhatsApp
                            </p>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default CheckoutModal;
