import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Leaf, Lock, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { z } from 'zod';
import { auth } from '@/lib/firebase';
import { confirmPasswordReset } from 'firebase/auth';
import { toast } from '@/hooks/use-toast';

const passwordSchema = z.object({
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
});

const AdminResetPassword = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [resetComplete, setResetComplete] = useState(false);
    const [oobCode, setOobCode] = useState(null);

    useEffect(() => {
        const code = searchParams.get('oobCode');
        if (code) {
            setOobCode(code);
        } else {
            toast({ title: 'Error', description: 'Invalid password reset link', variant: 'destructive' });
            navigate('/admin/login');
        }
    }, [searchParams, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        const result = passwordSchema.safeParse({ password, confirmPassword });
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

        if (!oobCode) {
            toast({ title: 'Error', description: 'Missing reset code', variant: 'destructive' });
            return;
        }

        setIsSubmitting(true);

        try {
            await confirmPasswordReset(auth, oobCode, password);
            setResetComplete(true);
            toast({ title: 'Success', description: 'Password updated successfully!' });

            // Redirect to login after 3 seconds
            setTimeout(() => {
                navigate('/admin/login');
            }, 3000);
        } catch (error) {
            toast({ title: 'Error', description: error.message, variant: 'destructive' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Helmet>
                <title>Reset Password | Ilavam Panju Admin</title>
            </Helmet>

            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md"
                >
                    <div className="bg-cotton-white rounded-3xl p-8 shadow-elevated">
                        {/* Logo */}
                        <div className="flex items-center justify-center gap-2 mb-8">
                            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                                <Leaf className="w-6 h-6 text-primary-foreground" />
                            </div>
                            <div>
                                <p className="font-display text-xl font-semibold text-foreground">Ilavam Panju</p>
                                <p className="text-xs text-muted-foreground">Admin Panel</p>
                            </div>
                        </div>

                        {resetComplete ? (
                            <div className="text-center">
                                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                                    <CheckCircle className="w-8 h-8 text-primary" />
                                </div>
                                <h1 className="font-display text-2xl font-bold text-foreground mb-2">
                                    Password Updated!
                                </h1>
                                <p className="text-muted-foreground">
                                    Redirecting you to login...
                                </p>
                            </div>
                        ) : (
                            <>
                                <h1 className="font-display text-2xl font-bold text-foreground text-center mb-2">
                                    Reset Password
                                </h1>
                                <p className="text-muted-foreground text-center mb-8">
                                    Enter your new password below
                                </p>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">
                                            New Password
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

                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">
                                            Confirm New Password
                                        </label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                            <input
                                                type={showConfirmPassword ? 'text' : 'password'}
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                placeholder="••••••••"
                                                className={`w-full px-3 py-2 pl-10 pr-10 border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary ${errors.confirmPassword ? 'border-destructive' : 'border-input'}`}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                            >
                                                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                            </button>
                                        </div>
                                        {errors.confirmPassword && <p className="text-sm text-destructive mt-1">{errors.confirmPassword}</p>}
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 font-medium"
                                    >
                                        {isSubmitting ? 'Updating...' : 'Update Password'}
                                    </button>
                                </form>
                            </>
                        )}
                    </div>
                </motion.div>
            </div>
        </>
    );
};

export default AdminResetPassword;
