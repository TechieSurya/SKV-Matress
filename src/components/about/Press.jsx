import React from 'react';
import { motion } from 'framer-motion';
import { Quote, ExternalLink } from 'lucide-react';

const pressMentions = [
    {
        publication: 'The Hindu',
        quote: 'SKV Natural Beds is reviving the traditional art of cotton mattress making while meeting modern comfort standards.',
        date: 'March 2024',
    },
    {
        publication: 'Times of India',
        quote: 'A family business that has transformed into a trusted name for natural bedding across South India.',
        date: 'January 2024',
    },
    {
        publication: 'Economic Times',
        quote: 'The growing demand for organic products has positioned brands like SKV Natural Beds for significant growth.',
        date: 'November 2023',
    },
];

const mediaLogos = [
    'The Hindu',
    'Times of India',
    'Economic Times',
    'Deccan Chronicle',
    'The New Indian Express',
    'Business Standard',
];

const Press = () => {
    return (
        <section className="py-20 bg-cream-50">
            <div className="container mx-auto px-6 md:px-12 lg:px-20">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="inline-block px-4 py-2 bg-sage-100 text-sage-700 rounded-full text-sm font-medium mb-4">
                        In the News
                    </span>
                    <h2 className="text-4xl lg:text-5xl font-serif font-bold text-forest-900 mb-4">
                        Press & Media
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        What leading publications are saying about SKV Natural Beds
                    </p>
                </motion.div>

                {/* Press Quotes */}
                <div className="grid lg:grid-cols-3 gap-8 mb-16">
                    {pressMentions.map((press, index) => (
                        <motion.div
                            key={press.publication}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15, duration: 0.5 }}
                            className="bg-cotton-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
                        >
                            <div className="w-12 h-12 bg-gold-100 rounded-2xl flex items-center justify-center mb-6">
                                <Quote className="w-6 h-6 text-gold-600" />
                            </div>
                            <p className="text-forest-800 text-lg leading-relaxed mb-6 italic">
                                "{press.quote}"
                            </p>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-semibold text-forest-900">{press.publication}</p>
                                    <p className="text-sm text-muted-foreground">{press.date}</p>
                                </div>
                                <a
                                    href="#"
                                    className="w-10 h-10 bg-sage-100 rounded-full flex items-center justify-center hover:bg-sage-200 transition-colors"
                                >
                                    <ExternalLink className="w-4 h-4 text-forest-700" />
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Media Logos */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="text-center"
                >
                    <p className="text-muted-foreground text-sm uppercase tracking-wider mb-8">
                        Featured In
                    </p>
                    <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-16">
                        {mediaLogos.map((logo, index) => (
                            <motion.span
                                key={logo}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5 + index * 0.1 }}
                                className="text-xl lg:text-2xl font-serif text-forest-700/50 hover:text-forest-900 transition-colors cursor-pointer"
                            >
                                {logo}
                            </motion.span>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Press;
