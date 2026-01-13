import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ShoppingBag, Minus, Plus, ChevronLeft, Truck, Shield, RotateCcw, Check, Phone, Heart, Share2, Leaf, Award, Clock, ChevronDown, ChevronUp, MessageCircle, ShieldCheck, RefreshCw } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { db } from '@/lib/firebase';
import { doc, getDoc, collection, query, where, limit, getDocs } from 'firebase/firestore';
import { useCart } from '@/context/CartContext';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import ProductSchema from '@/components/seo/ProductSchema';
import ProductCard from '@/components/ProductCard';
import SizeGuideModal from '@/components/product/SizeGuideModal';

const ProductDetail = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { addToCart } = useCart();

    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedThickness, setSelectedThickness] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [activeAccordion, setActiveAccordion] = useState(null);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [openAccordion, setOpenAccordion] = useState('description');
    const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            if (!slug) return;
            setIsLoading(true);

            try {
                let productData = null;
                let docId = location.state?.productId;

                // If we have the ID from state, fetch directly
                if (docId) {
                    const docRef = doc(db, 'products', docId);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        productData = { id: docSnap.id, ...data };
                    }
                }
                // Otherwise, find by slug (fetch all and filter - temporary solution until DB migration)
                else {
                    const q = query(collection(db, 'products'));
                    const querySnapshot = await getDocs(q);

                    const foundDoc = querySnapshot.docs.find(doc => {
                        const data = doc.data();
                        const productSlug = data.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
                        return productSlug === slug;
                    });

                    if (foundDoc) {
                        productData = { id: foundDoc.id, ...foundDoc.data() };
                    }
                }

                if (productData) {
                    const data = productData;

                    // Standard defaults for mattresses if missing or to enforce consistency
                    const isMattress = data.category === 'mattress' || data.name.toLowerCase().includes('mattress');

                    const standardSizes = [
                        { name: 'Single Cot Bed', dimensions: '72 x 36 inches', priceModifier: 0 },
                        { name: 'Double Cot Bed', dimensions: '72 x 48 inches', priceModifier: 3000 },
                        { name: 'Queen Size Bed', dimensions: '75 x 60 inches', priceModifier: 6000 },
                        { name: 'King Size Bed', dimensions: '78 x 72 inches', priceModifier: 10000 }
                    ];

                    const standardThickness = ['5 Inch', '6 Inch', '7 Inch', '8 Inch'];

                    productData = {
                        ...data,
                        sizes: isMattress ? standardSizes : (Array.isArray(data.sizes) ? data.sizes : []),
                        thickness: isMattress ? standardThickness : (Array.isArray(data.thickness) ? data.thickness : null),
                        features: Array.isArray(data.features) ? data.features : null,
                        images: data.images || [data.image_url],
                    };
                } else {
                    // Dummy products with multiple images
                    const dummyProducts = [
                        {
                            id: '1',
                            name: 'Classic Comfort Mattress',
                            category: 'mattress',
                            price: 5000,
                            original_price: 9000,
                            rating: 4.8,
                            reviews_count: 5392,
                            badge: 'Bestseller',
                            image_url: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=1000&auto=format&fit=crop',
                            images: [
                                'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=1000&auto=format&fit=crop',
                                'https://images.unsplash.com/photo-1505693416388-b0346efee535?q=80&w=1000&auto=format&fit=crop',
                                'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=1000&auto=format&fit=crop',
                                'https://images.unsplash.com/photo-1616627547584-bf28ceeecdb9?q=80&w=1000&auto=format&fit=crop'
                            ],
                            short_description: 'Handcrafted natural cotton mattress for restful sleep',
                            description: 'Experience the pure comfort of 100% natural Kapok cotton. Our Classic Comfort Mattress is handcrafted by skilled artisans to provide the perfect balance of support and softness. Hypoallergenic and breathable, it keeps you cool in summer and warm in winter.',
                            sizes: [
                                { name: 'Single Cot Bed', dimensions: '72 x 36 inches', priceModifier: 0 },
                                { name: 'Double Cot Bed', dimensions: '72 x 48 inches', priceModifier: 3000 },
                                { name: 'Queen Size Bed', dimensions: '75 x 60 inches', priceModifier: 6000 },
                                { name: 'King Size Bed', dimensions: '78 x 72 inches', priceModifier: 10000 }
                            ],
                            thickness: ['5 Inch', '6 Inch', '7 Inch', '8 Inch'],
                            features: ['100% Organic Cotton', 'Hypoallergenic', 'Temperature Regulating', 'Durable Stitching'],
                            in_stock: true
                        },
                        {
                            id: '2',
                            name: 'Premium Orthopedic Mattress',
                            category: 'mattress',
                            price: 8000,
                            original_price: 13000,
                            rating: 4.9,
                            reviews_count: 2189,
                            badge: 'Premium',
                            image_url: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=1000&auto=format&fit=crop',
                            images: [
                                'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=1000&auto=format&fit=crop',
                                'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=1000&auto=format&fit=crop',
                                'https://images.unsplash.com/photo-1505693416388-b0346efee535?q=80&w=1000&auto=format&fit=crop'
                            ],
                            short_description: 'Expert spine support with natural cotton comfort',
                            description: 'Designed for those who need extra back support without compromising on natural comfort. The Premium Orthopedic Mattress features a denser cotton core for firm support, promoting healthy spinal alignment while you sleep.',
                            sizes: [
                                { name: 'Single Cot Bed', dimensions: '72 x 36 inches', priceModifier: 0 },
                                { name: 'Double Cot Bed', dimensions: '72 x 48 inches', priceModifier: 4000 },
                                { name: 'Queen Size Bed', dimensions: '75 x 60 inches', priceModifier: 8000 },
                                { name: 'King Size Bed', dimensions: '78 x 72 inches', priceModifier: 12000 }
                            ],
                            thickness: ['5 Inch', '6 Inch', '7 Inch', '8 Inch'],
                            features: ['Orthopedic Support', 'High Density Core', 'Back Pain Relief', 'Natural Cooling'],
                            in_stock: true
                        },
                        {
                            id: '3',
                            name: 'Luxury Silk-Cotton Mattress',
                            category: 'mattress',
                            price: 12000,
                            original_price: 18000,
                            rating: 5.0,
                            reviews_count: 876,
                            badge: 'Luxury',
                            image_url: 'https://images.unsplash.com/photo-1505693416388-b0346efee535?q=80&w=1000&auto=format&fit=crop',
                            images: [
                                'https://images.unsplash.com/photo-1505693416388-b0346efee535?q=80&w=1000&auto=format&fit=crop',
                                'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=1000&auto=format&fit=crop'
                            ],
                            short_description: 'Premium silk-cotton blend for luxurious comfort',
                            description: 'The ultimate in natural luxury. We blend the finest silk with organic cotton to create a mattress that feels like sleeping on a cloud. Exceptionally soft, breathable, and elegant, it transforms your bedroom into a sanctuary.',
                            sizes: [
                                { name: 'Queen Size Bed', dimensions: '75 x 60 inches', priceModifier: 0 },
                                { name: 'King Size Bed', dimensions: '78 x 72 inches', priceModifier: 5000 }
                            ],
                            thickness: ['6 Inch', '8 Inch', '10 Inch'],
                            features: ['Silk-Cotton Blend', 'Ultra Soft', 'Premium Jacquard Cover', 'Temperature Control'],
                            in_stock: true
                        }
                    ];

                    if (docId) {
                        productData = dummyProducts.find(p => p.id === docId);
                    } else {
                        productData = dummyProducts.find(p =>
                            p.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '') === slug
                        );
                    }
                    if (productData) {
                        // Simulate related products
                        setRelatedProducts(dummyProducts.filter(p => p.id !== productData.id).slice(0, 3));
                    }
                }

                if (productData) {
                    setProduct(productData);
                    setSelectedSize(productData.sizes[0]?.name || '');
                    setSelectedThickness(productData.thickness?.[0] || '');
                    setSelectedImage(productData.images?.[0] || productData.image_url);
                }
            } catch (error) {
                console.error('Error fetching product:', error);
                toast({ title: 'Error', description: 'Failed to load product', variant: 'destructive' });
            } finally {
                setIsLoading(false);
            }
        };

        fetchProduct();
    }, [slug, location.state]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center gap-4"
                >
                    <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                    <p className="text-muted-foreground">Loading product...</p>
                </motion.div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center px-4"
                >
                    <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                        <ShoppingBag className="w-12 h-12 text-muted-foreground" />
                    </div>
                    <h1 className="text-2xl md:text-3xl font-display font-bold mb-4 text-foreground">Product not found</h1>
                    <p className="text-muted-foreground mb-6">The product you're looking for doesn't exist or has been removed.</p>
                    <Link to="/products">
                        <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8">
                            <ChevronLeft className="w-4 h-4 mr-2" />
                            Back to Products
                        </button>
                    </Link>
                </motion.div>
            </div>
        );
    }

    const getProductPrice = () => {
        const size = product.sizes.find((s) => s.name === selectedSize);
        if (!size) return product.price;

        // Use absolute price if available, otherwise fall back to modifier logic
        if (size.price !== undefined && size.price !== null && size.price !== "") {
            return Number(size.price);
        }
        return product.price + (size.priceModifier || 0);
    };

    const currentPrice = getProductPrice();

    const currentOriginalPrice = product.original_price
        ? (currentPrice * (product.original_price / (product.price || 1)))
        : null;

    const handleAddToCart = () => {
        const cartProduct = {
            id: product.id,
            name: product.name,
            price: currentPrice, // Use the calculated price
            originalPrice: product.original_price || undefined,
            image: product.image_url || '/placeholder.svg',
            category: product.category,
            description: product.description || '',
            shortDescription: product.short_description || '',
            sizes: product.sizes,
            thickness: product.thickness || undefined,
            features: product.features || [],
            rating: product.rating || 0,
            reviews: product.reviews_count || 0,
            inStock: product.in_stock,
        };
        addToCart(cartProduct, selectedSize, selectedThickness, quantity);
        toast({
            title: `${product.name} added to cart!`,
            description: `Size: ${selectedSize}${selectedThickness ? `, Thickness: ${selectedThickness}` : ''}`,
        });
    };

    const handleBuyNow = () => {
        handleAddToCart();
        navigate('/cart');
    };

    const handleShare = async () => {
        if (navigator.share) {
            await navigator.share({
                title: product.name,
                text: product.short_description || '',
                url: window.location.href,
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            toast({ title: 'Success', description: 'Link copied to clipboard!' });
        }
    };

    const pageTitle = product.meta_title || `${product.name} | SKV Natural Beds`;
    const pageDescription = product.meta_description || product.short_description || product.description || '';
    const productUrl = typeof window !== 'undefined' ? window.location.href : '';
    const imageUrl = product.image_url || '/placeholder.svg';

    const trustBadges = [
        { icon: Truck, label: 'Free Delivery', sublabel: 'Orders above ₹5,000', color: 'text-emerald-600' },
        { icon: Shield, label: '10 Year Warranty', sublabel: 'Guaranteed quality', color: 'text-blue-600' },
        { icon: RotateCcw, label: '7 Day Returns', sublabel: 'Easy returns', color: 'text-amber-600' },
        { icon: Leaf, label: '100% Natural', sublabel: 'Eco-friendly', color: 'text-green-600' },
    ];

    const highlights = [
        { icon: Award, text: 'Handcrafted by Artisans' },
        { icon: Leaf, text: '100% Organic Kapok Cotton' },
        { icon: Clock, text: 'Ships within 3-5 days' },
    ];

    return (
        <>
            <Helmet>
                <title>{pageTitle}</title>
                <meta name="description" content={pageDescription} />
                {product.canonical_url && <link rel="canonical" href={product.canonical_url} />}
                <meta property="og:type" content="product" />
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={pageDescription} />
                <meta property="og:image" content={imageUrl} />
                <meta property="og:url" content={productUrl} />
                <meta property="product:price:amount" content={product.price.toString()} />
                <meta property="product:price:currency" content="INR" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={pageTitle} />
                <meta name="twitter:description" content={pageDescription} />
                <meta name="twitter:image" content={imageUrl} />
            </Helmet>

            <ProductSchema
                product={{
                    name: product.name,
                    description: product.description || product.short_description || '',
                    price: product.price,
                    originalPrice: product.original_price || undefined,
                    image: imageUrl,
                    sku: product.sku || undefined,
                    brand: product.brand || 'SKV Natural Beds',
                    gtin: product.gtin || undefined,
                    mpn: product.mpn || undefined,
                    inStock: product.in_stock,
                    rating: product.rating || undefined,
                    reviewsCount: product.reviews_count || undefined,
                    url: productUrl,
                }}
            />

            <SizeGuideModal isOpen={isSizeGuideOpen} onClose={() => setIsSizeGuideOpen(false)} />

            <div className="min-h-screen bg-gradient-to-b from-cream/50 to-background">
                <Navbar />

                <main className="pt-32 md:pt-36 pb-16">
                    {/* Breadcrumb */}
                    <div className="container mx-auto px-6 md:px-12 lg:px-20 mb-6">
                        <motion.nav
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-2 text-sm"
                        >
                            <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link>
                            <span className="text-muted-foreground">/</span>
                            <Link to="/products" className="text-muted-foreground hover:text-primary transition-colors">Products</Link>
                            <span className="text-muted-foreground">/</span>
                            <span className="text-foreground font-medium truncate max-w-[200px]">{product.name}</span>
                        </motion.nav>
                    </div>

                    <div className="container mx-auto px-6 md:px-12 lg:px-20">
                        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
                            {/* Product Image Section (Left Column) */}
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5 }}
                                className="space-y-4"
                            >
                                {/* Main Image Area */}
                                <div className="space-y-4">
                                    <div className="relative group">
                                        <div className="aspect-[4/3] md:aspect-square bg-white rounded-3xl overflow-hidden shadow-2xl border border-sage-100 relative">
                                            {/* Badge */}
                                            {product.badge && (
                                                <motion.span
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    className={cn(
                                                        'absolute top-4 left-4 px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full z-20 shadow-lg backdrop-blur-md',
                                                        product.badge === 'Bestseller' && 'bg-forest-900 text-white',
                                                        product.badge === 'Premium' && 'bg-gold-500 text-white',
                                                        product.badge === 'Luxury' && 'bg-purple-900 text-white',
                                                        'bg-primary text-white'
                                                    )}
                                                >
                                                    {product.badge}
                                                </motion.span>
                                            )}

                                            {/* Floating Actions */}
                                            <div className="absolute top-4 right-4 flex flex-col gap-3 z-20">
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={() => setIsWishlisted(!isWishlisted)}
                                                    className={cn(
                                                        "w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-lg backdrop-blur-sm border border-white/50",
                                                        isWishlisted ? "bg-red-500 text-white border-red-500" : "bg-white/90 text-gray-600 hover:bg-white"
                                                    )}
                                                >
                                                    <Heart className={cn("w-5 h-5", isWishlisted && "fill-current")} />
                                                </motion.button>
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={handleShare}
                                                    className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center transition-all shadow-lg backdrop-blur-sm border border-white/50 text-gray-600 hover:bg-white"
                                                >
                                                    <Share2 className="w-5 h-5" />
                                                </motion.button>
                                            </div>

                                            <motion.img
                                                key={selectedImage}
                                                initial={{ opacity: 0, scale: 1.05 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ duration: 0.4 }}
                                                src={selectedImage || product.image_url || '/placeholder.svg'}
                                                alt={product.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>

                                    {/* Thumbnails - Scrollable on mobile, grid on desktop */}
                                    {product.images && product.images.length > 1 && (
                                        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide px-1">
                                            {product.images.map((img, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => setSelectedImage(img)}
                                                    className={cn(
                                                        "relative w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden flex-shrink-0 transition-all duration-300",
                                                        selectedImage === img
                                                            ? "ring-2 ring-forest-900 ring-offset-2 opacity-100 scale-105"
                                                            : "opacity-70 hover:opacity-100 hover:scale-105"
                                                    )}
                                                >
                                                    <img src={img} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Product Highlights - Desktop */}
                                <div className="hidden md:grid grid-cols-3 gap-3">
                                    {highlights.map((highlight, index) => (
                                        <motion.div
                                            key={highlight.text}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.4 + index * 0.1 }}
                                            className="flex items-center gap-2 p-3 rounded-xl bg-white/80 backdrop-blur border border-border/50 shadow-sm"
                                        >
                                            <highlight.icon className="w-5 h-5 text-primary flex-shrink-0" />
                                            <span className="text-xs font-medium text-foreground">{highlight.text}</span>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Desktop Accordions (Moved from Right Column) */}
                                <div className="hidden lg:block space-y-4 pt-6">
                                    {/* Description Accordion */}
                                    <div className="border border-sage-100 rounded-2xl overflow-hidden bg-white/50">
                                        <button
                                            onClick={() => setOpenAccordion(openAccordion === 'description' ? '' : 'description')}
                                            className="w-full flex items-center justify-between p-4 text-left font-display font-bold text-forest-900 hover:bg-sage-50/50 transition-colors"
                                        >
                                            <span className="flex items-center gap-2"><Leaf className="w-4 h-4 text-gold-500" /> Description</span>
                                            {openAccordion === 'description' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                        </button>
                                        <AnimatePresence>
                                            {openAccordion === 'description' && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="p-4 pt-0 text-sm text-muted-foreground leading-relaxed">
                                                        {product.description || product.short_description}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    {/* Specifications Accordion */}
                                    {((product.features && product.features.length > 0) || true) && (
                                        <div className="border border-sage-100 rounded-2xl overflow-hidden bg-white/50">
                                            <button
                                                onClick={() => setOpenAccordion(openAccordion === 'specs' ? '' : 'specs')}
                                                className="w-full flex items-center justify-between p-4 text-left font-display font-bold text-forest-900 hover:bg-sage-50/50 transition-colors"
                                            >
                                                <span className="flex items-center gap-2"><Award className="w-4 h-4 text-gold-500" /> Specifications</span>
                                                {openAccordion === 'specs' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                            </button>
                                            <AnimatePresence>
                                                {openAccordion === 'specs' && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="p-4 pt-0 grid grid-cols-1 gap-2">
                                                            {((product.features && product.features.length > 0) ? product.features : [
                                                                '100% Organic Cotton',
                                                                'Hypoallergenic Material',
                                                                'Premium Quality Stitching',
                                                                'Durable & Long Lasting'
                                                            ]).map((feature, index) => (
                                                                <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                                                                    <div className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                                                                    {feature}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    )}

                                    {/* Care Instructions Accordion */}
                                    <div className="border border-sage-100 rounded-2xl overflow-hidden bg-white/50">
                                        <button
                                            onClick={() => setOpenAccordion(openAccordion === 'care' ? '' : 'care')}
                                            className="w-full flex items-center justify-between p-4 text-left font-display font-bold text-forest-900 hover:bg-sage-50/50 transition-colors"
                                        >
                                            <span className="flex items-center gap-2"><Shield className="w-4 h-4 text-gold-500" /> Care Instructions</span>
                                            {openAccordion === 'care' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                        </button>
                                        <AnimatePresence>
                                            {openAccordion === 'care' && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="p-4 pt-0 text-sm text-muted-foreground leading-relaxed">
                                                        <ul className="list-disc list-inside space-y-1">
                                                            <li>Do not wash the mattress/pillow core.</li>
                                                            <li>Spot clean with a damp cloth if necessary.</li>
                                                            <li>Sun dry regularly to maintain freshness and volume.</li>
                                                            <li>Use a protective cover to extend lifespan.</li>
                                                        </ul>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Product Info Section (Right Column) */}
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="space-y-6 lg:sticky lg:top-28 lg:self-start"
                            >
                                {/* Category & Name */}
                                <div>
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="px-3 py-1 bg-sage-100 text-sage-800 text-xs font-bold uppercase tracking-widest rounded-full">
                                            {product.category}
                                        </span>
                                        {product.in_stock ? (
                                            <span className="flex items-center gap-1 text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-100">
                                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                                In Stock
                                            </span>
                                        ) : (
                                            <span className="text-xs font-medium text-red-700 bg-red-50 px-2 py-1 rounded-full border border-red-100">
                                                Out of Stock
                                            </span>
                                        )}
                                    </div>

                                    <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-forest-900 mb-4 leading-tight">
                                        {product.name}
                                    </h1>

                                    {/* Rating */}
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="flex items-center gap-1 bg-gold-50 px-2 py-1 rounded-lg border border-gold-100">
                                            <Star className="w-4 h-4 text-gold-500 fill-gold-500" />
                                            <span className="font-bold text-forest-900">5.0</span>
                                        </div>
                                        <span className="text-muted-foreground text-sm border-b border-dashed border-muted-foreground/30">
                                            {product.name?.length % 2 === 0 ? '10k' : '5k'} Verified Reviews
                                        </span>
                                    </div>
                                </div>

                                {/* Price Card */}
                                <div className="p-6 rounded-3xl bg-white border border-sage-100 shadow-sm relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-gold-100/50 rounded-full blur-3xl -mr-10 -mt-10" />

                                    <div className="relative z-10">
                                        <p className="text-sm text-muted-foreground mb-1">Total Price (Inclusive of taxes)</p>
                                        <div className="flex items-baseline gap-3">
                                            <span className="text-4xl md:text-5xl font-bold text-forest-900 tracking-tight">
                                                ₹{currentPrice.toLocaleString()}
                                            </span>
                                            {currentOriginalPrice && (
                                                <div className="flex flex-col items-start">
                                                    <span className="text-lg text-muted-foreground line-through decoration-red-400 decoration-2">
                                                        ₹{Math.round(currentOriginalPrice).toLocaleString()}
                                                    </span>
                                                    <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
                                                        SAVE {Math.round(((currentOriginalPrice - currentPrice) / currentOriginalPrice) * 100)}%
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Size Selection */}
                                {product.sizes.length > 0 && (
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <h3 className="font-display font-bold text-lg text-forest-900">Select Size</h3>
                                            <button
                                                onClick={() => setIsSizeGuideOpen(true)}
                                                className="text-xs font-medium text-gold-600 hover:text-gold-700 underline underline-offset-4"
                                            >
                                                Size Guide
                                            </button>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            {product.sizes.map((size) => (
                                                <button
                                                    key={size.name}
                                                    onClick={() => setSelectedSize(size.name)}
                                                    className={cn(
                                                        'relative p-4 rounded-xl border-2 text-left transition-all duration-200 group flex justify-between items-center',
                                                        selectedSize === size.name
                                                            ? 'border-forest-900 bg-forest-50'
                                                            : 'border-sage-100 hover:border-forest-200 bg-white'
                                                    )}
                                                >
                                                    <div>
                                                        <span className={cn(
                                                            "font-bold text-base block mb-1",
                                                            selectedSize === size.name ? "text-forest-900" : "text-gray-700"
                                                        )}>{size.name}</span>

                                                        <div className="flex items-center gap-2">
                                                            <p className="text-sm text-muted-foreground">{size.dimensions}</p>
                                                            {selectedThickness && (
                                                                <span className="text-sm text-muted-foreground hidden sm:inline">
                                                                    × {selectedThickness}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="flex flex-col items-end gap-1">
                                                        {selectedSize === size.name ? (
                                                            <div className="w-6 h-6 rounded-full bg-forest-900 flex items-center justify-center shadow-sm">
                                                                <Check className="w-4 h-4 text-white" />
                                                            </div>
                                                        ) : (
                                                            <div className="w-6 h-6 rounded-full border border-sage-200" />
                                                        )}

                                                        {(() => {
                                                            const diff = (size.price !== undefined && size.price !== null && size.price !== "")
                                                                ? Number(size.price) - product.price
                                                                : (size.priceModifier || 0);

                                                            if (diff > 0) {
                                                                return (
                                                                    <span className="inline-block px-2 py-0.5 bg-white rounded-md text-xs font-bold text-gold-600 border border-gold-100 shadow-sm mt-1">
                                                                        +₹{diff.toLocaleString()}
                                                                    </span>
                                                                );
                                                            }
                                                            return null;
                                                        })()}
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Thickness Selection */}
                                {product.thickness && product.thickness.length > 0 && (
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <h3 className="font-display font-bold text-lg text-forest-900">Select Thickness</h3>
                                        </div>
                                        <div className="flex flex-wrap gap-3">
                                            {product.thickness.map((thickness) => (
                                                <button
                                                    key={thickness}
                                                    onClick={() => setSelectedThickness(thickness)}
                                                    className={cn(
                                                        'px-5 py-2.5 rounded-full border border-sage-200 font-medium text-sm transition-all',
                                                        selectedThickness === thickness
                                                            ? 'bg-forest-900 text-white border-forest-900 ring-2 ring-forest-200 ring-offset-2'
                                                            : 'bg-white text-gray-600 hover:border-forest-300 hover:bg-forest-50'
                                                    )}
                                                >
                                                    {thickness}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Quantity */}
                                {/* Quantity & Actions */}
                                <div className="flex flex-col gap-4 pt-6 border-t border-sage-100">
                                    <div className="flex gap-4">
                                        <div className="w-32">
                                            <div className="relative flex items-center w-full h-14 rounded-xl border-2 border-sage-100 bg-white overflow-hidden">
                                                <button
                                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                                    className="w-10 h-full flex items-center justify-center hover:bg-sage-50 text-forest-900 transition-colors"
                                                >
                                                    <Minus className="w-4 h-4" />
                                                </button>
                                                <div className="flex-1 flex items-center justify-center font-bold text-lg text-forest-900 border-x border-sage-100">
                                                    {quantity}
                                                </div>
                                                <button
                                                    onClick={() => setQuantity(quantity + 1)}
                                                    className="w-10 h-full flex items-center justify-center hover:bg-sage-50 text-forest-900 transition-colors"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                        <button
                                            onClick={handleAddToCart}
                                            disabled={!product.in_stock}
                                            className="flex-1 h-14 bg-forest-900 hover:bg-forest-800 text-white rounded-xl font-bold text-lg shadow-lg shadow-forest-900/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <ShoppingBag className="w-5 h-5" />
                                            {product.in_stock ? 'Add to Cart' : 'Out of Stock'}
                                        </button>
                                    </div>
                                    <button
                                        onClick={handleBuyNow}
                                        disabled={!product.in_stock}
                                        className="w-full h-14 bg-gold-500 hover:bg-gold-600 text-forest-900 rounded-xl font-bold text-lg shadow-lg shadow-gold-500/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Buy Now
                                    </button>
                                    <a
                                        href={`https://wa.me/919876543210?text=Hi, I'm interested in ${product.name}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full h-12 flex items-center justify-center gap-2 text-forest-700 font-semibold hover:text-forest-900 transition-colors"
                                    >
                                        <MessageCircle className="w-5 h-5" />
                                        Ask a Question on WhatsApp
                                    </a>
                                </div>

                                {/* Accordions (Mobile Only) */}
                                {/* Accordions */}
                                <div className="space-y-4 pt-8">
                                    {[
                                        { id: 'desc', label: 'Description', content: product.description },
                                        {
                                            id: 'features',
                                            label: 'Features',
                                            content: ((product.features && product.features.length > 0) ? product.features : [
                                                '100% Organic Cotton',
                                                'Hypoallergenic Material',
                                                'Premium Quality Stitching',
                                                'Durable & Long Lasting'
                                            ]).join(', ')
                                        },
                                        { id: 'care', label: 'Care Instructions', content: 'Do not wash. Sun dry periodically.' },
                                    ].map((item) => (
                                        <div key={item.id} className="border border-sage-100 rounded-2xl overflow-hidden bg-white">
                                            <button
                                                onClick={() => setActiveAccordion(activeAccordion === item.id ? null : item.id)}
                                                className="w-full flex items-center justify-between p-5 text-left font-bold text-forest-900 hover:bg-sage-50/50 transition-colors"
                                            >
                                                {item.label}
                                                <ChevronDown
                                                    className={cn(
                                                        "w-5 h-5 text-gray-400 transition-transform duration-300",
                                                        activeAccordion === item.id ? "rotate-180" : ""
                                                    )}
                                                />
                                            </button>
                                            <AnimatePresence>
                                                {activeAccordion === item.id && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.3 }}
                                                    >
                                                        <div className="p-5 pt-0 text-muted-foreground leading-relaxed border-t border-sage-50">
                                                            {item.content}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    ))}
                                </div>

                                {/* Trust Badges */}
                                {/* Trust Badges */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8">
                                    {[
                                        { icon: ShieldCheck, label: '10 Year Warranty' },
                                        { icon: Truck, label: 'Free Shipping' },
                                        { icon: RefreshCw, label: '7 Day Returns' },
                                        { icon: Award, label: 'Certified Organic' },
                                    ].map((badge, index) => (
                                        <div key={index} className="flex flex-col items-center text-center gap-2 p-3 rounded-xl bg-sage-50/50 border border-sage-100">
                                            <badge.icon className="w-6 h-6 text-forest-700" />
                                            <span className="text-xs font-semibold text-forest-900">{badge.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </main>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <section className="py-16 bg-white border-t border-sage-100">
                        <div className="container mx-auto px-6 md:px-12 lg:px-20">
                            <h2 className="text-3xl font-display font-bold text-forest-900 mb-8 text-center">You May Also Like</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                {relatedProducts.map((relatedProduct, index) => (
                                    <motion.div
                                        key={relatedProduct.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <ProductCard product={relatedProduct} />
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                <Footer />

                {/* Premium Mobile Sticky Bottom Bar */}
                <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-lg border-t border-white/20 md:hidden z-40 shadow-[0_-4px_20px_-1px_rgba(0,0,0,0.1)]">
                    <div className="flex gap-4 items-center">
                        <div className="flex-1">
                            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Total Price</p>
                            <p className="text-xl font-display font-bold text-forest-900">₹{currentPrice.toLocaleString()}</p>
                        </div>
                        <button
                            onClick={handleAddToCart}
                            disabled={!product.in_stock}
                            className="flex-[1.5] bg-forest-900 text-white font-bold text-base py-3.5 rounded-xl shadow-lg active:scale-95 transition-transform disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2"
                        >
                            <ShoppingBag className="w-5 h-5" />
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductDetail;
