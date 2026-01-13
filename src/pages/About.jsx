import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Leaf, Award, Users, Heart, TreePine, Hand } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

import Sustainability from '@/components/about/Sustainability';
import Press from '@/components/about/Press';

import founderImage from '@/assets/founder.jpg';


const About = () => {
    const milestones = [
        { year: '1985', title: 'The Beginning', description: 'Started as a small family business in Coimbatore.' },
        { year: '1995', title: 'Growing Roots', description: 'Expanded to serve customers across Tamil Nadu.' },
        { year: '2010', title: 'National Reach', description: 'Began shipping to all major cities in India.' },
        { year: '2024', title: 'Digital Era', description: 'Bringing traditional comfort to your doorstep online.' },
    ];

    const values = [
        {
            icon: Leaf,
            title: '100% Natural',
            description: 'Pure Ilavam Panju sourced directly from trusted farmers.',
        },
        {
            icon: Hand,
            title: 'Handcrafted',
            description: 'Made by skilled artisans using traditional techniques.',
        },
        {
            icon: TreePine,
            title: 'Sustainable',
            description: 'Eco-friendly practices for a greener future.',
        },
        {
            icon: Heart,
            title: 'Made with Love',
            description: 'Commitment to your comfort and well-being.',
        },
    ];

    return (
        <>
            <Helmet>
                <title>About Us | SKV Natural Beds - Our Story</title>
                <meta
                    name="description"
                    content="Experience the legacy of SKV Natural Beds. Over 35 years of handcrafted excellence in pure Ilavam Panju mattresses, blending tradition with modern comfort."
                />
            </Helmet>

            <div className="min-h-screen bg-background font-sans text-foreground overflow-x-hidden">
                <Navbar />

                <main>
                    {/* Hero Section - Immersive & Premium */}
                    <section className="relative pt-36 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-cream-50/30">
                        {/* Background Elements */}
                        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-gold-50/30 to-transparent" />
                        <div className="absolute -top-24 -left-24 w-96 h-96 bg-sage-50/50 rounded-full blur-3xl opacity-60 mix-blend-multiply" />
                        <div className="absolute top-1/2 right-0 w-[30rem] h-[30rem] bg-gold-50/30 rounded-full blur-3xl opacity-50 mix-blend-multiply" />

                        <div className="container mx-auto px-6 relative z-10">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="max-w-4xl mx-auto text-center"
                            >
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.2, duration: 0.6 }}
                                    className="inline-flex items-center gap-2 py-1.5 px-4 border border-gold-200 rounded-full bg-white/80 backdrop-blur-sm text-gold-700 text-xs md:text-sm font-semibold tracking-widest uppercase mb-8 shadow-sm"
                                >
                                    <Award className="w-4 h-4" />
                                    <span>Since 1985</span>
                                </motion.div>

                                <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-forest-900 mb-8 leading-[1.1] tracking-tight">
                                    The Art of <br className="hidden md:block" />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-600 to-gold-500 italic pr-2">Natural Comfort</span>
                                </h1>

                                <p className="text-lg md:text-2xl text-sage-700 leading-relaxed max-w-2xl mx-auto font-light">
                                    Preserving the ancient tradition of Ilavam Panju mattress making.
                                    We believe true comfort comes from nature itself.
                                </p>
                            </motion.div>
                        </div>
                    </section>

                    {/* Story Section - Modern Split Layout */}
                    <section className="py-20 md:py-32 bg-white relative">
                        <div className="container mx-auto px-6 lg:px-12">
                            <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                                <motion.div
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.8 }}
                                    className="order-2 lg:order-1"
                                >
                                    <span className="text-gold-600 font-bold tracking-widest uppercase text-sm mb-4 block">Our Heritage</span>
                                    <h2 className="font-serif text-4xl md:text-5xl font-bold text-forest-900 mb-8 leading-tight">
                                        Generations of <span className="italic text-gold-600 block mt-2">Pure Craftsmanship</span>
                                    </h2>
                                    <div className="space-y-6 text-gray-600 leading-loose text-lg font-light">
                                        <p>
                                            <span className="text-forest-800 font-medium">Ilavam Panju</span> (Kapok silk cotton) has been treasured in South India for centuries.
                                            Our ancestors understood what modern science confirms today – natural cotton provides
                                            the perfect thermoregulation, hypoallergenic properties, and lasting support.
                                        </p>
                                        <p>
                                            Our founder, <strong className="text-forest-800 font-serif text-xl border-b-2 border-gold-200">Mr. Settu Kumar</strong>, passed down this intricate knowledge through generations.
                                            Today, we combine this traditional wisdom with modern quality standards to deliver
                                            products that are not just mattresses, but a legacy of sleep.
                                        </p>
                                    </div>

                                    <div className="mt-10 flex flex-wrap gap-4">
                                        <div className="px-6 py-4 bg-sage-50 rounded-xl flex items-center gap-3 border border-sage-100">
                                            <Leaf className="w-5 h-5 text-forest-600" />
                                            <span className="text-forest-800 font-medium">100% Organic</span>
                                        </div>
                                        <div className="px-6 py-4 bg-gold-50 rounded-xl flex items-center gap-3 border border-gold-100">
                                            <Hand className="w-5 h-5 text-gold-600" />
                                            <span className="text-gold-800 font-medium">Handcrafted</span>
                                        </div>
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8 }}
                                    className="relative order-1 lg:order-2"
                                >
                                    <div className="relative z-10">
                                        <div className="aspect-[3/4] md:aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl border-4 border-white">
                                            <img
                                                src={founderImage}
                                                alt="Mr. Settu Kumar - Founder"
                                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                                            />
                                            {/* Gradient Overlay for text readability if needed, though mostly using clean image */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                                        </div>

                                        {/* Floating Badge - Desktop */}
                                        <div className="absolute -bottom-10 -left-10 bg-white p-6 md:p-8 rounded-xl shadow-xl hidden md:block border border-gray-100 max-w-xs animate-float">
                                            <div className="flex items-start gap-4">
                                                <div className="p-3 bg-gold-50 rounded-full text-gold-600">
                                                    <Award className="w-8 h-8" />
                                                </div>
                                                <div>
                                                    <p className="font-serif text-3xl font-bold text-forest-900 leading-none mb-1">35+</p>
                                                    <p className="text-sm text-gray-500 uppercase tracking-wide font-medium">Years of Excellence</p>
                                                    <p className="text-xs text-gray-400 mt-2">Serving over 10,000+ happy families across India.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Decorative Background Pattern */}
                                    <div className="absolute -top-10 -right-10 w-full h-full border-2 border-gold-200/50 rounded-2xl -z-10 hidden md:block" />
                                    <div className="absolute -bottom-5 -left-5 w-40 h-40 bg-sage-100 rounded-full blur-2xl -z-10 mix-blend-multiply" />
                                </motion.div>
                            </div>
                        </div>
                    </section>

                    {/* Values Section - Glassmorphism & Modern */}
                    <section className="py-24 relative overflow-hidden">
                        {/* Background Gradients */}
                        <div className="absolute inset-0 bg-sage-50/50" />
                        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold-100/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-sage-200/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                        <div className="container mx-auto px-6 relative z-10">
                            <div className="text-center mb-20 max-w-2xl mx-auto">
                                <span className="text-gold-600 font-bold tracking-widest uppercase text-xs mb-3 block">Why Choose Us</span>
                                <h2 className="font-serif text-3xl md:text-5xl font-bold text-forest-900 mb-6">Values That Vouch For Us</h2>
                                <p className="text-gray-600 text-lg font-light">
                                    Rooted in tradition, driven by quality. These are the pillars that make every SKV mattress a masterpiece.
                                </p>
                            </div>

                            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {values.map((value, index) => (
                                    <motion.div
                                        key={value.title}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        whileHover={{ y: -10 }}
                                        className="bg-white/60 backdrop-blur-xl p-8 rounded-3xl border border-white/50 shadow-lg hover:shadow-2xl hover:bg-white transition-all duration-500 group"
                                    >
                                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-forest-50 to-sage-50 group-hover:from-gold-400 group-hover:to-gold-500 flex items-center justify-center mb-6 transition-all duration-500 shadow-inner group-hover:shadow-lg">
                                            <value.icon className="w-8 h-8 text-forest-800 group-hover:text-white transition-colors duration-500" />
                                        </div>
                                        <h3 className="font-serif text-xl font-bold text-forest-900 mb-3 group-hover:text-gold-600 transition-colors">{value.title}</h3>
                                        <p className="text-gray-500 text-sm leading-relaxed max-w-[90%]">{value.description}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Timeline Section - Improved Responsiveness */}
                    <section className="py-24 bg-white relative overflow-hidden">
                        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gray-100 to-transparent" />

                        {/* Decorative background element */}
                        <div className="absolute top-1/2 left-0 w-96 h-96 bg-gold-100/10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
                        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-sage-50/40 rounded-full blur-3xl translate-y-1/3 translate-x-1/3 pointer-events-none" />

                        <div className="container mx-auto px-6 relative z-10">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="text-center mb-20"
                            >
                                <span className="inline-block py-1 px-3 border border-sage-200 rounded-full bg-sage-50 text-sage-600 text-xs font-semibold tracking-wider uppercase mb-3">
                                    Milestones
                                </span>
                                <h2 className="font-serif text-3xl md:text-5xl font-bold text-forest-900 mb-6">Our Journey</h2>
                                <p className="text-gray-500 max-w-2xl mx-auto text-lg">From humble beginnings to your home, a timeline of our commitment to comfort.</p>
                            </motion.div>

                            <div className="max-w-4xl mx-auto relative px-4 md:px-0">
                                {/* Vertical Line - Adaptive */}
                                <div className="absolute left-8 md:left-1/2 top-10 bottom-10 w-0.5 bg-gradient-to-b from-transparent via-gold-300 to-transparent transform md:-translate-x-1/2 opacity-60" />

                                {milestones.map((milestone, index) => (
                                    <motion.div
                                        key={milestone.year}
                                        initial={{ opacity: 0, y: 40 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-100px" }}
                                        transition={{ delay: index * 0.1, duration: 0.6 }}
                                        className={`relative mb-16 md:mb-32 flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                                    >
                                        {/* Mobile: Space for line */}
                                        <div className="md:hidden pl-20 w-full relative">
                                            {/* Timeline Node - Mobile */}
                                            <div className="absolute left-[28px] top-6 w-5 h-5 rounded-full border-[3px] border-white bg-gold-500 shadow-md z-10 ring-4 ring-gold-100" />

                                            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xl shadow-gray-100/50 relative group hover:border-gold-200 transition-colors">
                                                <span className="block text-4xl font-serif font-bold text-gold-100 absolute -top-4 -right-2 z-0 select-none opacity-50">
                                                    {milestone.year}
                                                </span>
                                                <div className="relative z-10">
                                                    <span className="text-gold-600 font-bold mb-1 block text-sm">{milestone.year}</span>
                                                    <h3 className="text-lg font-bold text-forest-900 mb-2">{milestone.title}</h3>
                                                    <p className="text-gray-600 text-sm leading-relaxed">{milestone.description}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Desktop Content */}
                                        <div className="hidden md:block w-1/2 px-16 relative">
                                            <div className={`text-${index % 2 === 0 ? 'left' : 'right'} relative`}>
                                                <motion.div
                                                    whileHover={{ y: -5 }}
                                                    className="relative p-8 rounded-2xl bg-white border border-gray-50 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.12)] transition-all duration-300 z-20"
                                                >
                                                    <span className="block text-6xl font-serif font-bold text-gray-50 absolute -top-8 -right-4 z-0 pointer-events-none">
                                                        {milestone.year}
                                                    </span>
                                                    <div className="relative z-10">
                                                        <h3 className="text-2xl font-serif font-bold text-forest-900 mb-2">{milestone.title}</h3>
                                                        <p className="text-gray-600 leading-relaxed font-light">{milestone.description}</p>
                                                    </div>
                                                </motion.div>
                                            </div>
                                        </div>

                                        {/* Timeline Node - Desktop Center */}
                                        <div className="hidden md:flex absolute left-1/2 top-1/2 w-12 h-12 rounded-full border-[6px] border-white bg-gold-500 shadow-xl items-center justify-center transform -translate-x-1/2 -translate-y-1/2 z-10">
                                            <div className="w-3 h-3 bg-white rounded-full opacity-50" />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </section>


                    {/* Sustainability Section */}
                    <Sustainability />

                    {/* Press Section - Added for Credibility */}
                    <Press />

                    {/* Simple Stats Strip - Redesigned to be more cohesive */}
                    <section className="py-20 bg-forest-900 text-white relative overflow-hidden">
                        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                        <div className="container mx-auto px-6 relative z-10">
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                                {[
                                    { number: '10k+', label: 'Happy Customers', delay: 0 },
                                    { number: '35+', label: 'Years Legacy', delay: 0.1 },
                                    { number: '100%', label: 'Natural Material', delay: 0.2 },
                                    { number: '50+', label: 'Skilled Artisans', delay: 0.3 },
                                ].map((stat, i) => (
                                    <motion.div
                                        key={stat.label}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: stat.delay, duration: 0.5 }}
                                        className="p-4"
                                    >
                                        <div className="text-4xl md:text-5xl font-serif font-bold text-gold-400 mb-2">{stat.number}</div>
                                        <div className="text-xs md:text-sm text-forest-200 uppercase tracking-widest opacity-80">{stat.label}</div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </section>
                </main>

                <Footer />
            </div>
        </>
    );
};

export default About;
