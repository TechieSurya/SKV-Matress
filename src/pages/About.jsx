import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Leaf, Award, Users, Heart, TreePine, Hand } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Team from '@/components/about/Team';
import Sustainability from '@/components/about/Sustainability';
import Press from '@/components/about/Press';

const About = () => {
    const milestones = [
        { year: '1985', title: 'The Beginning', description: 'Started as a small family business in Coimbatore' },
        { year: '1995', title: 'Growing Roots', description: 'Expanded to serve customers across Tamil Nadu' },
        { year: '2010', title: 'National Reach', description: 'Began shipping to all major cities in India' },
        { year: '2024', title: 'Digital Era', description: 'Bringing traditional comfort to your doorstep online' },
    ];

    const values = [
        {
            icon: Leaf,
            title: '100% Natural',
            description: 'We use only pure Ilavam Panju cotton sourced directly from trusted farmers.',
        },
        {
            icon: Hand,
            title: 'Handcrafted',
            description: 'Each mattress is made by skilled artisans using traditional techniques.',
        },
        {
            icon: TreePine,
            title: 'Sustainable',
            description: 'Our eco-friendly practices protect the environment for future generations.',
        },
        {
            icon: Heart,
            title: 'Made with Love',
            description: 'Every product carries our commitment to your comfort and well-being.',
        },
    ];

    return (
        <>
            <Helmet>
                <title>About Us | SKV Natural Beds - Our Story</title>
                <meta
                    name="description"
                    content="Learn about SKV Natural Beds' 35+ years of heritage in crafting natural cotton mattresses. Discover our commitment to traditional craftsmanship and eco-friendly practices."
                />
            </Helmet>

            <div className="min-h-screen bg-background">
                <Navbar />

                <main className="pt-32 md:pt-36">
                    {/* Hero Section */}
                    <section className="relative py-24 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-cream-50 via-sage-50/50 to-background" />
                        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-200/30 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-96 h-96 bg-sage-200/30 rounded-full blur-3xl" />

                        <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="max-w-4xl mx-auto text-center"
                            >
                                <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-gold-100 rounded-full mb-8">
                                    <Leaf className="w-4 h-4 text-gold-600" />
                                    <span className="text-sm font-medium text-gold-700">
                                        Since 1985
                                    </span>
                                </span>
                                <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-forest-900 mb-6 leading-tight">
                                    The Art of
                                    <span className="block text-gold-600">Natural Comfort</span>
                                </h1>
                                <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                                    For over 35 years, we've been preserving the ancient tradition of Ilavam Panju
                                    mattress making. Our journey began in the cotton fields of Tamil Nadu, where we
                                    learned that true comfort comes from nature itself.
                                </p>
                            </motion.div>
                        </div>
                    </section>

                    {/* Story Section */}
                    <section className="py-24 bg-cotton-white">
                        <div className="container mx-auto px-6 md:px-12 lg:px-20">
                            <div className="grid lg:grid-cols-2 gap-16 items-center">
                                <motion.div
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <span className="inline-block px-4 py-2 bg-sage-100 text-sage-700 rounded-full text-sm font-medium mb-6">
                                        Our Story
                                    </span>
                                    <h2 className="font-serif text-4xl md:text-5xl font-bold text-forest-900 mb-8">
                                        A Legacy of Craftsmanship
                                    </h2>
                                    <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                                        <p>
                                            Ilavam Panju, or natural silk cotton, has been treasured in South India for
                                            centuries. Our ancestors understood what modern science confirms today – natural
                                            cotton provides the perfect balance of support and softness for restful sleep.
                                        </p>
                                        <p>
                                            Our founder, Shri Venkatesh, learned the craft from his father, who learned from
                                            his father before him. This knowledge, passed down through generations, forms the
                                            foundation of every mattress we create.
                                        </p>
                                        <p>
                                            Today, we combine this traditional wisdom with modern quality standards to
                                            deliver products that honor our heritage while meeting contemporary needs.
                                        </p>
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, x: 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                    className="relative"
                                >
                                    <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                                        <img
                                            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"
                                            alt="Traditional cotton crafting"
                                            className="w-full h-[500px] object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-forest-900/60 to-transparent" />
                                        <div className="absolute bottom-8 left-8 right-8">
                                            <div className="bg-cotton-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-16 h-16 rounded-2xl bg-gold-100 flex items-center justify-center">
                                                        <Award className="w-8 h-8 text-gold-600" />
                                                    </div>
                                                    <div>
                                                        <p className="font-serif text-3xl font-bold text-forest-900">35+ Years</p>
                                                        <p className="text-muted-foreground">of Excellence</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </section>

                    {/* Values Section */}
                    <section className="py-24 bg-background">
                        <div className="container mx-auto px-6 md:px-12 lg:px-20">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="text-center mb-16"
                            >
                                <span className="inline-block px-4 py-2 bg-gold-100 text-gold-700 rounded-full text-sm font-medium mb-4">
                                    What We Stand For
                                </span>
                                <h2 className="font-serif text-4xl md:text-5xl font-bold text-forest-900 mb-4">
                                    Our Core Values
                                </h2>
                                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                                    These principles guide everything we do
                                </p>
                            </motion.div>

                            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                                {values.map((value, index) => (
                                    <motion.div
                                        key={value.title}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1, duration: 0.5 }}
                                        className="group bg-cotton-white rounded-3xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 border border-sage-100 hover:border-gold-200"
                                    >
                                        <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-sage-100 to-sage-200 flex items-center justify-center mb-6 group-hover:from-gold-100 group-hover:to-gold-200 transition-colors duration-300">
                                            <value.icon className="w-8 h-8 text-forest-700 group-hover:text-gold-700 transition-colors" />
                                        </div>
                                        <h3 className="font-serif text-xl font-semibold text-forest-900 mb-3">
                                            {value.title}
                                        </h3>
                                        <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Team Section */}
                    <Team />

                    {/* Timeline Section */}
                    <section className="py-24 bg-background">
                        <div className="container mx-auto px-6 md:px-12 lg:px-20">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="text-center mb-16"
                            >
                                <span className="inline-block px-4 py-2 bg-sage-100 text-sage-700 rounded-full text-sm font-medium mb-4">
                                    Milestones
                                </span>
                                <h2 className="font-serif text-4xl md:text-5xl font-bold text-forest-900 mb-4">
                                    Our Journey
                                </h2>
                            </motion.div>

                            <div className="max-w-4xl mx-auto">
                                <div className="relative">
                                    {/* Timeline Line */}
                                    <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gold-400 via-sage-400 to-forest-400" />

                                    {milestones.map((milestone, index) => (
                                        <motion.div
                                            key={milestone.year}
                                            initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.15 }}
                                            className={`relative flex items-center mb-12 last:mb-0 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                                                }`}
                                        >
                                            {/* Year Badge */}
                                            <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gold-500 rounded-full flex items-center justify-center z-10 shadow-lg">
                                                <span className="font-bold text-forest-900 text-sm">{milestone.year}</span>
                                            </div>

                                            {/* Content Card */}
                                            <div className={`ml-24 md:ml-0 md:w-5/12 ${index % 2 === 0 ? 'md:pr-16' : 'md:pl-16'}`}>
                                                <div className="bg-cotton-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-sage-100">
                                                    <h3 className="font-semibold text-xl text-forest-900 mb-2">{milestone.title}</h3>
                                                    <p className="text-muted-foreground">{milestone.description}</p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Sustainability Section */}
                    <Sustainability />

                    {/* Press Section */}
                    <Press />

                    {/* Stats Section */}
                    <section className="py-24 bg-gradient-to-br from-forest-800 to-forest-900">
                        <div className="container mx-auto px-6 md:px-12 lg:px-20">
                            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                                {[
                                    { number: '10,000+', label: 'Happy Customers' },
                                    { number: '35+', label: 'Years Experience' },
                                    { number: '50+', label: 'Artisan Partners' },
                                    { number: '100%', label: 'Natural Materials' },
                                ].map((stat, index) => (
                                    <motion.div
                                        key={stat.label}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className="text-center"
                                    >
                                        <p className="font-serif text-5xl md:text-6xl font-bold text-gold-400 mb-3">
                                            {stat.number}
                                        </p>
                                        <p className="text-sage-200 text-lg">{stat.label}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </section>
                </main>

                <Footer />
            </div>
        </>
    );
};

export default About;
