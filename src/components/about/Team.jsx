import React from 'react';
import { motion } from 'framer-motion';
import { Award, Clock, Heart } from 'lucide-react';

const artisans = [
    {
        name: 'Master Rajan',
        role: 'Head Craftsman',
        experience: '35+ years',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
        specialty: 'Traditional mattress weaving',
    },
    {
        name: 'Lakshmi Devi',
        role: 'Quality Specialist',
        experience: '20+ years',
        image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&q=80',
        specialty: 'Cotton fiber selection',
    },
    {
        name: 'Kumar S.',
        role: 'Senior Artisan',
        experience: '25+ years',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
        specialty: 'Pillow crafting',
    },
    {
        name: 'Priya M.',
        role: 'Design Expert',
        experience: '15+ years',
        image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80',
        specialty: 'Product innovation',
    },
];

const Team = () => {
    return (
        <section className="py-24 bg-cream-50">
            <div className="container mx-auto px-6 md:px-12 lg:px-20">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="inline-block px-4 py-2 bg-gold-100 text-gold-700 rounded-full text-sm font-medium mb-4">
                        Our Artisans
                    </span>
                    <h2 className="text-4xl lg:text-5xl font-serif font-bold text-forest-900 mb-4">
                        Meet the Master Craftsmen
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        Skilled artisans with decades of experience, preserving the art of traditional cotton mattress making.
                    </p>
                </motion.div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-3 gap-6 max-w-2xl mx-auto mb-16"
                >
                    {[
                        { icon: Clock, value: '100+', label: 'Years Combined Experience' },
                        { icon: Award, value: '15+', label: 'Skilled Artisans' },
                        { icon: Heart, value: '3', label: 'Generations of Craft' },
                    ].map((stat, index) => (
                        <div key={stat.label} className="text-center">
                            <div className="w-12 h-12 mx-auto mb-3 bg-sage-100 rounded-xl flex items-center justify-center">
                                <stat.icon className="w-6 h-6 text-forest-700" />
                            </div>
                            <div className="text-2xl font-bold text-forest-900">{stat.value}</div>
                            <div className="text-sm text-muted-foreground">{stat.label}</div>
                        </div>
                    ))}
                </motion.div>

                {/* Team Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {artisans.map((artisan, index) => (
                        <motion.div
                            key={artisan.name}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="group"
                        >
                            <div className="relative rounded-3xl overflow-hidden bg-cotton-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                                {/* Image */}
                                <div className="relative h-64 overflow-hidden">
                                    <img
                                        src={artisan.image}
                                        alt={artisan.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-forest-900/60 to-transparent" />

                                    {/* Experience Badge */}
                                    <div className="absolute top-4 right-4 px-3 py-1 bg-gold-500 text-forest-900 text-sm font-semibold rounded-full">
                                        {artisan.experience}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold text-forest-900 mb-1">
                                        {artisan.name}
                                    </h3>
                                    <p className="text-gold-600 font-medium mb-2">{artisan.role}</p>
                                    <p className="text-sm text-muted-foreground">{artisan.specialty}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom Quote */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="text-center mt-16 max-w-3xl mx-auto"
                >
                    <blockquote className="text-xl lg:text-2xl font-serif text-forest-800 italic">
                        "Every mattress we create carries the soul of traditional craftsmanship and our dedication to your comfort."
                    </blockquote>
                    <p className="mt-4 text-muted-foreground">— The SKV Natural Beds Team</p>
                </motion.div>
            </div>
        </section>
    );
};

export default Team;
