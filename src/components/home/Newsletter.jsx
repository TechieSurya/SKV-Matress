import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Gift, ArrowRight, Check } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Newsletter = () => {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) return;

        setIsLoading(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIsLoading(false);
        setIsSubmitted(true);
        toast({ title: 'Success', description: 'Welcome! Check your email for your discount code.' });
        setEmail('');
    };

    return (
        <section className="py-20 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-forest-800 via-forest-900 to-sage-900" />

            {/* Pattern Overlay */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.3' fill-rule='evenodd'/%3E%3C/svg%3E")`,
                }} />
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-gold-500/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-sage-500/20 rounded-full blur-3xl" />

            <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
                <div className="max-w-3xl mx-auto text-center">
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gold-500/20 text-gold-300 rounded-full text-sm font-medium mb-6"
                    >
                        <Gift className="w-4 h-4" />
                        <span>Exclusive Offer</span>
                    </motion.div>

                    {/* Heading */}
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl lg:text-5xl font-serif font-bold text-cotton-white mb-4"
                    >
                        Get <span className="text-gold-400">10% Off</span> Your First Order
                    </motion.h2>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-sage-200 text-lg mb-8 max-w-xl mx-auto"
                    >
                        Subscribe to our newsletter for exclusive offers, sleep tips, and be the first to know about new products.
                    </motion.p>

                    {/* Form */}
                    <motion.form
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        onSubmit={handleSubmit}
                        className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
                    >
                        <div className="relative flex-1">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-sage-400" />
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-12 h-14 bg-cotton-white/10 border border-cotton-white/20 text-cotton-white placeholder:text-sage-400 rounded-xl focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400/20"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isLoading || isSubmitted}
                            className="h-14 px-8 bg-gold-500 hover:bg-gold-600 text-forest-900 font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-gold-500/25 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <span className="animate-pulse">Subscribing...</span>
                            ) : isSubmitted ? (
                                <span className="flex items-center gap-2">
                                    <Check className="w-5 h-5" />
                                    Subscribed!
                                </span>
                            ) : (
                                <span className="flex items-center gap-2">
                                    Subscribe
                                    <ArrowRight className="w-5 h-5" />
                                </span>
                            )}
                        </button>
                    </motion.form>

                    {/* Trust Text */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="text-sage-400 text-sm mt-6"
                    >
                        Join 5,000+ subscribers. No spam, unsubscribe anytime.
                    </motion.p>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;
