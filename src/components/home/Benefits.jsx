import React from 'react';
import { motion } from 'framer-motion';
import { Bone, Droplets, Leaf, Wind, Shield, Heart } from 'lucide-react';

const benefits = [
    {
        icon: 'spine',
        title: 'Orthopedic Support',
        description: 'Designed to maintain natural spine alignment and reduce back pain.',
    },
    {
        icon: 'droplet',
        title: 'Temperature Control',
        description: 'Natural cotton breathes, keeping you cool in summer and warm in winter.',
    },
    {
        icon: 'leaf',
        title: '100% Natural',
        description: 'Pure Ilavam Panju cotton, free from harmful chemicals and synthetic foams.',
    },
    {
        icon: 'wind',
        title: 'Hypoallergenic',
        description: 'Naturally resistant to dust mites, mold, and allergens for healthier sleep.',
    },
    {
        icon: 'shield',
        title: 'Durable & Long-lasting',
        description: 'Handcrafted quality that maintains shape and comfort for years.',
    },
    {
        icon: 'heart',
        title: 'Eco-Friendly',
        description: 'Sustainable materials that are good for you and the planet.',
    },
];

const iconMap = {
    spine: Bone,
    droplet: Droplets,
    leaf: Leaf,
    wind: Wind,
    shield: Shield,
    heart: Heart,
};

const Benefits = () => {
    return (
        <section className="py-24 bg-cotton-white">
            <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="inline-block px-4 py-1.5 bg-accent text-accent-foreground text-sm font-medium rounded-full mb-4">
                        Why Choose Us
                    </span>
                    <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
                        The Natural Difference
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Discover why thousands of families trust Ilavam Panju for their sleep comfort
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {benefits.map((benefit, index) => {
                        const Icon = iconMap[benefit.icon];
                        return (
                            <motion.div
                                key={benefit.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="group p-8 rounded-2xl bg-gradient-to-br from-background to-cream border border-border hover:shadow-elevated transition-all duration-300"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                                    <Icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
                                </div>
                                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                                    {benefit.title}
                                </h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {benefit.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Benefits;
