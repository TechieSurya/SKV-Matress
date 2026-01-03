import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Search, Users, Mail, Phone, MapPin } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { toast } from '@/hooks/use-toast';

const Customers = () => {
    const [customers, setCustomers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            const q = query(collection(db, 'customers'), orderBy('created_at', 'desc'));
            const querySnapshot = await getDocs(q);
            const customersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setCustomers(customersData);
        } catch (error) {
            console.error('Error fetching customers:', error);
            toast({ title: 'Error', description: 'Failed to load customers', variant: 'destructive' });
        } finally {
            setIsLoading(false);
        }
    };

    const filteredCustomers = customers.filter(
        (c) =>
            c.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.phone?.includes(searchQuery)
    );

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <>
            <Helmet>
                <title>Customers | Admin - Ilavam Panju</title>
            </Helmet>

            <div className="space-y-6">
                <div>
                    <h1 className="font-display text-3xl font-bold text-foreground">Customers</h1>
                    <p className="text-muted-foreground mt-1">View and manage your customers</p>
                </div>

                {/* Search */}
                <div className="relative max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                        placeholder="Search by name, email or phone..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary border-input"
                    />
                </div>

                {/* Customers Grid */}
                {filteredCustomers.length > 0 ? (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredCustomers.map((customer, index) => (
                            <motion.div
                                key={customer.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="bg-cotton-white rounded-2xl p-6 shadow-card"
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                                        <span className="text-primary-foreground font-bold text-lg">
                                            {customer.name?.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-foreground">{customer.name}</p>
                                        <p className="text-xs text-muted-foreground">
                                            Joined {customer.created_at?.toDate ? customer.created_at.toDate().toLocaleDateString() : new Date(customer.created_at).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Mail className="w-4 h-4" />
                                        {customer.email}
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Phone className="w-4 h-4" />
                                        {customer.phone}
                                    </div>
                                    {(customer.city || customer.state) && (
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <MapPin className="w-4 h-4" />
                                            {[customer.city, customer.state].filter(Boolean).join(', ')}
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-cotton-white rounded-2xl p-12 shadow-card text-center"
                    >
                        <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">No customers yet</p>
                    </motion.div>
                )}
            </div>
        </>
    );
};

export default Customers;
