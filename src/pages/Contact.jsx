import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, Headphones, Package, CreditCard } from 'lucide-react';
import { z } from 'zod';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { toast } from '@/hooks/use-toast';
import FAQ from '@/components/contact/FAQ';
import Map from '@/components/contact/Map';

const contactSchema = z.object({
    name: z.string().trim().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
    email: z.string().trim().email('Invalid email address').max(255, 'Email must be less than 255 characters'),
    phone: z.string().trim().min(10, 'Phone number must be at least 10 digits').max(15, 'Phone number is too long'),
    message: z.string().trim().min(1, 'Message is required').max(1000, 'Message must be less than 1000 characters'),
});

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        const result = contactSchema.safeParse(formData);
        if (!result.success) {
            const fieldErrors = {};
            result.error.errors.forEach((err) => {
                if (err.path[0]) {
                    fieldErrors[err.path[0]] = err.message;
                }
            });
            setErrors(fieldErrors);
            return;
        }

        setIsSubmitting(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIsSubmitting(false);

        toast({
            title: 'Message sent successfully!',
            description: 'We will get back to you within 24 hours.',
        });

        setFormData({ name: '', email: '', phone: '', message: '' });
    };

    const contactInfo = [
        {
            icon: MapPin,
            title: 'Visit Us',
            lines: ['123 Cotton Street', 'Coimbatore, Tamil Nadu 641001', 'India'],
        },
        {
            icon: Phone,
            title: 'Call Us',
            lines: ['+91 98765 43210', '+91 87654 32109'],
        },
        {
            icon: Mail,
            title: 'Email Us',
            lines: ['hello@skvnaturalbeds.com', 'support@skvnaturalbeds.com'],
        },
        {
            icon: Clock,
            title: 'Business Hours',
            lines: ['Mon - Sat: 9:00 AM - 7:00 PM', 'Sunday: 10:00 AM - 5:00 PM'],
        },
    ];

    const supportOptions = [
        {
            icon: Headphones,
            title: 'Customer Support',
            description: 'Get help with orders, returns & more',
            action: 'Call Now',
            href: 'tel:+919876543210',
            color: 'from-sage-500 to-forest-600',
        },
        {
            icon: Package,
            title: 'Track Order',
            description: 'Check your order status',
            action: 'Track',
            href: '#',
            color: 'from-gold-500 to-gold-600',
        },
        {
            icon: CreditCard,
            title: 'Returns & Refunds',
            description: '7-day hassle-free returns',
            action: 'Learn More',
            href: '#',
            color: 'from-forest-600 to-forest-700',
        },
    ];

    return (
        <>
            <Helmet>
                <title>Contact Us | SKV Natural Beds</title>
                <meta
                    name="description"
                    content="Get in touch with SKV Natural Beds. We're here to help with your queries about our natural cotton mattresses and pillows. Visit our store in Coimbatore or contact us online."
                />
            </Helmet>

            <div className="min-h-screen bg-background">
                <Navbar />

                <main className="pt-32 md:pt-36">
                    {/* Hero Header */}
                    <section className="relative py-20 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-forest-800 via-forest-900 to-sage-900" />
                        <div className="absolute inset-0 opacity-20">
                            <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold-400 rounded-full blur-3xl" />
                            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-sage-400 rounded-full blur-3xl" />
                        </div>

                        <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-center max-w-3xl mx-auto"
                            >
                                <span className="inline-block px-4 py-2 bg-gold-500/20 text-gold-300 rounded-full text-sm font-medium mb-6">
                                    We're Here to Help
                                </span>
                                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-cotton-white mb-6">
                                    Get in Touch
                                </h1>
                                <p className="text-xl text-sage-200 leading-relaxed">
                                    Have questions about our products? We'd love to hear from you.
                                    Our team is ready to assist you.
                                </p>
                            </motion.div>
                        </div>
                    </section>

                    {/* Support Options */}
                    <section className="py-12 bg-cream-50 -mt-12 relative z-10">
                        <div className="container mx-auto px-6 md:px-12 lg:px-20">
                            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                                {supportOptions.map((option, index) => (
                                    <motion.a
                                        key={option.title}
                                        href={option.href}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="group bg-cotton-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-sage-100"
                                    >
                                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${option.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                            <option.icon className="w-7 h-7 text-cotton-white" />
                                        </div>
                                        <h3 className="font-semibold text-lg text-forest-900 mb-1">{option.title}</h3>
                                        <p className="text-sm text-muted-foreground mb-3">{option.description}</p>
                                        <span className="text-sm font-medium text-gold-600 group-hover:text-gold-700">
                                            {option.action} →
                                        </span>
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Contact Section */}
                    <section className="py-20 bg-background">
                        <div className="container mx-auto px-6 md:px-12 lg:px-20">
                            <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                                {/* Contact Form */}
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                >
                                    <div className="bg-cotton-white rounded-3xl p-8 lg:p-10 shadow-xl border border-sage-100">
                                        <h2 className="font-serif text-3xl font-bold text-forest-900 mb-2">
                                            Send us a Message
                                        </h2>
                                        <p className="text-muted-foreground mb-8">
                                            Fill out the form below and we'll get back to you within 24 hours.
                                        </p>

                                        <form onSubmit={handleSubmit} className="space-y-6">
                                            <div className="grid sm:grid-cols-2 gap-6">
                                                <div>
                                                    <label htmlFor="name" className="block text-sm font-medium text-forest-900 mb-2">
                                                        Your Name
                                                    </label>
                                                    <input
                                                        id="name"
                                                        name="name"
                                                        value={formData.name}
                                                        onChange={handleChange}
                                                        placeholder="John Doe"
                                                        className={`flex h-12 w-full rounded-xl border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${errors.name ? 'border-destructive' : 'border-sage-200'}`}
                                                    />
                                                    {errors.name && (
                                                        <p className="text-sm text-destructive mt-1">{errors.name}</p>
                                                    )}
                                                </div>

                                                <div>
                                                    <label htmlFor="phone" className="block text-sm font-medium text-forest-900 mb-2">
                                                        Phone Number
                                                    </label>
                                                    <input
                                                        id="phone"
                                                        name="phone"
                                                        value={formData.phone}
                                                        onChange={handleChange}
                                                        placeholder="+91 98765 43210"
                                                        className={`flex h-12 w-full rounded-xl border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${errors.phone ? 'border-destructive' : 'border-sage-200'}`}
                                                    />
                                                    {errors.phone && (
                                                        <p className="text-sm text-destructive mt-1">{errors.phone}</p>
                                                    )}
                                                </div>
                                            </div>

                                            <div>
                                                <label htmlFor="email" className="block text-sm font-medium text-forest-900 mb-2">
                                                    Email Address
                                                </label>
                                                <input
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    placeholder="john@example.com"
                                                    className={`flex h-12 w-full rounded-xl border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${errors.email ? 'border-destructive' : 'border-sage-200'}`}
                                                />
                                                {errors.email && (
                                                    <p className="text-sm text-destructive mt-1">{errors.email}</p>
                                                )}
                                            </div>

                                            <div>
                                                <label htmlFor="message" className="block text-sm font-medium text-forest-900 mb-2">
                                                    Your Message
                                                </label>
                                                <textarea
                                                    id="message"
                                                    name="message"
                                                    value={formData.message}
                                                    onChange={handleChange}
                                                    placeholder="Tell us how we can help..."
                                                    rows={5}
                                                    className={`flex min-h-[80px] w-full rounded-xl border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${errors.message ? 'border-destructive' : 'border-sage-200'}`}
                                                />
                                                {errors.message && (
                                                    <p className="text-sm text-destructive mt-1">{errors.message}</p>
                                                )}
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="w-full h-14 bg-forest-800 hover:bg-forest-900 text-cotton-white rounded-xl text-lg font-medium inline-flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {isSubmitting ? (
                                                    'Sending...'
                                                ) : (
                                                    <>
                                                        Send Message
                                                        <Send className="w-5 h-5 ml-2" />
                                                    </>
                                                )}
                                            </button>
                                        </form>
                                    </div>
                                </motion.div>

                                {/* Contact Info */}
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    className="space-y-6"
                                >
                                    {contactInfo.map((info) => (
                                        <div
                                            key={info.title}
                                            className="bg-cotton-white rounded-2xl p-6 shadow-lg flex gap-5 border border-sage-100 hover:border-gold-200 transition-colors"
                                        >
                                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sage-100 to-sage-200 flex items-center justify-center flex-shrink-0">
                                                <info.icon className="w-7 h-7 text-forest-700" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-lg text-forest-900 mb-2">{info.title}</h3>
                                                {info.lines.map((line, i) => (
                                                    <p key={i} className="text-muted-foreground">
                                                        {line}
                                                    </p>
                                                ))}
                                            </div>
                                        </div>
                                    ))}

                                    {/* WhatsApp CTA */}
                                    <a
                                        href="https://wa.me/919876543210?text=Hi,%20I%20have%20a%20question%20about%20SKV%20Natural%20Beds%20products"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block"
                                    >
                                        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-8 text-center hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl">
                                            <MessageCircle className="w-10 h-10 text-cotton-white mx-auto mb-4" />
                                            <h3 className="font-semibold text-xl text-cotton-white mb-2">
                                                Chat on WhatsApp
                                            </h3>
                                            <p className="text-green-100">
                                                Get instant support • Quick responses
                                            </p>
                                        </div>
                                    </a>
                                </motion.div>
                            </div>
                        </div>
                    </section>

                    {/* FAQ Section */}
                    <FAQ />

                    {/* Map Section */}
                    <Map />
                </main>

                <Footer />
            </div>
        </>
    );
};

export default Contact;
