import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Droplet, Recycle, TreePine, Wind, Heart } from 'lucide-react';

const initiatives = [
    {
        icon: Leaf,
        title: '100% Natural Materials',
        description: 'We use only pure, unprocessed cotton fibers with zero synthetic additives.',
        stat: '0%',
        statLabel: 'Chemicals Used',
    },
    {
        icon: Droplet,
        title: 'Water Conservation',
        description: 'Our cotton sourcing partners practice sustainable water management.',
        stat: '40%',
        statLabel: 'Less Water Usage',
    },
    {
        icon: Recycle,
        title: 'Biodegradable Products',
        description: 'Every product we make can return to nature safely at end of life.',
        stat: '100%',
        statLabel: 'Biodegradable',
    },
    {
        icon: TreePine,
        title: 'Supporting Local Farmers',
        description: 'Direct partnerships with Tamil Nadu cotton farmers ensures fair trade.',
        stat: '500+',
        statLabel: 'Farmer Families',
    },
    {
        icon: Wind,
        title: 'Low Carbon Footprint',
        description: 'Traditional hand-crafting methods require minimal energy.',
        stat: '80%',
        statLabel: 'Lower Emissions',
    },
    {
        icon: Heart,
        title: 'Community Welfare',
        description: 'Providing dignified employment and preserving traditional skills.',
        stat: '50+',
        statLabel: 'Jobs Created',
    },
];

const Sustainability = () => {
    return (
        <section className="py-24 bg-forest-900 relative overflow-hidden">
            {/* Subtle Background */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sage-500 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-forest-800 rounded-full blur-[120px]" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="inline-block py-1 px-3 border border-sage-700 rounded-full bg-forest-800/50 text-sage-300 text-xs font-semibold tracking-wider uppercase mb-4">
                        Our Commitment
                    </span>
                    <h2 className="text-3xl lg:text-5xl font-serif font-bold text-white mb-6">
                        Sustainability First
                    </h2>
                    <p className="text-sage-200 max-w-2xl mx-auto text-lg font-light leading-relaxed">
                        We believe luxury and sustainability go hand in hand. Every decision we make prioritizes the health of our planet and communities.
                    </p>
                </motion.div>

                {/* Initiatives Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                    {initiatives.map((item, index) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-forest-800/30 backdrop-blur-md rounded-xl p-8 border border-white/5 hover:bg-forest-800/50 hover:border-white/10 transition-all duration-300 group"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div className="p-3 bg-white/5 rounded-lg group-hover:bg-gold-500/20 group-hover:text-gold-400 transition-colors">
                                    <item.icon className="w-6 h-6 text-sage-300 group-hover:text-gold-400" />
                                </div>
                                <div className="text-right">
                                    <span className="block text-2xl font-bold text-gold-400 font-serif">{item.stat}</span>
                                    <span className="text-xs text-sage-400 uppercase tracking-wide">{item.statLabel}</span>
                                </div>
                            </div>

                            <h3 className="text-lg font-semibold text-white mb-3">
                                {item.title}
                            </h3>
                            <p className="text-sage-300 text-sm leading-relaxed opacity-90">
                                {item.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Simplified Pledge */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-r from-sage-900 to-forest-800 rounded-2xl p-8 lg:p-12 border border-white/10 text-center max-w-4xl mx-auto"
                >
                    <h3 className="text-2xl font-serif font-bold text-white mb-4">
                        Our 2030 Green Pledge
                    </h3>
                    <p className="text-sage-200 mb-8 max-w-xl mx-auto font-light">
                        We are committed to achieving carbon neutrality and planting 10,000 trees across Tamil Nadu by 2030.
                    </p>

                    <div className="flex justify-center gap-12">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-white mb-1">2030</div>
                            <div className="text-xs text-sage-400 uppercase tracking-wide">Target Year</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-gold-400 mb-1">10k</div>
                            <div className="text-xs text-sage-400 uppercase tracking-wide">Trees Planted</div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Sustainability;
