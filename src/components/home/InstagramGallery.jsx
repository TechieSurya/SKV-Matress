import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Heart, MessageCircle } from 'lucide-react';

const galleryImages = [
    {
        src: 'https://images.unsplash.com/photo-1616627577385-5c0c4dab4d39?w=400&q=80',
        likes: '2.3k',
        comments: '48',
    },
    {
        src: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&q=80',
        likes: '1.8k',
        comments: '32',
    },
    {
        src: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&q=80',
        likes: '3.1k',
        comments: '67',
    },
    {
        src: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&q=80',
        likes: '2.7k',
        comments: '54',
    },
    {
        src: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e6?w=400&q=80',
        likes: '1.5k',
        comments: '29',
    },
    {
        src: 'https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4?w=400&q=80',
        likes: '2.1k',
        comments: '41',
    },
];

const InstagramGallery = () => {
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
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 text-pink-700 rounded-full text-sm font-medium mb-4">
                        <Instagram className="w-4 h-4" />
                        <span>@skvnaturalbeds</span>
                    </div>
                    <h2 className="text-3xl lg:text-4xl font-serif font-bold text-forest-900 mb-3">
                        Join Our Community
                    </h2>
                    <p className="text-muted-foreground max-w-xl mx-auto">
                        See how families across India are sleeping better with SKV Natural Beds
                    </p>
                </motion.div>

                {/* Gallery Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {galleryImages.map((image, index) => (
                        <motion.a
                            key={index}
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.4 }}
                            whileHover={{ scale: 1.05 }}
                            className="group relative aspect-square rounded-2xl overflow-hidden shadow-md"
                        >
                            <img
                                src={image.src}
                                alt={`Instagram post ${index + 1}`}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />

                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-forest-900/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <div className="flex items-center gap-4 text-cotton-white">
                                    <div className="flex items-center gap-1">
                                        <Heart className="w-5 h-5 fill-current" />
                                        <span className="text-sm font-medium">{image.likes}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <MessageCircle className="w-5 h-5" />
                                        <span className="text-sm font-medium">{image.comments}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Instagram Icon */}
                            <div className="absolute top-3 right-3 w-8 h-8 bg-cotton-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <Instagram className="w-4 h-4 text-pink-600" />
                            </div>
                        </motion.a>
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                    className="text-center mt-10"
                >
                    <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-cotton-white font-semibold rounded-full hover:shadow-lg hover:shadow-pink-500/25 transition-all duration-300"
                    >
                        <Instagram className="w-5 h-5" />
                        Follow Us on Instagram
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default InstagramGallery;
