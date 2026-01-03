import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(undefined);

export const CartProvider = ({ children }) => {
    const [items, setItems] = useState(() => {
        const saved = localStorage.getItem('cart');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(items));
    }, [items]);

    const calculateItemPrice = (product, size) => {
        const sizeData = product.sizes.find((s) => s.name === size);
        return product.price + (sizeData?.priceModifier || 0);
    };

    const addToCart = (product, size, thickness, quantity = 1) => {
        setItems((prev) => {
            const existingIndex = prev.findIndex(
                (item) => item.product.id === product.id && item.selectedSize === size
            );

            if (existingIndex >= 0) {
                const updated = [...prev];
                updated[existingIndex].quantity += quantity;
                updated[existingIndex].totalPrice =
                    calculateItemPrice(product, size) * updated[existingIndex].quantity;
                return updated;
            }

            return [
                ...prev,
                {
                    product,
                    quantity,
                    selectedSize: size,
                    selectedThickness: thickness,
                    totalPrice: calculateItemPrice(product, size) * quantity,
                },
            ];
        });
    };

    const removeFromCart = (productId, size) => {
        setItems((prev) =>
            prev.filter((item) => !(item.product.id === productId && item.selectedSize === size))
        );
    };

    const updateQuantity = (productId, size, quantity) => {
        if (quantity <= 0) {
            removeFromCart(productId, size);
            return;
        }

        setItems((prev) =>
            prev.map((item) => {
                if (item.product.id === productId && item.selectedSize === size) {
                    return {
                        ...item,
                        quantity,
                        totalPrice: calculateItemPrice(item.product, size) * quantity,
                    };
                }
                return item;
            })
        );
    };

    const clearCart = () => setItems([]);

    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce((sum, item) => sum + item.totalPrice, 0);

    return (
        <CartContext.Provider
            value={{
                items,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                totalItems,
                totalPrice,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
