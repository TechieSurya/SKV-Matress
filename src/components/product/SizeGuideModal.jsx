import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Ruler, Layers, ArrowRight, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

// Import images directly for production build compatibility
import sizeKing from '@/assets/size-king.jpg';
import sizeQueen from '@/assets/size-queen.jpg';
import sizeDouble from '@/assets/size-double.jpg';
import sizeSingle from '@/assets/size-single.jpg';
import sizeThickness from '@/assets/size-thickness.jpg';

const content = {
    dimensions: [
        {
            title: 'King Size',
            subtitle: 'For the ultimate luxury and space',
            dimensions: '78" x 72" (6.5ft x 6ft)',
            image: sizeKing,
            recommended: 'Master Bedrooms (12ft x 12ft+)',
            color: 'bg-indigo-50 text-indigo-900',
            badge: 'Most Popular for Couples'
        },
        {
            title: 'Queen Size',
            subtitle: 'Perfect balance of comfort and fit',
            dimensions: '75" x 60" (6.25ft x 5ft)',
            image: sizeQueen,
            recommended: 'Standard Bedrooms (10ft x 10ft+)',
            color: 'bg-rose-50 text-rose-900',
            badge: 'Best Seller'
        },
        {
            title: 'Double Cot',
            subtitle: 'Cozy comfort for compact spaces',
            dimensions: '75" x 48" (6.25ft x 4ft)',
            image: sizeDouble,
            recommended: 'Guest Rooms / Smaller Masters',
            color: 'bg-amber-50 text-amber-900',
            badge: 'Great for Singles/Couples'
        },
        {
            title: 'Single Cot',
            subtitle: 'Ideal for kids or solo sleepers',
            dimensions: '75" x 36" (6.25ft x 3ft)',
            image: sizeSingle,
            recommended: 'Kids Rooms / Guest Beds',
            color: 'bg-emerald-50 text-emerald-900',
            badge: 'Solo Comfort'
        }
    ],
    thickness: {
        title: 'Choose Your Comfort Level',
        description: 'Our natural cotton mattresses come in varying thicknesses to suit your support preference.',
        image: sizeThickness,
        options: [
            { inch: '5"', feel: 'Firm & Traditional', bestFor: 'Back sleepers, firm support lovers' },
            { inch: '6"', feel: 'Balanced Support', bestFor: 'Standard comfort, most popular choice' },
            { inch: '7"', feel: 'Plush Comfort', bestFor: 'Side sleepers, extra cushioning' },
            { inch: '8"', feel: 'Ultra Luxury', bestFor: 'Hotel-like feel, maximum pressure relief' }
        ]
    }
};

const SizeGuideModal = ({ isOpen, onClose }) => {
    const [activeTab, setActiveTab] = useState('dimensions');
    const [activeSizeIndex, setActiveSizeIndex] = useState(1); // Default to Queen

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                />

                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-white sticky top-0 z-10">
                        <div>
                            <h2 className="text-2xl font-serif font-bold text-forest-900">Size & Fit Guide</h2>
                            <p className="text-sm text-gray-500">Find the perfect mattress for your space</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="w-10 h-10 rounded-full bg-gray-50 hover:bg-gray-100 flex items-center justify-center transition-colors"
                        >
                            <X className="w-5 h-5 text-gray-500" />
                        </button>
                    </div>

                    {/* Tabs */}
                    <div className="flex p-2 bg-gray-50 mx-6 mt-6 rounded-xl shrink-0">
                        <button
                            onClick={() => setActiveTab('dimensions')}
                            className={cn(
                                "flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold transition-all",
                                activeTab === 'dimensions'
                                    ? "bg-white text-forest-900 shadow-sm"
                                    : "text-gray-500 hover:text-gray-700"
                            )}
                        >
                            <Ruler className="w-4 h-4" />
                            Dimensions Guide
                        </button>
                        <button
                            onClick={() => setActiveTab('thickness')}
                            className={cn(
                                "flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold transition-all",
                                activeTab === 'thickness'
                                    ? "bg-white text-forest-900 shadow-sm"
                                    : "text-gray-500 hover:text-gray-700"
                            )}
                        >
                            <Layers className="w-4 h-4" />
                            Thickness Guide
                        </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-6">
                        {activeTab === 'dimensions' ? (
                            <div className="grid lg:grid-cols-12 gap-8">
                                {/* Size List */}
                                <div className="lg:col-span-4 space-y-3">
                                    {content.dimensions.map((size, index) => (
                                        <button
                                            key={size.title}
                                            onClick={() => setActiveSizeIndex(index)}
                                            className={cn(
                                                "w-full text-left p-4 rounded-xl border-2 transition-all duration-200 group relative overflow-hidden",
                                                activeSizeIndex === index
                                                    ? "border-forest-900 bg-forest-50"
                                                    : "border-gray-100 hover:border-forest-200 bg-white"
                                            )}
                                        >
                                            <div className="relative z-10">
                                                <div className="flex justify-between items-start mb-1">
                                                    <span className={cn(
                                                        "font-bold text-lg",
                                                        activeSizeIndex === index ? "text-forest-900" : "text-gray-700"
                                                    )}>{size.title}</span>
                                                    {activeSizeIndex === index && (
                                                        <Check className="w-5 h-5 text-forest-900" />
                                                    )}
                                                </div>
                                                <p className="text-sm text-gray-500 mb-2">{size.dimensions}</p>
                                                <span className={cn(
                                                    "inline-block px-2 py-1 rounded text-xs font-semibold",
                                                    size.color
                                                )}>
                                                    {size.badge}
                                                </span>
                                            </div>
                                        </button>
                                    ))}
                                </div>

                                {/* Preview Area */}
                                <div className="lg:col-span-8">
                                    <div className="bg-gray-50 rounded-2xl p-6 h-full border border-gray-100 flex flex-col">
                                        <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg mb-6 bg-white">
                                            <img
                                                src={content.dimensions[activeSizeIndex].image}
                                                alt={content.dimensions[activeSizeIndex].title}
                                                className="w-full h-full object-contain"
                                            />
                                        </div>
                                        <div className="mt-auto">
                                            <h3 className="text-xl font-bold text-forest-900 mb-2">
                                                {content.dimensions[activeSizeIndex].title} Specification
                                            </h3>
                                            <div className="grid sm:grid-cols-2 gap-4">
                                                <div className="bg-white p-4 rounded-xl border border-gray-100">
                                                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Best For</p>
                                                    <p className="font-medium text-gray-800">{content.dimensions[activeSizeIndex].subtitle}</p>
                                                </div>
                                                <div className="bg-white p-4 rounded-xl border border-gray-100">
                                                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Room Size</p>
                                                    <p className="font-medium text-gray-800">{content.dimensions[activeSizeIndex].recommended}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="grid lg:grid-cols-2 gap-8 items-center h-full">
                                <div className="order-2 lg:order-1">
                                    <h3 className="text-2xl font-serif font-bold text-forest-900 mb-4">
                                        {content.thickness.title}
                                    </h3>
                                    <p className="text-gray-600 mb-8 leading-relaxed">
                                        {content.thickness.description}
                                    </p>

                                    <div className="space-y-4">
                                        {content.thickness.options.map((option) => (
                                            <div key={option.inch} className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
                                                <div className="w-16 h-16 rounded-full bg-forest-900 text-white flex items-center justify-center font-bold text-xl shrink-0">
                                                    {option.inch}
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-forest-900">{option.feel}</h4>
                                                    <p className="text-sm text-gray-500">{option.bestFor}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="order-1 lg:order-2 h-full">
                                    <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-100 bg-white relative group">
                                        <img
                                            src={content.thickness.image}
                                            alt="Thickness Comparison"
                                            className="w-full h-auto object-contain"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                                            <p className="text-white font-medium">Visual comparison of 5", 6", 7", and 8" thickness options</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default SizeGuideModal;
