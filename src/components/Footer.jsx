import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube, ArrowRight } from 'lucide-react';
import logo from '@/assets/logo.png';

const Footer = () => {
    return (
        <footer className="bg-forest-900 text-white relative overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-10">
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-sage rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-gold rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-6 md:px-12 lg:px-20 pt-20 pb-10 relative z-10">


                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div className="space-y-6 lg:col-span-2">
                        <Link to="/" className="flex items-center gap-6">
                            <img
                                src={logo}
                                alt="SKV Natural Beds"
                                className="w-24 h-24 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.6)] border-2 border-white/50"
                            />
                            <div className="flex flex-col">
                                <span className="font-display text-2xl font-semibold leading-tight tracking-wide text-white whitespace-nowrap">
                                    SKV Natural Beds
                                </span>
                                <span className="text-xs text-sage-200 uppercase tracking-widest">Natural Comfort</span>
                            </div>
                        </Link>
                        <p className="text-sm text-sage-200 leading-relaxed max-w-xs">
                            Handcrafted natural cotton mattresses & pillows for your perfect sleep.
                            100% eco-friendly, chemical-free comfort since 1985.
                        </p>
                        <div className="flex gap-4">
                            {[Facebook, Instagram, Youtube].map((Icon, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold hover:text-forest-900 transition-all duration-300 text-white"
                                >
                                    <Icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-display text-xl font-semibold mb-6 text-gold">Quick Links</h4>
                        <ul className="space-y-4">
                            {[
                                { name: 'Mattresses', path: '/products?category=mattress' },
                                { name: 'Pillows', path: '/products?category=pillow' },
                                { name: 'Our Story', path: '/about' },
                                { name: 'Contact Us', path: '/contact' },
                            ].map((link) => (
                                <li key={link.path}>
                                    <Link
                                        to={link.path}
                                        className="text-sage-200 hover:text-gold hover:translate-x-1 transition-all inline-block"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>



                    {/* Contact */}
                    <div>
                        <h4 className="font-display text-xl font-semibold mb-6 text-gold">Get in Touch</h4>
                        <ul className="space-y-6">
                            <li className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 mt-1">
                                    <MapPin className="w-5 h-5 text-gold" />
                                </div>
                                <span className="text-white text-sm leading-relaxed">
                                    No. 2/630, RANGAN NAGAR, MYLAMBADI, BHAVANI, ERODE - 638 314
                                </span>
                            </li>
                            <li className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0">
                                    <Phone className="w-5 h-5 text-gold" />
                                </div>
                                <a href="tel:+919790343948" className="text-white hover:text-white transition-colors">
                                    +91 97903 43948
                                </a>
                            </li>
                            <li className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0">
                                    <Mail className="w-5 h-5 text-gold" />
                                </div>
                                <a href="mailto:skvnaturalbeds@gmail.com" className="text-white hover:text-white transition-colors">
                                    skvnaturalbeds@gmail.com
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-sage-300">
                    <p>
                        © 2025 SKV Natural Beds. All rights reserved.
                    </p>
                    <div className="flex gap-2">
                        Designed & Developed by <a href="#" className="hover:text-gold transition-colors">Dream2Way Solutions</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
