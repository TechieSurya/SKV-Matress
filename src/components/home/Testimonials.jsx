import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
    {
        id: 1,
        name: 'Priya Sundaram',
        location: 'Chennai',
        text: 'The quality of the cotton is exceptional. I haven\'t slept this well in years. Highly recommended!',
        rating: 5,
    },
    {
        id: 2,
        name: 'Rajesh Kumar',
        location: 'Coimbatore',
        text: 'Authentic Ilavam Panju mattress. Reminds me of the ones my grandmother used to make. Pure nostalgia and comfort.',
        rating: 5,
    },
    {
        id: 3,
        name: 'Anita Desai',
        location: 'Bangalore',
        text: 'Excellent service and timely delivery. The pillows are perfect for my neck pain.',
        rating: 5,
    },
    {
        id: 4,
        name: 'Suresh Menon',
        location: 'Kochi',
        text: 'Worth every rupee. The natural cooling effect is real, especially during summer.',
        rating: 4,
    },
];

const Testimonials = () => {
    return (
        <section className="py-24 bg-primary">
            <div className="container mx-auto px-6 md:px-12 lg:px-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="inline-block px-4 py-1.5 bg-cotton-white/20 text-cotton-white text-sm font-medium rounded-full mb-4">
                        Customer Reviews
                    </span>
                    <h2 className="font-display text-4xl md:text-5xl font-bold text-cotton-white mb-4">
                        What Our Customers Say
                    </h2>
                    <p className="text-lg text-sage max-w-2xl mx-auto">
                        Join thousands of happy sleepers who made the switch to natural comfort
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-cotton-white rounded-2xl p-6 shadow-elevated"
                        >
                            <Quote className="w-8 h-8 text-sage mb-4" />
                            <p className="text-foreground mb-6 leading-relaxed">
                                "{testimonial.text}"
                            </p>
                            <div className="flex items-center gap-1 mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 text-gold fill-gold" />
                                ))}
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-sage/30 flex items-center justify-center">
                                    <span className="font-semibold text-primary">
                                        {testimonial.name.charAt(0)}
                                    </span>
                                </div>
                                <div>
                                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
