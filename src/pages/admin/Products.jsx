import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Plus, Pencil, Trash2, Search, Package } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, getDocs, deleteDoc, doc, orderBy, query } from 'firebase/firestore';
import { toast } from '@/hooks/use-toast';
import ProductModal from '@/components/admin/ProductModal';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const q = query(collection(db, 'products'), orderBy('created_at', 'desc'));
            const querySnapshot = await getDocs(q);
            const productsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setProducts(productsData);
        } catch (error) {
            console.error('Error fetching products:', error);
            toast({ title: 'Error', description: 'Failed to load products', variant: 'destructive' });
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this product?')) return;

        try {
            await deleteDoc(doc(db, 'products', id));
            toast({ title: 'Success', description: 'Product deleted' });
            fetchProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
            toast({ title: 'Error', description: 'Failed to delete product', variant: 'destructive' });
        }
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setModalOpen(true);
    };

    const handleAdd = () => {
        setEditingProduct(null);
        setModalOpen(true);
    };

    const filteredProducts = products.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.sku && p.sku.toLowerCase().includes(searchQuery.toLowerCase()))
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
                <title>Products | Admin - Ilavam Panju</title>
            </Helmet>

            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="font-display text-3xl font-bold text-foreground">Products</h1>
                        <p className="text-muted-foreground mt-1">Manage your product catalog</p>
                    </div>
                    <button
                        onClick={handleAdd}
                        className="inline-flex items-center justify-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-medium"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Product
                    </button>
                </div>

                {/* Search */}
                <div className="relative max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                        placeholder="Search by name or SKU..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary border-input"
                    />
                </div>

                {/* Products Table */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-cotton-white rounded-2xl shadow-card overflow-hidden"
                >
                    {filteredProducts.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-muted">
                                    <tr>
                                        <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Product</th>
                                        <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">SKU</th>
                                        <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Category</th>
                                        <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Price</th>
                                        <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Status</th>
                                        <th className="text-right py-4 px-6 text-sm font-medium text-muted-foreground">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredProducts.map((product) => (
                                        <tr key={product.id} className="border-b border-border last:border-0">
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
                                                        {product.image_url ? (
                                                            <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                                                        ) : (
                                                            <Package className="w-6 h-6 text-muted-foreground" />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-foreground">{product.name}</p>
                                                        {product.badge && (
                                                            <span className="text-xs text-primary">{product.badge}</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 text-muted-foreground font-mono text-sm">
                                                {product.sku || '-'}
                                            </td>
                                            <td className="py-4 px-6 capitalize text-muted-foreground">{product.category}</td>
                                            <td className="py-4 px-6">
                                                <p className="font-medium text-foreground">₹{product.price.toLocaleString()}</p>
                                                {product.original_price && (
                                                    <p className="text-xs text-muted-foreground line-through">
                                                        ₹{product.original_price.toLocaleString()}
                                                    </p>
                                                )}
                                            </td>
                                            <td className="py-4 px-6">
                                                <span
                                                    className={`px-2 py-1 rounded-full text-xs font-medium ${product.in_stock
                                                            ? 'bg-green-100 text-green-800'
                                                            : 'bg-red-100 text-red-800'
                                                        }`}
                                                >
                                                    {product.in_stock ? 'In Stock' : 'Out of Stock'}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => handleEdit(product)}
                                                        className="p-2 hover:bg-muted rounded-md transition-colors"
                                                    >
                                                        <Pencil className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(product.id)}
                                                        className="p-2 hover:bg-muted rounded-md transition-colors text-destructive"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                            <p className="text-muted-foreground">No products found</p>
                            <button onClick={handleAdd} className="mt-4 inline-flex items-center justify-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-medium">
                                <Plus className="w-4 h-4 mr-2" />
                                Add Your First Product
                            </button>
                        </div>
                    )}
                </motion.div>
            </div>

            <ProductModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                product={editingProduct}
                onSave={fetchProducts}
            />
        </>
    );
};

export default Products;
