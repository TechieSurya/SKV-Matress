import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Leaf, Heart, Shield, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const BrandStory = () => {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <section className="py-12 lg:py-20 bg-gradient-to-b from-cream-50 via-white to-cream-50 relative overflow-hidden">
            {/* Subtle pattern overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />

            <div className="container mx-auto px-4 md:px-12 lg:px-20 relative z-10">
                <div className="max-w-3xl mx-auto text-center mb-10 lg:mb-14">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white/50 backdrop-blur-sm border border-sage/20 rounded-full shadow-sm mb-6 lg:mb-8"
                    >
                        <Leaf className="w-4 h-4 text-forest" />
                        <span className="text-sm font-medium text-forest-800">
                            100% Natural & Eco-Friendly
                        </span>
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-forest-900 leading-tight mb-6 lg:mb-8"
                    >
                        The SKV Natural Beds
                        <span className="block text-gold-600 relative inline-block ml-2 lg:ml-3">
                            Promise
                            <svg className="absolute -bottom-2 lg:-bottom-3 left-0 w-full h-3 lg:h-4 text-gold/60 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <motion.path
                                    d="M0 5 Q 50 10 100 5"
                                    stroke="currentColor"
                                    strokeWidth="8"
                                    fill="none"
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    whileInView={{ pathLength: 1, opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1, delay: 0.8, ease: "easeInOut" }}
                                />
                            </svg>
                        </span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="text-base lg:text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto font-light px-4"
                    >
                        For over three decades, our family has been dedicated to crafting the finest natural cotton bedding.
                        Each mattress tells a story of tradition, quality, and an unwavering commitment to your well-being.
                    </motion.p>
                </div>

                {/* Video Section */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative max-w-3xl mx-auto mb-12 lg:mb-20"
                >
                    <div className="relative rounded-2xl lg:rounded-[2rem] overflow-hidden shadow-2xl aspect-video bg-black border-4 lg:border-[6px] border-white shadow-gold-900/5">
                        <AnimatePresence mode="wait">
                            {!isPlaying ? (
                                <motion.div
                                    key="thumbnail"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="relative w-full h-full group cursor-pointer"
                                    onClick={() => setIsPlaying(true)}
                                >
                                    <img
                                        src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=90"
                                        alt="Premium bedroom with natural cotton mattress"
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-500" />

                                    {/* Play Button */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                        <motion.div
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="w-16 h-16 lg:w-20 lg:h-20 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-xl shadow-black/10 transition-all duration-300 group-hover:bg-white"
                                        >
                                            <Play className="w-6 h-6 lg:w-8 lg:h-8 text-gold-600 ml-1" />
                                        </motion.div>
                                        <div className="absolute inset-0 rounded-full border border-white/30 animate-ping" />
                                    </div>

                                    {/* Badge */}
                                    <div className="absolute bottom-4 left-4 lg:bottom-6 lg:left-6 bg-white/90 backdrop-blur-md px-4 py-2 lg:px-6 lg:py-3 rounded-xl lg:rounded-2xl shadow-lg border border-white/50">
                                        <span className="text-forest-900 font-serif text-xs lg:text-base tracking-wide">Watch Our Story</span>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="video"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="w-full h-full"
                                >
                                    <iframe
                                        width="100%"
                                        height="100%"
                                        src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=AdzK-dJ3X3v3x3v3&autoplay=1"
                                        title="YouTube video player"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        referrerPolicy="strict-origin-when-cross-origin"
                                        allowFullScreen
                                        className="w-full h-full object-cover"
                                    ></iframe>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Floating accent */}
                    <div className="absolute -bottom-10 -right-10 lg:-bottom-20 lg:-right-20 w-32 h-32 lg:w-64 lg:h-64 bg-gold-400/20 rounded-full blur-[60px] lg:blur-[100px] -z-10" />
                    <div className="absolute -top-10 -left-10 lg:-top-20 lg:-left-20 w-32 h-32 lg:w-64 lg:h-64 bg-sage-400/20 rounded-full blur-[60px] lg:blur-[100px] -z-10" />
                </motion.div>

                <div className="text-center">
                    <Link to="/products">
                        <button className="group inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 font-medium text-lg">
                            Shop Collection
                            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default BrandStory;
