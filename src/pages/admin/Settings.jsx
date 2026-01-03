import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { User, Bell, Shield, Store } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const Settings = () => {
    const { user } = useAuth();

    const settingsSections = [
        {
            icon: User,
            title: 'Profile Settings',
            description: 'Manage your account information',
        },
        {
            icon: Store,
            title: 'Store Settings',
            description: 'Configure store name, currency, and shipping',
        },
        {
            icon: Bell,
            title: 'Notifications',
            description: 'Manage email and push notifications',
        },
        {
            icon: Shield,
            title: 'Security',
            description: 'Password and two-factor authentication',
        },
    ];

    return (
        <>
            <Helmet>
                <title>Settings | Admin - Ilavam Panju</title>
            </Helmet>

            <div className="space-y-6">
                <div>
                    <h1 className="font-display text-3xl font-bold text-foreground">Settings</h1>
                    <p className="text-muted-foreground mt-1">Manage your admin preferences</p>
                </div>

                {/* Current User Info */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-cotton-white rounded-2xl p-6 shadow-card"
                >
                    <h2 className="font-display text-lg font-semibold text-foreground mb-4">
                        Current Admin
                    </h2>
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
                            <span className="text-primary-foreground font-bold text-2xl">
                                {user?.email?.charAt(0).toUpperCase()}
                            </span>
                        </div>
                        <div>
                            <p className="font-semibold text-foreground">{user?.email}</p>
                            <p className="text-sm text-muted-foreground">Administrator</p>
                        </div>
                    </div>
                </motion.div>

                {/* Settings Sections */}
                <div className="grid sm:grid-cols-2 gap-6">
                    {settingsSections.map((section, index) => (
                        <motion.div
                            key={section.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-cotton-white rounded-2xl p-6 shadow-card hover:shadow-elevated transition-shadow cursor-pointer"
                        >
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                    <section.icon className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-foreground">{section.title}</h3>
                                    <p className="text-sm text-muted-foreground mt-1">{section.description}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-muted rounded-2xl p-6"
                >
                    <p className="text-sm text-muted-foreground">
                        Additional settings features are coming soon. Stay tuned for updates!
                    </p>
                </motion.div>
            </div>
        </>
    );
};

export default Settings;
