import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X, ChevronRight, Phone, Instagram, Facebook } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';
import logo from '@/assets/logo.png';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { totalItems } = useCart();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsMobileMenuOpen(false);
        document.body.style.overflow = 'unset';
    }, [location]);

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isMobileMenuOpen]);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Products', path: '/products' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <>
            <header
                className={cn(
                    'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out',
                    isScrolled || isMobileMenuOpen
                        ? 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-emerald-50'
                        : 'bg-transparent py-4'
                )}
            >
                <div className="container mx-auto px-6 md:px-12 lg:px-20">
                    <nav className={cn(
                        "flex items-center justify-between transition-all duration-500",
                        isScrolled ? "h-20" : "h-24"
                    )}>
                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-4 group relative z-50">
                            <div className="relative">
                                <div className="absolute inset-0 bg-white rounded-full shadow-sm" />
                                <img
                                    src={logo}
                                    alt="SKV Natural Beds"
                                    className={cn(
                                        "rounded-full object-contain transition-all duration-500 border-2 border-emerald-800/10 relative z-10 bg-white",
                                        isScrolled ? "w-16 h-16 md:w-18 md:h-18" : "w-20 h-20 md:w-22 md:h-22"
                                    )}
                                />
                            </div>
                            <div className="flex flex-col">
                                <span className={cn(
                                    "font-display font-bold text-emerald-950 leading-tight transition-all duration-500",
                                    isScrolled ? "text-xl" : "text-2xl"
                                )}>
                                    SKV Natural Beds
                                </span>
                                <span className="text-[10px] text-emerald-800/60 tracking-[0.2em] uppercase font-bold">
                                    Natural Comfort
                                </span>
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-10">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={cn(
                                        'text-sm font-bold transition-all duration-300 relative group py-2 px-1',
                                        location.pathname === link.path
                                            ? 'text-emerald-800'
                                            : 'text-slate-600 hover:text-emerald-800'
                                    )}
                                >
                                    {link.name}
                                    <span className={cn(
                                        "absolute bottom-0 left-0 w-full h-0.5 bg-emerald-800 transform origin-left transition-transform duration-300 ease-out",
                                        location.pathname === link.path ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                                    )} />
                                </Link>
                            ))}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-6 relative z-50">
                            <Link to="/cart" className="relative group p-2">
                                <div className="relative">
                                    {/* Shopping Bag Icon */}
                                    <ShoppingBag className="w-6 h-6 text-emerald-950 group-hover:text-emerald-700 transition-colors stroke-[1.5]" />
                                    
                                    {/* UPDATED: Notification Badge to match image */}
                                    {totalItems > 0 && (
                                        <motion.span
                                            initial={{ scale: 0, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            className="absolute -top-1.5 -right-2 w-[18px] h-[18px] bg-[#3D5A2D] text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white shadow-sm"
                                        >
                                            {totalItems}
                                        </motion.span>
                                    )}
                                </div>
                            </Link>

                            {/* Mobile Menu Toggle */}
                            <button
                                className="md:hidden p-2 hover:bg-emerald-50 rounded-full transition-colors"
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                aria-label="Toggle menu"
                            >
                                <motion.div
                                    animate={isMobileMenuOpen ? "open" : "closed"}
                                    className="w-8 h-8 flex items-center justify-center"
                                >
                                    {isMobileMenuOpen ? (
                                        <X className="w-6 h-6 text-emerald-950" />
                                    ) : (
                                        <Menu className="w-6 h-6 text-emerald-950" />
                                    )}
                                </motion.div>
                            </button>
                        </div>
                    </nav>
                </div>
            </header>

            {/* Premium Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-40 bg-background/98 backdrop-blur-2xl md:hidden flex flex-col pt-32"
                    >
                        <div className="container mx-auto px-6 flex-1 flex flex-col">
                            <div className="flex-1 py-8 space-y-4">
                                {navLinks.map((link, index) => (
                                    <motion.div
                                        key={link.path}
                                        initial={{ opacity: 0, x: -30 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 + 0.1, type: "spring", stiffness: 100 }}
                                    >
                                        <Link
                                            to={link.path}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className={cn(
                                                'flex items-center justify-between px-6 py-5 rounded-2xl text-2xl font-display font-medium transition-all duration-300 border border-transparent',
                                                location.pathname === link.path
                                                    ? 'bg-emerald-50 text-emerald-800 border-emerald-100 shadow-sm'
                                                    : 'hover:bg-muted/50 text-foreground/80'
                                            )}
                                        >
                                            {link.name}
                                            <ChevronRight className={cn(
                                                "w-6 h-6 transition-transform duration-300",
                                                location.pathname === link.path ? "text-emerald-800 translate-x-1" : "text-muted-foreground/50"
                                            )} />
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>

                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="pb-12 space-y-8"
                            >
                                <Link to="/products" onClick={() => setIsMobileMenuOpen(false)}>
                                    <button className="w-full py-5 bg-emerald-800 text-white rounded-2xl font-medium shadow-xl shadow-emerald-900/10 active:scale-95 transition-all duration-300 text-lg flex items-center justify-center gap-2">
                                        Shop Collection
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </Link>

                                <div className="flex justify-center gap-10 pt-6 border-t border-border/50">
                                    <a href="#" className="p-4 bg-muted/50 rounded-full text-muted-foreground hover:bg-emerald-800 hover:text-white transition-all duration-300 hover:scale-110">
                                        <Instagram className="w-6 h-6" />
                                    </a>
                                    <a href="#" className="p-4 bg-muted/50 rounded-full text-muted-foreground hover:bg-emerald-800 hover:text-white transition-all duration-300 hover:scale-110">
                                        <Facebook className="w-6 h-6" />
                                    </a>
                                    <a href="tel:+919876543210" className="p-4 bg-muted/50 rounded-full text-muted-foreground hover:bg-emerald-800 hover:text-white transition-all duration-300 hover:scale-110">
                                        <Phone className="w-6 h-6" />
                                    </a>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;