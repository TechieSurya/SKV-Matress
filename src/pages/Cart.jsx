import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Package } from 'lucide-react';
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
                <Helmet>
                    <title>Your Cart | Ilavam Panju</title>
                </Helmet>

                <div className="min-h-screen bg-background">
                    <Navbar />
                    <main className="pt-24 pb-16">
                        <div className="container mx-auto px-6 md:px-12 lg:px-20">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="max-w-lg mx-auto text-center py-16"
                            >
                                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                                    <ShoppingBag className="w-12 h-12 text-muted-foreground" />
                                </div>
                                <h1 className="font-display text-3xl font-bold text-foreground mb-4">
                                    Your Cart is Empty
                                </h1>
                                <p className="text-muted-foreground mb-8">
                                    Looks like you haven't added any products yet. Start shopping to find your perfect natural comfort.
                                </p>
                                <Link to="/products">
                                    <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8">
                                        Browse Products
                                        <ArrowRight className="w-5 h-5 ml-2" />
                                    </button>
                                </Link>
                            </motion.div>
                        </div>
                    </main>
                    <Footer />
                </div>
            </>
        );
    }

    return (
        <>
            <Helmet>
                <title>{`Your Cart (${totalItems}) | Ilavam Panju`}</title>
            </Helmet>

            <div className="min-h-screen bg-background">
                <Navbar />

                <main className="pt-32 md:pt-36 pb-16">
                    <div className="container mx-auto px-6 md:px-12 lg:px-20">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-8"
                        >
                            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                                Your Cart
                            </h1>
                            <p className="text-muted-foreground mt-2">{totalItems} item{totalItems !== 1 && 's'}</p>
                        </motion.div>

                        <div className="grid lg:grid-cols-3 gap-8">
                            {/* Cart Items */}
                            <div className="lg:col-span-2 space-y-4">
                                {items.map((item, index) => (
                                    <motion.div
                                        key={`${item.product.id}-${item.selectedSize}`}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="bg-cotton-white rounded-2xl p-6 shadow-card"
                                    >
                                        <div className="flex gap-6">
                                            {/* Product Image */}
                                            <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-cream to-muted flex items-center justify-center flex-shrink-0 overflow-hidden">
                                                {item.product.images && item.product.images[0] ? (
                                                    <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <Package className="w-10 h-10 text-primary" />
                                                )}
                                            </div>

                                            {/* Product Info */}
                                            <div className="flex-1 min-w-0">
                                                <Link
                                                    to={`/products/${item.product.id}`}
                                                    className="font-display text-lg font-semibold text-foreground hover:text-primary transition-colors line-clamp-1"
                                                >
                                                    {item.product.name}
                                                </Link>
                                                <p className="text-sm text-muted-foreground mt-1">
                                                    Size: {item.selectedSize}
                                                    {item.selectedThickness && ` • Thickness: ${item.selectedThickness}`}
                                                </p>

                                                <div className="flex items-center justify-between mt-4">
                                                    {/* Quantity Controls */}
                                                    <div className="flex items-center border border-border rounded-lg">
                                                        <button
                                                            onClick={() =>
                                                                updateQuantity(item.product.id, item.selectedSize, item.quantity - 1)
                                                            }
                                                            className="p-2 hover:bg-muted transition-colors"
                                                        >
                                                            <Minus className="w-4 h-4" />
                                                        </button>
                                                        <span className="w-10 text-center font-medium">{item.quantity}</span>
                                                        <button
                                                            onClick={() =>
                                                                updateQuantity(item.product.id, item.selectedSize, item.quantity + 1)
                                                            }
                                                            className="p-2 hover:bg-muted transition-colors"
                                                        >
                                                            <Plus className="w-4 h-4" />
                                                        </button>
                                                    </div>

                                                    {/* Price & Remove */}
                                                    <div className="flex items-center gap-4">
                                                        <span className="text-xl font-bold text-primary">
                                                            ₹{item.totalPrice.toLocaleString()}
                                                        </span>
                                                        <button
                                                            onClick={() => removeFromCart(item.product.id, item.selectedSize)}
                                                            className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                                                        >
                                                            <Trash2 className="w-5 h-5" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Order Summary */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="lg:sticky lg:top-24 h-fit"
                            >
                                <div className="bg-cotton-white rounded-2xl p-6 shadow-card">
                                    <h2 className="font-display text-xl font-semibold text-foreground mb-6">
                                        Order Summary
                                    </h2>

                                    <div className="space-y-4 mb-6">
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Subtotal</span>
                                            <span className="font-medium text-foreground">
                                                ₹{totalPrice.toLocaleString()}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Shipping</span>
                                            <span className="font-medium text-foreground">
                                                {shippingCost === 0 ? (
                                                    <span className="text-primary">Free</span>
                                                ) : (
                                                    `₹${shippingCost}`
                                                )}
                                            </span>
                                        </div>
                                        {shippingCost > 0 && (
                                            <p className="text-xs text-muted-foreground">
                                                Add ₹{(5000 - totalPrice).toLocaleString()} more for free shipping
                                            </p>
                                        )}
                                    </div>

                                    <div className="border-t border-border pt-4 mb-6">
                                        <div className="flex justify-between">
                                            <span className="text-lg font-semibold text-foreground">Total</span>
                                            <span className="text-2xl font-bold text-primary">
                                                ₹{finalTotal.toLocaleString()}
                                            </span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => setIsCheckoutOpen(true)}
                                        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8 w-full mb-4"
                                    >
                                        Proceed to Checkout
                                        <ArrowRight className="w-5 h-5 ml-2" />
                                    </button>

                                    <Link to="/products" className="block">
                                        <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8 w-full">
                                            Continue Shopping
                                        </button>
                                    </Link>
                                </div>
                            </motion.div>
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
