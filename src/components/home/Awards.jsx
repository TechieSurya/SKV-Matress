import React from 'react';
import { motion } from 'framer-motion';
import { Award, Shield, BadgeCheck, Star, Leaf, Heart } from 'lucide-react';

const certifications = [
    { icon: Shield, title: 'ISO Certified', subtitle: 'Quality Management' },
    { icon: Leaf, title: '100% Organic', subtitle: 'Chemical Free' },
    { icon: BadgeCheck, title: 'MSME Registered', subtitle: 'Government Certified' },
    { icon: Award, title: 'Best Quality', subtitle: 'Award 2023' },
];

const stats = [
    { value: '10,000+', label: 'Happy Customers', icon: Heart },
    { value: '4.8★', label: 'Average Rating', icon: Star },
    { value: '30+', label: 'Years Experience', icon: Award },
    { value: '100%', label: 'Natural Materials', icon: Leaf },
];

const Awards = () => {
    return (
        <section className="py-20 bg-gradient-to-b from-background to-cream-50 relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-10 left-10 w-20 h-20 bg-gold-200/30 rounded-full blur-2xl" />
            <div className="absolute bottom-10 right-10 w-32 h-32 bg-sage-200/30 rounded-full blur-2xl" />

            <div className="container mx-auto px-6 md:px-12 lg:px-20">
                {/* Trust Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="inline-block px-4 py-2 bg-gold-100 text-gold-700 rounded-full text-sm font-medium mb-4">
                        Trusted Excellence
                    </span>
                    <h2 className="text-3xl lg:text-4xl font-serif font-bold text-forest-900 mb-3">
                        Trusted by <span className="text-gold-600">10,000+</span> Families Across India
                    </h2>
                    <p className="text-muted-foreground max-w-xl mx-auto">
                        Our commitment to quality has earned us recognition and the trust of families nationwide.
                    </p>
                </motion.div>

                {/* Certifications */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                    {certifications.map((cert, index) => (
                        <motion.div
                            key={cert.title}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, type: 'spring' }}
                            whileHover={{ y: -5 }}
                            className="bg-cotton-white rounded-2xl p-6 text-center shadow-lg border border-sage-100 hover:border-gold-300 hover:shadow-xl transition-all duration-300"
                        >
                            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-gold-100 to-gold-200 rounded-2xl flex items-center justify-center">
                                <cert.icon className="w-8 h-8 text-gold-600" />
                            </div>
                            <h4 className="font-semibold text-forest-900 mb-1">{cert.title}</h4>
                            <p className="text-sm text-muted-foreground">{cert.subtitle}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Stats Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-forest-900 rounded-3xl p-8 lg:p-12 shadow-2xl"
                >
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 + index * 0.1 }}
                                className="text-center"
                            >
                                <div className="w-12 h-12 mx-auto mb-3 bg-gold-500/20 rounded-xl flex items-center justify-center">
                                    <stat.icon className="w-6 h-6 text-gold-400" />
                                </div>
                                <div className="text-3xl lg:text-4xl font-bold text-gold-400 mb-1">
                                    {stat.value}
                                </div>
                                <div className="text-sage-300 text-sm">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Press Mentions Placeholder */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="mt-16 text-center"
                >
                    <p className="text-muted-foreground mb-6 text-sm uppercase tracking-wider">Featured In</p>
                    <div className="flex flex-wrap justify-center items-center gap-8 opacity-50">
                        {['The Hindu', 'Times of India', 'Economic Times', 'Deccan Chronicle'].map((press) => (
                            <span key={press} className="text-xl font-serif text-forest-700">{press}</span>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Awards;
