import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Eye, ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/utils';

const ProductCard = ({ product, index = 0 }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group h-full"
        >
            <Link
                to={`/products/${product.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')}`}
                state={{ productId: product.id }}
                className="block h-full"
            >
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg shadow-sage-900/5 hover:shadow-2xl hover:shadow-sage-900/10 transition-all duration-500 h-full flex flex-col border border-sage-100 hover:border-gold-200 relative transform hover:-translate-y-1">
                    {/* Image Container */}
                    <div className="relative aspect-square overflow-hidden bg-cream-50">
                        {/* Badges */}
                        <div className="absolute top-4 left-4 flex flex-col gap-2 z-20">
                            {product.badge && (
                                <span
                                    className={cn(
                                        'px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-full shadow-sm backdrop-blur-md border border-white/20',
                                        product.badge === 'Bestseller' && 'bg-forest-900/90 text-white',
                                        product.badge === 'Premium' && 'bg-gold-500/90 text-white',
                                        product.badge === 'Luxury' && 'bg-purple-900/90 text-white',
                                        product.badge === 'New' && 'bg-emerald-600/90 text-white',
                                        product.badge === 'Doctor Recommended' && 'bg-blue-600/90 text-white'
                                    )}
                                >
                                    {product.badge}
                                </span>
                            )}
                        </div>

                        {/* Discount Badge */}
                        {product.original_price && (
                            <span className="absolute top-4 right-4 px-3 py-1.5 bg-red-500 text-white text-xs font-bold rounded-full z-20 shadow-sm">
                                -{Math.round(((product.original_price - product.price) / product.original_price) * 100)}%
                            </span>
                        )}

                        <img
                            src={product.image_url || product.image}
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />

                        {/* Overlay Actions */}
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 backdrop-blur-[2px]">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-6 py-3 rounded-full bg-white text-forest-900 font-medium flex items-center gap-2 shadow-xl hover:bg-gold-500 hover:text-white transition-all duration-300"
                            >
                                <Eye className="w-4 h-4" />
                                View Details
                            </motion.button>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-1">
                        <div className="mb-3">
                            <p className="text-xs text-gold-600 font-bold uppercase tracking-widest mb-2">
                                {product.category}
                            </p>
                            <h3 className="font-display text-xl font-bold text-forest-900 group-hover:text-gold-600 transition-colors line-clamp-1">
                                {product.name}
                            </h3>
                        </div>

                        <p className="text-sm text-muted-foreground mb-6 line-clamp-2 flex-1 font-light leading-relaxed">
                            {product.short_description || product.shortDescription}
                        </p>

                        <div className="flex items-end justify-between mt-auto pt-4 border-t border-sage-50">
                            <div className="flex flex-col">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-2xl font-bold text-forest-900">
                                        ₹{product.price.toLocaleString()}
                                    </span>
                                    {product.original_price && (
                                        <span className="text-sm text-muted-foreground line-through decoration-red-500/30">
                                            ₹{product.original_price.toLocaleString()}
                                        </span>
                                    )}
                                </div>
                                <div className="flex items-center gap-1">
                                    <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={cn(
                                                    "w-3.5 h-3.5",
                                                    i < (product.rating || 5) ? "text-gold-400 fill-gold-400" : "text-gray-200 fill-gray-200"
                                                )}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-xs text-muted-foreground ml-1">
                                        ({product.reviews || product.reviews_count || 120})
                                    </span>
                                </div>
                            </div>

                            <div className="w-12 h-12 rounded-full bg-forest-50 flex items-center justify-center text-forest-900 group-hover:bg-forest-900 group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-lg group-hover:scale-110">
                                <ShoppingBag className="w-5 h-5" />
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

export default ProductCard;
