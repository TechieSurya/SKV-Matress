import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Bed, CloudSun } from 'lucide-react';

const categories = [
    {
        id: 'mattress',
        title: 'Premium Mattresses',
        subtitle: 'Handcrafted Excellence',
        description: 'Experience the luxury of 100% natural cotton mattresses, crafted for perfect spine alignment and temperature regulation.',
        image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80',
        icon: Bed,
        link: '/products?category=mattress',
        features: ['Orthopedic Support', 'Natural Cooling', 'Hypoallergenic'],
        color: 'from-forest-600 to-forest-800',
    },
    {
        id: 'pillow',
        title: 'Natural Pillows',
        subtitle: 'Cloud-Like Comfort',
        description: 'Soft, supportive pillows filled with pure cotton that mold to your head and neck for blissful sleep.',
        image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e6?w=800&q=80',
        icon: CloudSun,
        link: '/products?category=pillow',
        features: ['Neck Support', 'Breathable', 'Dust-Mite Free'],
        color: 'from-sage-600 to-sage-800',
    },
];

const CategoryShowcase = () => {
    return (
        <section className="py-24 lg:py-32 bg-cream-50">
            <div className="container mx-auto px-6 md:px-12 lg:px-20">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="inline-block px-4 py-2 bg-sage-100 text-sage-700 rounded-full text-sm font-medium mb-4 tracking-wide uppercase">
                        Shop by Category
                    </span>
                    <h2 className="text-4xl lg:text-6xl font-display font-bold text-forest-900 mb-6">
                        Explore Our Collections
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg md:text-xl font-light">
                        Discover the perfect natural bedding for your home, crafted with care and precision.
                    </p>
                </motion.div>

                {/* Category Cards */}
                <div className="grid lg:grid-cols-2 gap-8 xl:gap-12">
                    {categories.map((category, index) => (
                        <motion.div
                            key={category.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2, duration: 0.6 }}
                        >
                            <Link
                                to={category.link}
                                className="group block relative h-[400px] lg:h-[500px] rounded-[2rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                            >
                                {/* Background Image */}
                                <div className="absolute inset-0 bg-gray-900">
                                    <img
                                        src={category.image}
                                        alt={category.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                                    />
                                </div>

                                {/* Gradient Overlay - More subtle and bottom-focused */}
                                <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-60 group-hover:opacity-70 transition-opacity duration-500 mix-blend-multiply`} />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />

                                {/* Content */}
                                <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end text-white">
                                    {/* Icon Badge */}
                                    <motion.div
                                        initial={{ scale: 0, rotate: -20 }}
                                        whileInView={{ scale: 1, rotate: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.3 + index * 0.2, type: 'spring' }}
                                        className="absolute top-8 right-8 w-16 h-16 md:w-20 md:h-20 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center shadow-lg group-hover:bg-white/20 transition-colors"
                                    >
                                        <category.icon className="w-8 h-8 md:w-10 md:h-10 text-white" />
                                    </motion.div>

                                    <div className="transform transition-transform duration-500 group-hover:translate-y-[-8px]">
                                        <span className="inline-block text-gold-400 font-bold tracking-wider uppercase text-sm mb-3">
                                            {category.subtitle}
                                        </span>
                                        <h3 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4 leading-tight">
                                            {category.title}
                                        </h3>
                                        <p className="text-gray-200 mb-8 max-w-md text-lg leading-relaxed opacity-90 group-hover:opacity-100 transition-opacity">
                                            {category.description}
                                        </p>

                                        {/* Features */}
                                        <div className="flex flex-wrap gap-3 mb-8">
                                            {category.features.map((feature) => (
                                                <span
                                                    key={feature}
                                                    className="px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/10 rounded-full text-sm font-medium text-white/90"
                                                >
                                                    {feature}
                                                </span>
                                            ))}
                                        </div>

                                        {/* CTA */}
                                        <div className="inline-flex items-center gap-3 bg-white text-forest-900 px-6 py-3 rounded-full font-bold text-sm uppercase tracking-wide transition-all group-hover:bg-gold-500 group-hover:text-white shadow-lg">
                                            <span>Shop Now</span>
                                            <ArrowRight className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategoryShowcase;
