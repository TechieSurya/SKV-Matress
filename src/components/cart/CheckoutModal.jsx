import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Loader2,
  MapPin,
  Phone,
  User,
  Building,
  Send,
  Box,
  ShieldCheck,
  ShoppingBag,
} from "lucide-react";

const CheckoutModal = ({ isOpen, onClose, items, totalPrice }) => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    address: "",
    city: "",
    pincode: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.mobile.replace(/\D/g, ""))) {
      newErrors.mobile = "Enter a valid 10-digit mobile number";
    }
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.pincode.trim()) newErrors.pincode = "Pincode is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = () => {
    if (!validate()) return;
    setIsSubmitting(true);

    let message = `*New Order Request*\n----------------\n*Customer Details:*\nName: ${formData.name}\nMobile: ${formData.mobile}\nAddress: ${formData.address}, ${formData.city} - ${formData.pincode}\n----------------\n*Order Summary:*\n`;

    items.forEach((item, index) => {
      message += `${index + 1}. ${item.product.name} (Size: ${
        item.selectedSize
      }${item.selectedThickness ? `, ${item.selectedThickness}` : ""}) x ${
        item.quantity
      } - ₹${item.totalPrice.toLocaleString()}\n`;
    });

    const shippingCost = totalPrice >= 5000 ? 0 : 199;
    const finalTotal = totalPrice + shippingCost;

    message += `----------------\nSubtotal: ₹${totalPrice.toLocaleString()}\nShipping: ${
      shippingCost === 0 ? "Free" : `₹${shippingCost}`
    }\n*Total: ₹${finalTotal.toLocaleString()}*\n----------------\nPlease confirm my order.`;

    const phoneNumber = "919876543210";
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
    setIsSubmitting(false);
    onClose();
  };

  const InputField = ({ label, icon: Icon, error, ...props }) => (
    <div className="relative group">
      {/* Updated Label Color to match brand green */}
      <label className="block text-xs font-bold text-[#3D5A2D] uppercase tracking-wider mb-1.5 ml-1 opacity-80">
        {label}
      </label>
      <div className="relative">
        {/* Updated Icon Color */}
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#3D5A2D]/40 group-focus-within:text-[#3D5A2D] transition-colors">
          <Icon className="w-5 h-5" />
        </div>
        <input
          {...props}
          className={`w-full pl-12 pr-4 py-3.5 rounded-2xl border bg-white transition-all duration-300 outline-none shadow-sm
                    ${
                      error
                        ? "border-red-300 focus:border-red-500 ring-red-50"
                        : "border-slate-200 hover:border-emerald-200 focus:border-[#3D5A2D] focus:ring-4 focus:ring-emerald-500/5"
                    }`}
        />
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-red-500 text-xs mt-1.5 ml-1 font-medium italic"
        >
          * {error}
        </motion.p>
      )}
    </div>
  );

  const shippingCost = totalPrice >= 5000 ? 0 : 199;
  const finalTotal = totalPrice + shippingCost;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-0 sm:p-4 overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-emerald-950/40 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="relative w-full max-w-2xl bg-[#F8FAF9] sm:rounded-[32px] rounded-t-[32px] shadow-2xl overflow-hidden max-h-[95vh] flex flex-col border border-white"
          >
            {/* Header */}
            <div className="px-8 py-6 flex items-center justify-between bg-white border-b border-emerald-50">
              <div className="flex items-center gap-3">
                {/* Updated Icon Background and Color */}
                <div className="p-2 bg-emerald-50 rounded-xl text-[#3D5A2D]">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#3D5A2D] tracking-tight">
                    Checkout
                  </h2>
                  <p className="text-xs text-[#596d38] font-medium">
                    Complete your natural sleep setup
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-red-50 rounded-full transition-colors text-slate-400 hover:text-red-500"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="overflow-y-auto flex-1">
              <div className="p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Form Section */}
                <div className="lg:col-span-7 space-y-5">
                  <h3 className="text-sm font-bold text-[#3D5A2D]/40 uppercase tracking-widest mb-2">
                    Shipping Information
                  </h3>
                  <InputField
                    label="Full Name"
                    icon={User}
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    error={errors.name}
                  />
                  <InputField
                    label="Mobile"
                    icon={Phone}
                    type="tel"
                    placeholder="10-digit number"
                    value={formData.mobile}
                    onChange={(e) =>
                      setFormData({ ...formData, mobile: e.target.value })
                    }
                    error={errors.mobile}
                    maxLength={10}
                  />

                  <div className="relative group">
                    <label className="block text-xs font-bold text-[#3D5A2D] uppercase tracking-wider mb-1.5 ml-1 opacity-80">
                      Address
                    </label>
                    <div className="relative">
                      <div className="absolute top-4 left-4 text-[#3D5A2D]/40">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <textarea
                        value={formData.address}
                        onChange={(e) =>
                          setFormData({ ...formData, address: e.target.value })
                        }
                        className={`w-full pl-12 pr-4 py-3.5 rounded-2xl border transition-all h-24 resize-none outline-none shadow-sm ${
                          errors.address
                            ? "border-red-300"
                            : "border-slate-200 focus:border-[#3D5A2D]"
                        }`}
                        placeholder="Street, Landmark, House No."
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <InputField
                      label="City"
                      icon={Building}
                      type="text"
                      placeholder="City"
                      value={formData.city}
                      onChange={(e) =>
                        setFormData({ ...formData, city: e.target.value })
                      }
                      error={errors.city}
                    />
                    <InputField
                      label="Pincode"
                      icon={MapPin}
                      type="text"
                      placeholder="6-digits"
                      value={formData.pincode}
                      onChange={(e) =>
                        setFormData({ ...formData, pincode: e.target.value })
                      }
                      error={errors.pincode}
                      maxLength={6}
                    />
                  </div>
                </div>

                {/* Order Summary Section */}
                <div className="lg:col-span-5">
                  <div className="bg-white rounded-[24px] p-5 border border-emerald-100 shadow-sm sticky top-0">
                    <h3 className="text-sm font-bold text-[#3D5A2D]/40 uppercase tracking-widest mb-4">
                      Order Summary
                    </h3>

                    <div className="space-y-4 max-h-60 overflow-y-auto mb-6 pr-2">
                      {items.map((item, index) => (
                        <div key={index} className="flex gap-3 items-center">
                          <div className="w-14 h-14 rounded-xl bg-emerald-50 overflow-hidden flex-shrink-0 border border-emerald-100">
                            {item.product.images?.[0] || item.product.image ? (
                              <img
                                src={
                                  item.product.images?.[0] || item.product.image
                                }
                                alt=""
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-emerald-200">
                                <Box className="w-6 h-6" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-[#3D5A2D] truncate leading-tight">
                              {item.product.name}
                            </p>
                            <p className="text-[11px] text-[#596d38] font-medium">
                              Qty: {item.quantity} • {item.selectedSize}
                            </p>
                          </div>
                          <p className="text-sm font-bold text-[#3D5A2D]">
                            ₹{item.totalPrice.toLocaleString()}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2 border-t border-dashed border-emerald-100 pt-4">
                      <div className="flex justify-between text-sm text-[#3D5A2D]/60 font-medium">
                        <span>Subtotal</span>
                        <span>₹{totalPrice.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm text-[#3D5A2D]/60 font-medium">
                        <span>Shipping</span>
                        <span
                          className={
                            shippingCost === 0
                              ? "text-emerald-600 font-bold"
                              : ""
                          }
                        >
                          {shippingCost === 0 ? "FREE" : `₹${shippingCost}`}
                        </span>
                      </div>
                      <div className="flex justify-between text-lg font-black text-[#3D5A2D] pt-2 uppercase tracking-tight">
                        <span>Total</span>
                        <span>₹{finalTotal.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-8 bg-white border-t border-emerald-50">
              <button
                onClick={handlePlaceOrder}
                disabled={isSubmitting}
                className="w-full bg-[#596d38] hover:bg-[#5a752f] text-white font-bold py-5
                 rounded-2xl shadow-xl shadow-[#3D5A2D]/10 transition-all active:scale-[0.98] 
                 flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  <>
                    <Send className="w-5 h-5" /> Confirm & Order via WhatsApp
                  </>
                )}
              </button>
              <div className="mt-4 flex items-center justify-center gap-2 text-[#3D5A2D]/40
               font-bold text-[10px] uppercase tracking-widest">
                <ShieldCheck className="w-4 h-4" /> Secure Order Confirmation
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CheckoutModal;