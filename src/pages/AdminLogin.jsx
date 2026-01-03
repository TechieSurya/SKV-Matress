import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Leaf, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { z } from 'zod';
import logo from '@/assets/logo.png';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';

const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

const AdminLogin = () => {
    const { signIn, user, isAdmin, isLoading } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (!isLoading && user && isAdmin) {
            navigate('/admin');
        }
    }, [user, isAdmin, isLoading, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        const result = loginSchema.safeParse({ email, password });
        if (!result.success) {
            const fieldErrors = {};
            result.error.errors.forEach((err) => {
                if (err.path[0]) {
                    fieldErrors[err.path[0]] = err.message;
                }
            });
            setErrors(fieldErrors);
            return;
        }

        setIsSubmitting(true);
        const { error } = await signIn(email, password);
        setIsSubmitting(false);

        if (error) {
            toast({ title: 'Login failed', description: error.message, variant: 'destructive' });
            return;
        }

        toast({ title: 'Success', description: 'Login successful' });
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <>
            <Helmet>
                <title>Admin Login | SKV Natural Beds</title>
            </Helmet>

            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md"
                >
                    <div className="bg-cotton-white rounded-3xl p-8 shadow-elevated">
                        {/* Logo */}
                        <div className="flex items-center justify-center gap-3 mb-8">
                            <img src={logo} alt="SKV Natural Beds" className="w-24 h-24 object-contain" />
                            <div>
                                <p className="font-display text-xl font-semibold text-foreground">SKV Natural Beds</p>
                                <p className="text-xs text-muted-foreground">Admin Panel</p>
                            </div>
                        </div>

                        <h1 className="font-display text-2xl font-bold text-foreground text-center mb-2">
                            Welcome Back
                        </h1>
                        <p className="text-muted-foreground text-center mb-8">
                            Sign in to access the admin dashboard
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="admin@example.com"
                                        className={`w-full px-3 py-2 pl-10 border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary ${errors.email ? 'border-destructive' : 'border-input'}`}
                                    />
                                </div>
                                {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className={`w-full px-3 py-2 pl-10 pr-10 border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary ${errors.password ? 'border-destructive' : 'border-input'}`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                                {errors.password && <p className="text-sm text-destructive mt-1">{errors.password}</p>}
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 font-medium"
                            >
                                {isSubmitting ? 'Signing in...' : 'Sign In'}
                            </button>
                        </form>



                        <p className="text-center text-sm text-muted-foreground mt-4">
                            <a href="/" className="text-primary hover:underline">
                                ← Back to Store
                            </a>
                        </p>
                    </div>
                </motion.div>
            </div>
        </>
    );
};

export default AdminLogin;
