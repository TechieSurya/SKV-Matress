import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Hand, Sparkles, CheckCircle2 } from 'lucide-react';

const steps = [
    {
        icon: Sun,
        step: '01',
        title: 'Cotton Harvesting',
        description: 'We source the finest Ilavam Panju (silk cotton) directly from trusted farmers across Tamil Nadu.',
        image: '/images/cotton-harvest.jpg',
    },
    {
        icon: Hand,
        step: '02',
        title: 'Hand Selection',
        description: 'Each fiber is carefully inspected and selected by our experienced artisans for premium quality.',
        image: '/images/cotton-selection.jpg',
    },
    {
        icon: Sparkles,
        step: '03',
        title: 'Traditional Crafting',
        description: 'Using time-honored techniques passed down through generations, we craft each mattress by hand.',
        image: '/images/crafting.png',
    },
    {
        icon: CheckCircle2,
        step: '04',
        title: 'Quality Assurance',
        description: 'Every product undergoes rigorous testing to ensure it meets our exacting standards.',
        image: '/images/quality-check.png',
    },
];

const HowItsMade = () => {
    return (
        <section className="py-24 bg-sage-100 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute top-0 left-0 w-96 h-96 bg-green-200 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold-200 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
            </div>

            <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="inline-block px-4 py-2 bg-white text-forest-900 rounded-full text-sm font-bold mb-4 shadow-sm border border-sage-100">
                        Our Process
                    </span>
                    <h2 className="text-4xl lg:text-5xl font-display font-bold text-forest-900 mb-4">
                        How It's Made
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        From farm to your bedroom - discover the journey of crafting the perfect natural cotton mattress.
                    </p>
                </motion.div>

                {/* Process Steps */}
                <div className="flex overflow-x-auto snap-x snap-mandatory pb-8 md:grid md:grid-cols-2 lg:grid-cols-4 md:pb-0 gap-6 md:gap-8 scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.step}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15, duration: 0.6 }}
                            className="group relative min-w-[85vw] md:min-w-0 snap-center"
                        >
                            {/* Connector Line */}
                            {index < steps.length - 1 && (
                                <div className="hidden lg:block absolute top-24 left-full w-full h-0.5 bg-gradient-to-r from-forest-900/20 to-transparent z-0" />
                            )}

                            <div className="relative bg-white rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2 border border-sage-100 h-full">
                                {/* Image */}
                                <div className="relative h-56 overflow-hidden">
                                    <img
                                        src={step.image}
                                        alt={step.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />

                                    {/* Step Number */}
                                    <div className="absolute top-4 right-4 w-12 h-12 bg-gold-400 shadow-lg rounded-full flex items-center justify-center border border-gold-500/20">
                                        <span className="text-white font-bold text-lg">{step.step}</span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 relative">
                                    {/* Icon Floating */}
                                    <div className="absolute -top-8 left-6 w-16 h-16 bg-forest-900 rounded-2xl flex items-center justify-center shadow-lg group-hover:bg-gold-500 transition-colors duration-300">
                                        <step.icon className="w-8 h-8 text-white" />
                                    </div>

                                    <div className="mt-8">
                                        <h3 className="text-xl font-display font-bold text-forest-900 mb-3">
                                            {step.title}
                                        </h3>
                                        <p className="text-muted-foreground text-sm leading-relaxed">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                    className="text-center mt-16"
                >
                    <p className="text-forest-900/80 font-medium mb-8 text-lg">
                        Every mattress takes <span className="text-forest-900 font-bold bg-gold-100 px-2 py-1 rounded-md">48-72 hours</span> of dedicated craftsmanship
                    </p>
                    <a
                        href="/products"
                        className="inline-flex items-center gap-2 bg-forest-900 text-white px-8 py-4 rounded-full font-bold text-sm uppercase tracking-wider hover:bg-forest-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
                    >
                        Explore Our Products
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default HowItsMade;
