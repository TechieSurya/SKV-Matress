import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/hooks/useAuth";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "./pages/Index";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Contact from "./pages/Contact"; 
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";

import AdminForgotPassword from "./pages/AdminForgotPassword";
import AdminResetPassword from "./pages/AdminResetPassword";
import AdminLayout from "./components/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import AdminProducts from "./pages/admin/Products";
import Orders from "./pages/admin/Orders";

const queryClient = new QueryClient();

const App = () => (
    <HelmetProvider>
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <CartProvider>
                    <BrowserRouter>
                        <ScrollToTop />
                        <Routes>
                            {/* Public Routes */}
                            <Route path="/" element={<Index />} />
                            <Route path="/products" element={<Products />} />
                            <Route path="/products/:slug" element={<ProductDetail />} />
                            <Route path="/cart" element={<Cart />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/contact" element={<Contact />} />

                            {/* Admin Routes */}
                            <Route path="/admin/login" element={<AdminLogin />} />

                            <Route path="/admin/forgot-password" element={<AdminForgotPassword />} />
                            <Route path="/admin/reset-password" element={<AdminResetPassword />} />
                            <Route path="/admin" element={<AdminLayout />}>
                                <Route index element={<Dashboard />} />
                                <Route path="products" element={<AdminProducts />} />
                                <Route path="orders" element={<Orders />} />
                            </Route>

                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </BrowserRouter>
                </CartProvider>
            </AuthProvider>
        </QueryClientProvider>
    </HelmetProvider>
);

export default App;
