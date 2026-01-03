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
            {/* Background Elements */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-0 w-96 h-96 bg-sage-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="inline-block px-4 py-2 bg-sage-500/20 text-sage-300 rounded-full text-sm font-medium mb-4">
                        Our Commitment
                    </span>
                    <h2 className="text-4xl lg:text-5xl font-serif font-bold text-cotton-white mb-4">
                        Sustainability First
                    </h2>
                    <p className="text-sage-200 max-w-2xl mx-auto text-lg">
                        We believe luxury and sustainability go hand in hand. Every decision we make prioritizes the health of our planet and communities.
                    </p>
                </motion.div>

                {/* Initiatives Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {initiatives.map((item, index) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="group bg-forest-800/50 backdrop-blur-sm rounded-2xl p-8 border border-sage-700/30 hover:border-sage-500/50 transition-all duration-300"
                        >
                            <div className="flex items-start justify-between mb-6">
                                <div className="w-14 h-14 bg-sage-800/50 rounded-2xl flex items-center justify-center group-hover:bg-sage-500/20 transition-colors">
                                    <item.icon className="w-7 h-7 text-sage-400" />
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-bold text-gold-400">{item.stat}</div>
                                    <div className="text-xs text-sage-400">{item.statLabel}</div>
                                </div>
                            </div>
                            <h3 className="text-xl font-semibold text-cotton-white mb-2">
                                {item.title}
                            </h3>
                            <p className="text-sage-300 text-sm leading-relaxed">
                                {item.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Pledge Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                    className="mt-16 bg-gradient-to-r from-sage-800/50 to-forest-800/50 rounded-3xl p-8 lg:p-12 border border-sage-600/30"
                >
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                        <div className="text-center lg:text-left">
                            <h3 className="text-2xl lg:text-3xl font-serif font-bold text-cotton-white mb-2">
                                Our Green Pledge
                            </h3>
                            <p className="text-sage-200 max-w-xl">
                                By 2030, we commit to achieving carbon neutrality and planting 10,000 trees across Tamil Nadu.
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="text-center px-6 py-4 bg-sage-900/50 rounded-2xl">
                                <div className="text-3xl font-bold text-sage-300">2030</div>
                                <div className="text-xs text-sage-400">Target Year</div>
                            </div>
                            <div className="text-center px-6 py-4 bg-gold-500/20 rounded-2xl">
                                <div className="text-3xl font-bold text-gold-400">10K</div>
                                <div className="text-xs text-gold-300">Trees to Plant</div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Sustainability;
