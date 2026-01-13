import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Package, ShieldCheck, Truck } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import CheckoutModal from '@/components/cart/CheckoutModal';

const Cart = () => {
    const { items, updateQuantity, removeFromCart, totalPrice, totalItems } = useCart();
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

    const shippingCost = totalPrice >= 5000 ? 0 : 199;
    const finalTotal = totalPrice + shippingCost;

    if (items.length === 0) {
        return (
            <>
                <Helmet><title>Your Cart | SKV Natural Beds</title></Helmet>
                <div className="min-h-screen bg-[#FDFCFB]">
                    <Navbar />
                    <main className="pt-40 pb-20 text-center">
                        <ShoppingBag className="w-16 h-16 mx-auto mb-6 text-emerald-200" />
                        <h1 className="text-3xl font-bold text-emerald-950 mb-4">Your cart is empty</h1>
                        <Link to="/products" className="bg-emerald-800 text-white px-8 py-3 rounded-full font-bold inline-block">
                            Browse Collection
                        </Link>
                    </main>
                    <Footer />
                </div>
            </>
        );
    }

    return (
        <>
            <Helmet>
                <title>{`Cart (${totalItems}) | SKV Natural Beds`}</title>
            </Helmet>

            <div className="min-h-screen bg-[#FDFCFB]">
                <Navbar />

                <main className="pt-32 md:pt-40 pb-20">
                    <div className="container mx-auto px-6 lg:px-20">
                        <h1 className="font-display text-4xl font-bold text-[#1A2E1A] mb-10">Shopping Bag</h1>

                        <div className="grid lg:grid-cols-3 gap-12">
                            {/* Items List */}
                            <div className="lg:col-span-2 space-y-6">
                                {items.map((item, index) => {
                                    // FIXED IMAGE LOGIC: Checking all possible data structures
                                    const productImage = item.product.images?.[0] || item.product.image || item.product.img;

                                    return (
                                        <motion.div
                                            key={`${item.product.id}-${item.selectedSize}`}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="bg-white rounded-3xl p-5 border border-emerald-50 shadow-sm flex gap-6"
                                        >
                                            {/* Image Container */}
                                            <div className="w-28 h-28 md:w-32 md:h-32 rounded-2xl bg-emerald-50/50 overflow-hidden flex-shrink-0 border border-emerald-100">
                                                {productImage ? (
                                                    <img 
                                                        src={productImage} 
                                                        alt={item.product.name} 
                                                        className="w-full h-full object-cover" 
                                                        // Adding onError to catch broken paths
                                                        onError={(e) => { e.target.src = 'https://via.placeholder.com/150?text=No+Image'; }}
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-emerald-200">
                                                        <Package className="w-10 h-10" />
                                                    </div>
                                                )}
                                            </div>

                                            {/* Info */}
                                            <div className="flex-1 flex flex-col justify-between">
                                                <div className="flex justify-between">
                                                    <div>
                                                        <h3 className="font-bold text-lg text-emerald-950">{item.product.name}</h3>
                                                        <p className="text-xs font-semibold text-emerald-600 uppercase mt-1">
                                                            {item.selectedSize} {item.selectedThickness && `• ${item.selectedThickness} Inch`}
                                                        </p>
                                                    </div>
                                                    <button onClick={() => removeFromCart(item.product.id, item.selectedSize)} className="text-gray-300 hover:text-red-500 transition-colors">
                                                        <Trash2 className="w-5 h-5" />
                                                    </button>
                                                </div>

                                                <div className="flex items-center justify-between mt-4">
                                                    <div className="flex items-center bg-emerald-50 rounded-lg p-1">
                                                        <button onClick={() => updateQuantity(item.product.id, item.selectedSize, item.quantity - 1)} className="p-1 hover:bg-white rounded transition-all"><Minus className="w-4 h-4" /></button>
                                                        <span className="w-8 text-center font-bold">{item.quantity}</span>
                                                        <button onClick={() => updateQuantity(item.product.id, item.selectedSize, item.quantity + 1)} className="p-1 hover:bg-white rounded transition-all"><Plus className="w-4 h-4" /></button>
                                                    </div>
                                                    <span className="text-xl font-bold text-emerald-900">₹{item.totalPrice.toLocaleString()}</span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>

                            {/* Order Summary */}
                            <div className="lg:col-span-1">
                                <div className="bg-[#596d38] text-white rounded-[2rem] p-8 sticky 
                                top-32 shadow-xl shadow-emerald-900/20">
                                    <h2 className="text-xl font-bold mb-6">Summary</h2>
                                    <div className="space-y-4 mb-6 border-b border-white/10 pb-6">
                                        <div className="flex justify-between text-white/70"><span>Subtotal</span><span>₹{totalPrice.toLocaleString()}</span></div>
                                        <div className="flex justify-between text-white/70"><span>Shipping</span><span className="text-emerald-400">{shippingCost === 0 ? "FREE" : `₹${shippingCost}`}</span></div>
                                    </div>
                                    <div className="flex justify-between items-center mb-8">
                                        <span className="text-lg font-bold">Total</span>
                                        <span className="text-3xl font-black">₹{finalTotal.toLocaleString()}</span>
                                    </div>
                                    <button
                                        onClick={() => setIsCheckoutOpen(true)}
                                        className="w-full bg-white hover:bg-gray-200
                                         text-[#1A2E1A] py-4 rounded-xl font-black transition-all 
                                         flex items-center justify-center gap-2"
                                    >
                                        Proceed to Checkout <ArrowRight className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
                <CheckoutModal
                    isOpen={isCheckoutOpen}
                    onClose={() => setIsCheckoutOpen(false)}
                    items={items}
                    totalPrice={totalPrice}
                />
            </div>
        </>
    );
};

export default Cart;