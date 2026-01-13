import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Leaf, Award, Users, Heart, TreePine, Hand } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

import Sustainability from '@/components/about/Sustainability';

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
                    content="Learn about SKV Natural Beds' 35+ years of heritage in crafting natural cotton mattresses. Discover our commitment to traditional craftsmanship and eco-friendly practices."
                />
            </Helmet>

            <div className="min-h-screen bg-background font-sans text-foreground">
                <Navbar />

                <main>
                    {/* Hero Section - Clean & Minimal */}
                    <section className="relative pt-48 pb-32 overflow-hidden bg-cream-50">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/50" />

                        <div className="container mx-auto px-6 relative z-10 text-center">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="max-w-3xl mx-auto"
                            >
                                <span className="inline-block py-1 px-3 border border-gold-200 rounded-full bg-gold-50/50 text-gold-700 text-xs font-semibold tracking-wider uppercase mb-6">
                                    Since 1985
                                </span>
                                <h1 className="font-serif text-5xl md:text-7xl font-bold text-forest-900 mb-8 leading-tight">
                                    The Art of <br className="hidden md:block" />
                                    <span className="text-gold-600 italic">Natural Comfort</span>
                                </h1>
                                <p className="text-lg md:text-xl text-sage-600 leading-relaxed max-w-2xl mx-auto font-light">
                                    Preserving the ancient tradition of Ilavam Panju mattress making.
                                    True comfort comes from nature itself.
                                </p>
                            </motion.div>
                        </div>
                    </section>

                    {/* Story Section - Modern Split */}
                    <section className="py-24 bg-white relative">
                        <div className="container mx-auto px-6 lg:px-12">
                            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                                <motion.div
                                    initial={{ opacity: 0, x: -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8 }}
                                >
                                    <h2 className="font-serif text-4xl font-bold text-forest-900 mb-8">
                                        Generations of <span className="italic text-gold-600">Pure Craft</span>
                                    </h2>
                                    <div className="space-y-6 text-gray-600 leading-loose text-lg font-light">
                                        <p>
                                            Ilavam Panju, or natural silk cotton, has been treasured in South India for centuries.
                                            Our ancestors understood what modern science confirms today – natural cotton provides
                                            the perfect balance of support and softness.
                                        </p>
                                        <p>
                                            Our founder, <strong className="text-forest-800 font-semibold">Mr. Settu Kumar</strong>, passed down this knowledge through generations.
                                            Today, we combine this traditional wisdom with modern quality standards to deliver
                                            products that honor our heritage.
                                        </p>
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8 }}
                                    className="relative"
                                >


                                    <div className="aspect-[4/5] md:aspect-[4/3] overflow-hidden rounded-2xl shadow-elevated">
                                        <img
                                            src={founderImage}
                                            alt="Mr. Settu Kumar - Founder"
                                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                                        />
                                    </div>
                                    <div className="absolute -bottom-8 -left-8 bg-white p-8 rounded-xl shadow-card hidden md:block border border-gray-100">
                                        <div className="flex items-center gap-4">
                                            <Award className="w-10 h-10 text-gold-500" />
                                            <div>
                                                <p className="font-serif text-2xl font-bold text-forest-900">35+</p>
                                                <p className="text-sm text-gray-500 uppercase tracking-wide">Years of Excellence</p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </section>

                    {/* Values Section - Minimal Cards */}
                    <section className="py-24 bg-sage-50/50">
                        <div className="container mx-auto px-6">
                            <div className="text-center mb-16">
                                <h2 className="font-serif text-3xl md:text-4xl font-bold text-forest-900 mb-4">Our Core Values</h2>
                                <p className="text-gray-500">Principles that guide our every stitch.</p>
                            </div>

                            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                                {values.map((value, index) => (
                                    <motion.div
                                        key={value.title}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-card transition-all duration-300 text-center group"
                                    >
                                        <div className="w-14 h-14 mx-auto bg-green-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-gold-50 transition-colors">
                                            <value.icon className="w-6 h-6 text-forest-700 group-hover:text-gold-600 transition-colors" />
                                        </div>
                                        <h3 className="font-serif text-lg font-bold text-forest-900 mb-3">{value.title}</h3>
                                        <p className="text-gray-500 text-sm leading-relaxed">{value.description}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </section>



                    {/* Timeline Section - Premium Journey */}
                    <section className="py-24 bg-white relative overflow-hidden">
                        {/* Decorative background element */}
                        <div className="absolute top-1/2 left-0 w-64 h-64 bg-gold-500/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
                        <div className="absolute bottom-0 right-0 w-96 h-96 bg-sage-500/5 rounded-full blur-3xl translate-y-1/3 translate-x-1/3" />

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
                                <h2 className="font-serif text-3xl md:text-5xl font-bold text-forest-900 mb-4">Our Journey</h2>
                                <p className="text-gray-500 max-w-2xl mx-auto">From humble beginnings to your home, a timeline of our commitment to comfort.</p>
                            </motion.div>

                            <div className="max-w-5xl mx-auto relative">
                                {/* Central Spine - Desktop Gradient / Mobile Line */}
                                <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 md:-ml-[1px] bg-gradient-to-b from-transparent via-gold-300 to-transparent opacity-30 md:opacity-50" />

                                {milestones.map((milestone, index) => (
                                    <motion.div
                                        key={milestone.year}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-100px" }}
                                        transition={{ delay: index * 0.1, duration: 0.6 }}
                                        className={`relative mb-12 last:mb-0 md:mb-24 flex flex-col md:flex-row items-start ${index % 2 === 0 ? 'md:flex-row-reverse' : ''
                                            }`}
                                    >
                                        {/* Mobile: Space for line */}
                                        <div className="md:hidden w-12 shrink-0"></div>

                                        {/* Timeline Node - Center */}
                                        <div className="absolute left-[11px] md:left-1/2 top-0 md:top-6 w-5 h-5 md:w-6 md:h-6 rounded-full border-4 border-white bg-gold-400 shadow-md transform md:-translate-x-1/2 z-10 mt-1 md:mt-0" />

                                        {/* Spacer for desktop alignment */}
                                        <div className="hidden md:block w-1/2" />

                                        {/* Content Card */}
                                        <div className={`w-full md:w-1/2 pl-4 md:pl-0 ${index % 2 === 0 ? 'md:pl-16' : 'md:pr-16 text-right'
                                            }`}>
                                            <div className={`
                                                relative p-6 md:p-8 rounded-2xl bg-white border border-sage-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] 
                                                hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.08)] transition-all duration-300 group
                                                marker:content-[''] before:absolute before:top-2 md:before:top-8
                                                ${index % 2 === 0
                                                    ? 'before:-left-2 md:before:-left-3 before:border-r-[12px] before:border-r-white'
                                                    : 'before:-left-2 md:before:-right-3 md:before:left-auto md:before:border-l-[12px] md:before:border-l-white md:before:border-r-0 before:border-r-[12px] before:border-r-white'
                                                }
                                                before:w-0 before:h-0 before:border-t-[8px] before:border-t-transparent before:border-b-[8px] before:border-b-transparent before:drop-shadow-sm
                                            `}>
                                                <span className="block text-4xl md:text-5xl font-serif font-bold text-gold-500/20 mb-2 group-hover:text-gold-500/40 transition-colors">
                                                    {milestone.year}
                                                </span>
                                                <h3 className="text-xl font-bold text-forest-900 mb-2">{milestone.title}</h3>
                                                <p className="text-gray-600 leading-relaxed text-sm md:text-base">{milestone.description}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Sustainability Section */}
                    <Sustainability />



                    {/* Simple Stats Strip */}
                    <section className="py-16 bg-forest-900 text-white">
                        <div className="container mx-auto px-6">
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-x divide-forest-700/50">
                                {[
                                    { number: '10k+', label: 'Happy Customers' },
                                    { number: '35+', label: 'Years' },
                                    { number: '100%', label: 'Natural' },
                                    { number: '50+', label: 'Artisans' },
                                ].map((stat) => (
                                    <div key={stat.label} className="px-4">
                                        <div className="text-3xl md:text-4xl font-serif font-bold text-gold-400 mb-2">{stat.number}</div>
                                        <div className="text-sm md:text-base text-forest-200 uppercase tracking-wider opacity-80">{stat.label}</div>
                                    </div>
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
