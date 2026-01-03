import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Leaf, Phone } from 'lucide-react';

const CTA = () => {
    return (
        <section className="py-24 gradient-natural relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-sage/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-sage/15 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

            <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl mx-auto text-center"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent rounded-full mb-6">
                        <Leaf className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium text-accent-foreground">
                            Free Shipping on Orders Above ₹5000
                        </span>
                    </div>

                    <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                        Ready to Experience
                        <br />
                        <span className="text-primary">Natural Comfort?</span>
                    </h2>

                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
                        Transform your sleep with our handcrafted Ilavam Panju mattresses and pillows.
                        Order now and wake up refreshed, every single day.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/products">
                            <button className="group w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-medium text-lg">
                                Order Your Comfort
                                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </Link>
                        <a
                            href="https://wa.me/919876543210?text=Hi,%20I'm%20interested%20in%20Ilavam%20Panju%20products"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <button className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md font-medium text-lg transition-colors">
                                <Phone className="w-5 h-5 mr-2" />
                                WhatsApp Order
                            </button>
                        </a>
                    </div>

                    {/* Trust Indicators */}
                    <div className="mt-12 pt-8 border-t border-border">
                        <div className="flex flex-wrap justify-center gap-8 text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <span className="text-3xl font-display font-bold text-primary">10K+</span>
                                <span className="text-sm">Happy Customers</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-3xl font-display font-bold text-primary">4.9</span>
                                <span className="text-sm">Average Rating</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-3xl font-display font-bold text-primary">35+</span>
                                <span className="text-sm">Years Experience</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default CTA;
