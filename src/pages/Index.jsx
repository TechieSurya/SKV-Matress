import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/home/Hero';
import BrandStory from '@/components/home/BrandStory';
import Benefits from '@/components/home/Benefits';
import HowItsMade from '@/components/home/HowItsMade';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import CategoryShowcase from '@/components/home/CategoryShowcase';
import Awards from '@/components/home/Awards';
import Testimonials from '@/components/home/Testimonials';
import InstagramGallery from '@/components/home/InstagramGallery';
import Newsletter from '@/components/home/Newsletter';
import CTA from '@/components/home/CTA';

const Index = () => {
    return (
        <>
            <Helmet>
                <title>SKV Natural Beds - Natural Cotton Mattress & Pillows | India</title>
                <meta
                    name="description"
                    content="Shop premium SKV Natural Beds natural cotton mattresses and pillows. Handcrafted, eco-friendly, chemical-free bedding for perfect spine alignment and restful sleep. Free shipping across India."
                />
                <meta
                    name="keywords"
                    content="SKV Natural Beds, natural cotton mattress, organic mattress India, handcrafted mattress, eco-friendly bedding, cotton pillows"
                />
            </Helmet>

            <div className="min-h-screen">
                <Navbar />
                <main>
                    <Hero />
                    <BrandStory />
                    <Benefits />
                    <HowItsMade />
                    <FeaturedProducts />
                    <CategoryShowcase />
                    <Awards />
                    <Testimonials />
                    <InstagramGallery />
                    <CTA />
                    <Newsletter />
                </main>
                <Footer />
            </div>
        </>
    );
};

export default Index;
