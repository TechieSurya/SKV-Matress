import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, limit, orderBy } from 'firebase/firestore';
import ProductCard from '@/components/ProductCard';

const FeaturedProducts = () => {
    const [loading, setLoading] = useState(true);
    const [featuredProducts, setFeaturedProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const q = query(collection(db, 'products'), orderBy('created_at', 'desc'), limit(4));
                const querySnapshot = await getDocs(q);
                const products = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setFeaturedProducts(products);
            } catch (error) {
                console.error('Error fetching featured products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <section className="py-24 lg:py-32 gradient-natural">
            <div className="container mx-auto px-6 md:px-12 lg:px-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
                >
                    <div>
                        <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
                            Our Collection
                        </span>
                        <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
                            Featured Products
                        </h2>
                    </div>
                    <Link to="/products">
                        <button className="group inline-flex items-center justify-center px-4 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-full font-medium transition-colors">
                            View All Products
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </Link>
                </motion.div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 3xl:grid-cols-4 gap-8 xl:gap-10">
                    {loading
                        ? Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm animate-pulse">
                                <div className="aspect-square bg-gray-200" />
                                <div className="p-5 space-y-3">
                                    <div className="h-4 bg-gray-200 rounded w-1/3" />
                                    <div className="h-6 bg-gray-200 rounded w-3/4" />
                                    <div className="h-4 bg-gray-200 rounded w-full" />
                                    <div className="h-6 bg-gray-200 rounded w-1/4" />
                                </div>
                            </div>
                        ))
                        : featuredProducts.map((product, index) => (
                            <ProductCard key={product.id} product={product} index={index} />
                        ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedProducts;
