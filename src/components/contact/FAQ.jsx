import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown } from 'lucide-react';

const faqs = [
    {
        question: 'What makes your cotton mattresses different from regular mattresses?',
        answer: 'Our mattresses are made from 100% natural Ilavam Panju (silk cotton), hand-crafted using traditional techniques passed down through generations. Unlike synthetic mattresses, they are completely chemical-free, hypoallergenic, and provide natural temperature regulation for a healthier sleep.',
    },
    {
        question: 'How long does a cotton mattress last?',
        answer: 'With proper care, our natural cotton mattresses can last 10-15 years. We recommend rotating your mattress every 3 months and airing it in sunlight occasionally to maintain its freshness and longevity.',
    },
    {
        question: 'Do you offer custom sizes?',
        answer: 'Yes! We can create mattresses and pillows in any custom size. Simply contact us with your requirements, and we\'ll provide a quote. Custom orders typically take 5-7 business days to complete.',
    },
    {
        question: 'What is your delivery time and area?',
        answer: 'We deliver across India. Standard delivery takes 5-7 business days for most cities. For remote areas, delivery may take 7-10 days. Free shipping is available for orders above ₹5,000.',
    },
    {
        question: 'What is your return policy?',
        answer: 'We offer a 7-day return policy for all products in their original condition. If you\'re not satisfied with your purchase, simply contact us within 7 days of delivery for a full refund or exchange.',
    },
    {
        question: 'How do I care for my cotton mattress?',
        answer: 'Air your mattress in sunlight for 2-3 hours every month. Use a cotton mattress protector. Avoid direct contact with water. For spot cleaning, use a damp cloth with mild soap and let it dry completely before use.',
    },
    {
        question: 'Are your products safe for people with allergies?',
        answer: 'Absolutely! Our natural cotton products are hypoallergenic and ideal for people with allergies or sensitive skin. The cotton fibers naturally resist dust mites and other allergens.',
    },
    {
        question: 'Do you offer warranty on your products?',
        answer: 'Yes, we provide a 5-year manufacturing warranty on all mattresses and a 2-year warranty on pillows. This covers any defects in materials or craftsmanship.',
    },
];

const AccordionItem = ({ question, answer, isOpen, onClick }) => {
    return (
        <div className="bg-cotton-white rounded-2xl border border-sage-200 px-6 shadow-sm hover:shadow-md transition-shadow">
            <button
                onClick={onClick}
                className="w-full text-left text-forest-900 font-medium py-5 flex items-center justify-between focus:outline-none"
            >
                <span>{question}</span>
                <ChevronDown
                    className={`w-5 h-5 text-sage-500 transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''
                        }`}
                />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <div className="text-muted-foreground pb-5 leading-relaxed">
                            {answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const handleToggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-20 bg-cream-50">
            <div className="container mx-auto px-6 md:px-12 lg:px-20">
                <div className="max-w-3xl mx-auto">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-sage-100 text-sage-700 rounded-full text-sm font-medium mb-4">
                            <HelpCircle className="w-4 h-4" />
                            <span>FAQ</span>
                        </div>
                        <h2 className="text-3xl lg:text-4xl font-serif font-bold text-forest-900 mb-4">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-muted-foreground">
                            Find answers to common questions about our products and services
                        </p>
                    </motion.div>

                    {/* FAQ Accordion */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="space-y-4"
                    >
                        {faqs.map((faq, index) => (
                            <AccordionItem
                                key={index}
                                question={faq.question}
                                answer={faq.answer}
                                isOpen={openIndex === index}
                                onClick={() => handleToggle(index)}
                            />
                        ))}
                    </motion.div>

                    {/* Still Have Questions */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="text-center mt-12 p-8 bg-forest-900 rounded-3xl"
                    >
                        <h3 className="text-xl font-semibold text-cotton-white mb-2">
                            Still have questions?
                        </h3>
                        <p className="text-sage-200 mb-6">
                            We're here to help. Reach out via WhatsApp for instant support.
                        </p>
                        <a
                            href="https://wa.me/919876543210"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-cotton-white font-semibold rounded-full transition-colors"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            Chat on WhatsApp
                        </a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default FAQ;
