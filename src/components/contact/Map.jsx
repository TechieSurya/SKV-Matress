import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Clock, Phone } from 'lucide-react';

const Map = () => {
    return (
        <section className="py-20 bg-background">
            <div className="container mx-auto px-6 md:px-12 lg:px-20">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <span className="inline-block px-4 py-2 bg-sage-100 text-sage-700 rounded-full text-sm font-medium mb-4">
                        Visit Us
                    </span>
                    <h2 className="text-3xl lg:text-4xl font-serif font-bold text-forest-900 mb-4">
                        Our Store Location
                    </h2>
                    <p className="text-muted-foreground max-w-xl mx-auto">
                        Come experience the comfort of our natural cotton mattresses in person
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Map */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-2"
                    >
                        <div className="relative rounded-3xl overflow-hidden shadow-xl h-[400px] lg:h-[500px]">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.4024877439307!2d77.00608731480105!3d11.00449999214565!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba857a21cf69ebb%3A0x7f7f7f7f7f7f7f7f!2sCoimbatore%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1234567890"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Store Location"
                                className="grayscale hover:grayscale-0 transition-all duration-500"
                            />

                            {/* Map Overlay Card */}
                            <div className="absolute bottom-6 left-6 right-6 lg:left-6 lg:right-auto lg:max-w-sm bg-cotton-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-gold-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <MapPin className="w-6 h-6 text-gold-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-forest-900 mb-1">SKV Natural Beds Store</h3>
                                        <p className="text-sm text-muted-foreground">
                                            123, Main Street, RS Puram,<br />
                                            Coimbatore - 641002, Tamil Nadu
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Store Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="space-y-6"
                    >
                        {/* Quick Info Cards */}
                        <div className="bg-cotton-white rounded-2xl p-6 shadow-lg border border-sage-100">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 bg-sage-100 rounded-xl flex items-center justify-center">
                                    <Clock className="w-6 h-6 text-forest-700" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-forest-900">Store Hours</h4>
                                    <p className="text-sm text-muted-foreground">Open daily</p>
                                </div>
                            </div>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Monday - Saturday</span>
                                    <span className="font-medium text-forest-900">9:00 AM - 8:00 PM</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Sunday</span>
                                    <span className="font-medium text-forest-900">10:00 AM - 6:00 PM</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-cotton-white rounded-2xl p-6 shadow-lg border border-sage-100">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 bg-sage-100 rounded-xl flex items-center justify-center">
                                    <Phone className="w-6 h-6 text-forest-700" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-forest-900">Contact</h4>
                                    <p className="text-sm text-muted-foreground">Call or WhatsApp</p>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <a href="tel:+919876543210" className="block text-forest-900 font-medium hover:text-gold-600 transition-colors">
                                    +91 98765 43210
                                </a>
                                <a href="mailto:info@skvnaturalbeds.com" className="block text-forest-900 font-medium hover:text-gold-600 transition-colors text-sm">
                                    info@skvnaturalbeds.com
                                </a>
                            </div>
                        </div>

                        {/* Get Directions Button */}
                        <a
                            href="https://maps.google.com/?q=Coimbatore,Tamil+Nadu"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full h-14 bg-forest-800 hover:bg-forest-900 text-cotton-white rounded-xl flex items-center justify-center gap-2 font-medium transition-colors"
                        >
                            <Navigation className="w-5 h-5" />
                            Get Directions
                        </a>

                        {/* Parking Info */}
                        <p className="text-sm text-muted-foreground text-center">
                            🅿️ Free parking available for customers
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Map;
