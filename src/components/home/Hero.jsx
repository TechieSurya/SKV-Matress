import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Leaf, Award, Truck } from 'lucide-react';
import heroImage from '@/assets/hero-new.png';

const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-cream via-background to-sage/10" />

            {/* Subtle Grid */}
            <div className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(#445c3c 1px, transparent 1px), linear-gradient(to right, #445c3c 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}
            />

            {/* Soft Organic Blobs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] bg-sage/20 rounded-full blur-[120px] mix-blend-multiply animate-pulse" style={{ animationDuration: '8s' }} />
                <div className="absolute top-[20%] -right-[10%] w-[60%] h-[60%] bg-gold/10 rounded-full blur-[100px] mix-blend-multiply animate-pulse" style={{ animationDuration: '10s', animationDelay: '1s' }} />
                <div className="absolute -bottom-[20%] left-[20%] w-[50%] h-[50%] bg-cream/80 rounded-full blur-[100px] mix-blend-overlay" />
            </div>

            {/* Wave Decoration */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />

            <div className="container mx-auto px-6 md:px-12 lg:px-20 pt-36 md:pt-44 lg:pt-48 pb-16 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-6 md:space-y-8 text-center lg:text-left"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/50 backdrop-blur-sm border border-sage/20 rounded-full shadow-sm mx-auto lg:mx-0">
                            <Leaf className="w-4 h-4 text-forest" />
                            <span className="text-sm font-medium text-forest-800">
                                100% Natural & Eco-Friendly
                            </span>
                        </div>

                        <h1 className="font-display text-4xl md:text-5xl lg:text-7xl font-bold text-foreground leading-tight">
                            Sleep in{' '}
                            <span className="text-primary relative inline-block">
                                Pure
                                <svg className="absolute -bottom-2 left-0 w-full h-3 text-gold/60 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                                    <motion.path
                                        d="M0 5 Q 50 10 100 5"
                                        stroke="currentColor"
                                        strokeWidth="8"
                                        fill="none"
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        animate={{ pathLength: 1, opacity: 1 }}
                                        transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
                                    />
                                </svg>
                            </span>
                            <br />
                            Natural Comfort
                        </h1>

                        <p className="text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed mx-auto lg:mx-0">
                            Experience the timeless tradition of Ilavam Panju cotton. Handcrafted
                            mattresses & pillows that embrace you with nature's finest comfort —
                            chemical-free, breathable, and built to last.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Link to="/products">
                                <button className="group w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 font-medium text-lg">
                                    Shop Collection
                                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </Link>
                            <Link to="/about">
                                <button className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 border border-input bg-background/50 backdrop-blur-sm hover:bg-accent hover:text-accent-foreground rounded-full font-medium text-lg transition-all duration-300">
                                    Our Story
                                </button>
                            </Link>
                        </div>

                        {/* Trust Badges */}
                        <div className="flex flex-wrap gap-4 md:gap-6 pt-4 justify-center lg:justify-start">
                            {[
                                { icon: Leaf, label: '100% Organic' },
                                { icon: Award, label: '5-Year Warranty' },
                                { icon: Truck, label: 'Free Shipping' },
                            ].map((badge) => (
                                <div key={badge.label} className="flex items-center gap-2 bg-white/40 px-3 py-2 rounded-full border border-white/50 shadow-sm">
                                    <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                                        <badge.icon className="w-4 h-4 text-primary" />
                                    </div>
                                    <span className="text-sm font-medium text-foreground">
                                        {badge.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Hero Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative mt-8 lg:mt-0"
                    >
                        <div className="relative aspect-[4/3] max-w-lg mx-auto">
                            {/* Decorative Elements */}
                            <div className="absolute inset-0 bg-gradient-to-br from-sage/40 to-accent rounded-[2rem] md:rounded-[3rem] rotate-3" />
                            <div className="absolute inset-2 md:inset-4 rounded-[1.5rem] md:rounded-[2.5rem] shadow-elevated overflow-hidden bg-white">
                                <img
                                    src={heroImage}
                                    alt="Premium Ilavam Panju natural cotton mattress in a beautiful bedroom"
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                                />
                            </div>

                            {/* Floating Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6, duration: 0.6 }}
                                className="absolute -bottom-4 -left-2 md:-bottom-6 md:-left-6 bg-cotton-white p-3 md:p-4 rounded-2xl shadow-elevated max-w-[160px] md:max-w-none"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary flex items-center justify-center shrink-0">
                                        <span className="text-primary-foreground font-bold text-sm md:text-base">4.9</span>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-foreground text-sm md:text-base">Excellent</p>
                                        <p className="text-[10px] md:text-xs text-muted-foreground">2000+ Reviews</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
