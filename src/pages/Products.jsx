import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Filter, X, SlidersHorizontal, Sparkles, Truck, Shield } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { cn } from '@/lib/utils';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

const Products = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [showFilters, setShowFilters] = useState(false);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'products'));
                const productsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

                if (productsData.length > 0) {
                    setProducts(productsData);
                } else {
                    // Dummy Data Fallback
                    setProducts([
                        {
                            id: '1',
                            name: 'Classic Comfort Mattress',
                            category: 'mattress',
                            price: 8999,
                            original_price: 11999,
                            rating: 4.8,
                            reviews: 234,
                            badge: 'Bestseller',
                            image_url: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=1000&auto=format&fit=crop',
                            short_description: 'Handcrafted natural cotton mattress for restful sleep',
                            description: 'Experience the pure comfort of 100% natural Kapok cotton. Our Classic Comfort Mattress is handcrafted by skilled artisans to provide the perfect balance of support and softness. Hypoallergenic and breathable, it keeps you cool in summer and warm in winter.',
                            sizes: [
                                { name: 'Single', dimensions: '72" x 36"', priceModifier: 0 },
                                { name: 'Double', dimensions: '72" x 48"', priceModifier: 3000 },
                                { name: 'Queen', dimensions: '72" x 60"', priceModifier: 6000 },
                                { name: 'King', dimensions: '72" x 72"', priceModifier: 9000 }
                            ],
                            thickness: ['4 inches', '6 inches', '8 inches'],
                            features: ['100% Organic Cotton', 'Hypoallergenic', 'Temperature Regulating', 'Durable Stitching'],
                            in_stock: true
                        },
                        {
                            id: '2',
                            name: 'Premium Orthopedic Mattress',
                            category: 'mattress',
                            price: 12999,
                            original_price: 16999,
                            rating: 4.9,
                            reviews: 189,
                            badge: 'Premium',
                            image_url: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=1000&auto=format&fit=crop',
                            short_description: 'Expert spine support with natural cotton comfort',
                            description: 'Designed for those who need extra back support without compromising on natural comfort. The Premium Orthopedic Mattress features a denser cotton core for firm support, promoting healthy spinal alignment while you sleep.',
                            sizes: [
                                { name: 'Single', dimensions: '72" x 36"', priceModifier: 0 },
                                { name: 'Double', dimensions: '72" x 48"', priceModifier: 4000 },
                                { name: 'Queen', dimensions: '72" x 60"', priceModifier: 8000 },
                                { name: 'King', dimensions: '72" x 72"', priceModifier: 12000 }
                            ],
                            thickness: ['5 inches', '6 inches', '8 inches'],
                            features: ['Orthopedic Support', 'High Density Core', 'Back Pain Relief', 'Natural Cooling'],
                            in_stock: true
                        },
                        {
                            id: '3',
                            name: 'Luxury Silk-Cotton Mattress',
                            category: 'mattress',
                            price: 18999,
                            original_price: 24999,
                            rating: 5.0,
                            reviews: 87,
                            badge: 'Luxury',
                            image_url: 'https://images.unsplash.com/photo-1505693416388-b0346efee535?q=80&w=1000&auto=format&fit=crop',
                            short_description: 'Premium silk-cotton blend for luxurious comfort',
                            description: 'The ultimate in natural luxury. We blend the finest silk with organic cotton to create a mattress that feels like sleeping on a cloud. Exceptionally soft, breathable, and elegant, it transforms your bedroom into a sanctuary.',
                            sizes: [
                                { name: 'Queen', dimensions: '72" x 60"', priceModifier: 0 },
                                { name: 'King', dimensions: '72" x 72"', priceModifier: 5000 }
                            ],
                            thickness: ['8 inches', '10 inches'],
                            features: ['Silk-Cotton Blend', 'Ultra Soft', 'Premium Jacquard Cover', 'Temperature Control'],
                            in_stock: true
                        },
                        {
                            id: '4',
                            name: 'Cloud Soft Pillow',
                            category: 'pillow',
                            price: 899,
                            original_price: 1299,
                            rating: 4.7,
                            reviews: 450,
                            badge: 'Bestseller',
                            image_url: 'https://images.unsplash.com/photo-1584132915807-fd1f5fbc078f?q=80&w=1000&auto=format&fit=crop',
                            short_description: 'Plush organic cotton pillow for neck support',
                            description: 'Rest your head on pure nature. Our Cloud Soft Pillow is filled with fluffy, organic Kapok cotton that molds to your neck and head for personalized support. Say goodbye to synthetic fillers and hello to natural sleep.',
                            sizes: [
                                { name: 'Standard', dimensions: '17" x 27"', priceModifier: 0 },
                                { name: 'Large', dimensions: '20" x 30"', priceModifier: 300 }
                            ],
                            thickness: [],
                            features: ['Adjustable Loft', 'Machine Washable Cover', 'Hypoallergenic', 'Neck Support'],
                            in_stock: true
                        },
                        {
                            id: '5',
                            name: 'Cervical Support Pillow',
                            category: 'pillow',
                            price: 1299,
                            original_price: 1899,
                            rating: 4.8,
                            reviews: 120,
                            badge: 'Doctor Recommended',
                            image_url: 'https://images.unsplash.com/photo-1629949009765-40f7f424d19e?q=80&w=1000&auto=format&fit=crop',
                            short_description: 'Ergonomic design for neck pain relief',
                            description: 'Wake up pain-free. This pillow is ergonomically shaped to cradle your neck and align your spine. Ideal for side and back sleepers, it provides the firm support needed to alleviate tension and stiffness.',
                            sizes: [
                                { name: 'Standard', dimensions: '15" x 24"', priceModifier: 0 }
                            ],
                            thickness: [],
                            features: ['Ergonomic Contour', 'Firm Support', 'Spine Alignment', 'Breathable Cover'],
                            in_stock: true
                        },
                        {
                            id: '6',
                            name: 'Royal Bolster Pillow',
                            category: 'pillow',
                            price: 1499,
                            original_price: 1999,
                            rating: 4.6,
                            reviews: 95,
                            badge: 'New',
                            image_url: 'https://images.unsplash.com/photo-1616627547584-bf28ceeecdb9?q=80&w=1000&auto=format&fit=crop',
                            short_description: 'Traditional cylindrical pillow for yoga and support',
                            description: 'Versatile and stylish. Use it for yoga support, as a decorative accent, or for extra comfort while reading in bed. Filled with firm organic cotton, it maintains its shape and provides excellent support.',
                            sizes: [
                                { name: 'Standard', dimensions: '30" x 10"', priceModifier: 0 }
                            ],
                            thickness: [],
                            features: ['Multi-purpose', 'Firm Density', 'Traditional Design', 'Durable'],
                            in_stock: true
                        }
                    ]);
                }
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const categoryFilter = searchParams.get('category') || 'all';
    const priceFilter = searchParams.get('price') || 'all';

    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            if (categoryFilter !== 'all' && product.category !== categoryFilter) return false;
            if (priceFilter !== 'all') {
                if (priceFilter === 'under-5000' && product.price >= 5000) return false;
                if (priceFilter === '5000-10000' && (product.price < 5000 || product.price > 10000)) return false;
                if (priceFilter === '10000-20000' && (product.price < 10000 || product.price > 20000)) return false;
                if (priceFilter === 'above-20000' && product.price <= 20000) return false;
            }
            return true;
        });
    }, [products, categoryFilter, priceFilter]);

    const updateFilter = (key, value) => {
        const newParams = new URLSearchParams(searchParams);
        if (value === 'all') newParams.delete(key);
        else newParams.set(key, value);
        setSearchParams(newParams);
    };

    const clearFilters = () => setSearchParams(new URLSearchParams());

    const categories = [
        { value: 'all', label: 'All Products' },
        { value: 'mattress', label: 'Mattresses' },
        { value: 'pillow', label: 'Pillows' },
    ];

    const priceRanges = [
        { value: 'all', label: 'All Prices' },
        { value: 'under-5000', label: 'Under ₹5,000' },
        { value: '5000-10000', label: '₹5,000 - ₹10,000' },
        { value: '10000-20000', label: '₹10,000 - ₹20,000' },
        { value: 'above-20000', label: 'Above ₹20,000' },
    ];

    const hasActiveFilters = categoryFilter !== 'all' || priceFilter !== 'all';

    return (
        <>
            <Helmet>
                <title>Shop Mattresses & Pillows | SKV Natural Beds</title>
                <meta
                    name="description"
                    content="Browse our collection of handcrafted SKV Natural Beds natural cotton mattresses and pillows. Filter by size, price, and category. Free shipping on orders above ₹5000."
                />
            </Helmet>

            <div className="min-h-screen bg-background">
                <Navbar />

                <main className="pt-32 md:pt-36 pb-16">
                    {/* Premium Hero Banner */}
                    <section className="relative py-20 lg:py-28 mb-12 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-forest-900 via-forest-800 to-forest-900" />

                        {/* Pattern Overlay */}
                        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        }} />

                        <div className="absolute inset-0 opacity-30">
                            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-400/30 rounded-full blur-[100px]" />
                            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-sage-400/20 rounded-full blur-[100px]" />
                        </div>

                        <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-center max-w-3xl mx-auto"
                            >
                                <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 text-gold-200 rounded-full text-sm font-medium mb-6">
                                    <Sparkles className="w-4 h-4" />
                                    Handcrafted Excellence
                                </span>
                                <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
                                    Our Collection
                                </h1>
                                <p className="text-lg md:text-xl text-sage-100 mb-10 font-light max-w-2xl mx-auto leading-relaxed">
                                    Discover the perfect balance of nature and comfort with our handcrafted organic cotton mattresses and pillows.
                                </p>

                                {/* Trust Badges */}
                                <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                                    {[
                                        { icon: Truck, text: 'Free Shipping' },
                                        { icon: Shield, text: '5-Year Warranty' },
                                        { icon: Sparkles, text: '100% Natural' },
                                    ].map((badge) => (
                                        <div key={badge.text} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-sage-100">
                                            <badge.icon className="w-4 h-4 text-gold-400" />
                                            <span className="text-sm font-medium">{badge.text}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </section>

                    <div className="container mx-auto px-4 md:px-8 lg:px-12 xl:px-20">
                        {/* Filter Toggle (Mobile) */}
                        <div className="lg:hidden mb-8 sticky top-24 z-30">
                            <button
                                onClick={() => setShowFilters(true)}
                                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-white/90 backdrop-blur-md border border-sage-200 shadow-lg text-forest-900 rounded-full font-medium transition-all active:scale-95"
                            >
                                <SlidersHorizontal className="w-4 h-4" />
                                Filter Products
                                {hasActiveFilters && (
                                    <span className="ml-1 w-5 h-5 bg-gold-500 text-white text-xs rounded-full flex items-center justify-center font-bold">!</span>
                                )}
                            </button>
                        </div>

                        <div className="flex flex-col lg:flex-row gap-8 xl:gap-12">
                            {/* Desktop Sidebar */}
                            <aside className="hidden lg:block lg:w-64 flex-shrink-0 space-y-8 lg:sticky lg:top-24 lg:h-fit">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="font-display text-2xl font-bold text-forest-900 flex items-center gap-2">
                                        <Filter className="w-5 h-5 text-forest-900" />
                                        Filters
                                    </h3>
                                    {hasActiveFilters && (
                                        <button
                                            onClick={clearFilters}
                                            className="text-sm font-medium text-red-500 hover:text-red-600 hover:underline transition-colors"
                                        >
                                            Clear all
                                        </button>
                                    )}
                                </div>

                                <div>
                                    <h4 className="text-sm font-bold text-forest-900 uppercase tracking-widest mb-4 pl-2">Category</h4>
                                    <div className="space-y-1">
                                        {categories.map((cat) => (
                                            <button
                                                key={cat.value}
                                                onClick={() => updateFilter('category', cat.value)}
                                                className={cn(
                                                    'w-full text-left px-4 py-3 rounded-lg text-base transition-all duration-300 flex items-center justify-between group font-medium',
                                                    categoryFilter === cat.value
                                                        ? 'text-forest-900 bg-sage-50'
                                                        : 'text-muted-foreground hover:text-forest-900 hover:bg-sage-50/50'
                                                )}
                                            >
                                                {cat.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-sm font-bold text-forest-900 uppercase tracking-widest mb-4 pl-2">Price Range</h4>
                                    <div className="space-y-1">
                                        {priceRanges.map((range) => (
                                            <button
                                                key={range.value}
                                                onClick={() => updateFilter('price', range.value)}
                                                className={cn(
                                                    'w-full text-left px-4 py-3 rounded-lg text-base transition-all duration-300 flex items-center justify-between group font-medium',
                                                    priceFilter === range.value
                                                        ? 'text-forest-900 bg-sage-50'
                                                        : 'text-muted-foreground hover:text-forest-900 hover:bg-sage-50/50'
                                                )}
                                            >
                                                {range.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </aside>

                            {/* Mobile Filter Drawer */}
                            {showFilters && (
                                <div className="fixed inset-0 z-50 lg:hidden">
                                    {/* Backdrop */}
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        onClick={() => setShowFilters(false)}
                                        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                                    />

                                    {/* Drawer */}
                                    <motion.div
                                        initial={{ x: '100%' }}
                                        animate={{ x: 0 }}
                                        exit={{ x: '100%' }}
                                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                                        className="absolute right-0 top-0 bottom-0 w-[300px] bg-white shadow-2xl p-6 overflow-y-auto"
                                    >
                                        <div className="flex items-center justify-between mb-8">
                                            <h3 className="font-display text-2xl font-bold text-forest-900">Filters</h3>
                                            <button
                                                onClick={() => setShowFilters(false)}
                                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                            >
                                                <X className="w-6 h-6 text-gray-500" />
                                            </button>
                                        </div>

                                        <div className="space-y-8">
                                            <div>
                                                <h4 className="text-sm font-bold text-forest-900 uppercase tracking-widest mb-4">Category</h4>
                                                <div className="space-y-2">
                                                    {categories.map((cat) => (
                                                        <button
                                                            key={cat.value}
                                                            onClick={() => {
                                                                updateFilter('category', cat.value);
                                                                setShowFilters(false);
                                                            }}
                                                            className={cn(
                                                                'w-full text-left px-4 py-3 rounded-lg text-base transition-all flex items-center justify-between font-medium',
                                                                categoryFilter === cat.value
                                                                    ? 'bg-forest-900 text-white'
                                                                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                                                            )}
                                                        >
                                                            {cat.label}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            <div>
                                                <h4 className="text-sm font-bold text-forest-900 uppercase tracking-widest mb-4">Price Range</h4>
                                                <div className="space-y-2">
                                                    {priceRanges.map((range) => (
                                                        <button
                                                            key={range.value}
                                                            onClick={() => {
                                                                updateFilter('price', range.value);
                                                                setShowFilters(false);
                                                            }}
                                                            className={cn(
                                                                'w-full text-left px-4 py-3 rounded-lg text-base transition-all flex items-center justify-between font-medium',
                                                                priceFilter === range.value
                                                                    ? 'bg-forest-900 text-white'
                                                                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                                                            )}
                                                        >
                                                            {range.label}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            {hasActiveFilters && (
                                                <button
                                                    onClick={() => {
                                                        clearFilters();
                                                        setShowFilters(false);
                                                    }}
                                                    className="w-full py-3 border-2 border-red-100 text-red-500 font-bold rounded-xl hover:bg-red-50 transition-colors"
                                                >
                                                    Clear All Filters
                                                </button>
                                            )}
                                        </div>
                                    </motion.div>
                                </div>
                            )}

                            {/* Products Grid */}
                            <div className="flex-1">
                                {hasActiveFilters && (
                                    <div className="flex flex-wrap gap-3 mb-8">
                                        {categoryFilter !== 'all' && (
                                            <span className="inline-flex items-center gap-2 px-4 py-2 bg-forest-50 text-forest-900 text-sm font-medium rounded-full border border-forest-100">
                                                {categories.find((c) => c.value === categoryFilter)?.label}
                                                <button onClick={() => updateFilter('category', 'all')} className="hover:text-red-500 transition-colors"><X className="w-4 h-4" /></button>
                                            </span>
                                        )}
                                        {priceFilter !== 'all' && (
                                            <span className="inline-flex items-center gap-2 px-4 py-2 bg-forest-50 text-forest-900 text-sm font-medium rounded-full border border-forest-100">
                                                {priceRanges.find((p) => p.value === priceFilter)?.label}
                                                <button onClick={() => updateFilter('price', 'all')} className="hover:text-red-500 transition-colors"><X className="w-4 h-4" /></button>
                                            </span>
                                        )}
                                    </div>
                                )}

                                <div className="flex items-center justify-between mb-8">
                                    <p className="text-forest-600 font-medium">
                                        Showing <span className="text-forest-900 font-bold">{filteredProducts.length}</span> results
                                    </p>
                                </div>

                                {loading ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {[1, 2, 3, 4, 5, 6].map((n) => (
                                            <div key={n} className="bg-white rounded-3xl h-[400px] animate-pulse bg-gray-100" />
                                        ))}
                                    </div>
                                ) : filteredProducts.length > 0 ? (
                                    <motion.div
                                        initial="hidden"
                                        animate="visible"
                                        variants={{
                                            hidden: { opacity: 0 },
                                            visible: {
                                                opacity: 1,
                                                transition: {
                                                    staggerChildren: 0.1
                                                }
                                            }
                                        }}
                                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-6 lg:gap-8"
                                    >
                                        {filteredProducts.map((product, index) => (
                                            <motion.div
                                                key={product.id}
                                                variants={{
                                                    hidden: { opacity: 0, y: 20 },
                                                    visible: { opacity: 1, y: 0 }
                                                }}
                                            >
                                                <ProductCard product={product} index={index} />
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                ) : (
                                    <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-sage-200">
                                        <div className="w-16 h-16 bg-sage-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Filter className="w-8 h-8 text-sage-400" />
                                        </div>
                                        <h3 className="text-xl font-display font-bold text-forest-900 mb-2">No products found</h3>
                                        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                                            We couldn't find any products matching your current filters. Try adjusting your search criteria.
                                        </p>
                                        <button
                                            onClick={clearFilters}
                                            className="px-6 py-3 bg-forest-900 text-white rounded-full hover:bg-forest-800 transition-colors font-medium shadow-lg hover:shadow-xl"
                                        >
                                            Clear All Filters
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </main>

                <Footer />
            </div>
        </>
    );
};

export default Products;
