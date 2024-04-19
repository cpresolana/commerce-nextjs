"use client"
import React, { createContext, useContext, useState, useEffect } from 'react';
const CartContext = createContext();

export function useCart() {
    return useContext(CartContext);
}

export function CartProvider({ children }) {

    const [cartCount, setCartCount] = useState(null)
    const [cart, setCart] = useState([]);
    const [cartTotal, setCartTotal] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (localStorage?.getItem('cartCount')) {
            let cartCountData = localStorage?.getItem('cartCount');
            setCartCount(JSON.parse(cartCountData))
        }
        if (localStorage?.getItem('cart')) {
            let cartData = localStorage?.getItem('cart');
            setCart(JSON.parse(cartData))
        }
        if (localStorage?.getItem('cartTotal')) {
            let cartTotalData = localStorage?.getItem('cartTotal');
            setCartTotal(JSON.parse(cartTotalData))
        }
    }, []);

    useEffect(() => {
        if (typeof cartCount === "number") {
            localStorage.setItem("cartCount", JSON.stringify(cartCount));
        }
    }, [cartCount]);

    useEffect(() => {
        if (typeof cartTotal === "number") {
            localStorage.setItem("cartTotal", JSON.stringify(cartTotal));
        }
    }, [cartTotal]);

    useEffect(() => {
        let actualCount = 0
        cart.map((product) => {
            actualCount = actualCount + product.quantity
        })
        if (typeof cart === "object" && actualCount === cartCount) {
            localStorage.setItem("cart", JSON.stringify(cart));
        }
    }, [cart]);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await fetch('https://dummyjson.com/products');
                const productsData = await response.json();
                setProducts(productsData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
                setLoading(false);
            }
        }
        fetchProducts();
    }, []);

    const addToCart = (product) => {
        const isItemInCart = cart?.find((cartProduct) => cartProduct.id === product.id);
        if (isItemInCart) {
            setCart(
                cart?.map((cartProduct) =>
                    cartProduct.id === product.id
                        ? { ...cartProduct, quantity: cartProduct?.quantity ? cartProduct?.quantity + 1 : 2 }
                        : cartProduct
                )
            );
            setCartCount(cartCount + 1)
            setCartTotal(cartTotal + product.price);
        } else {
            product.quantity = 1;
            setCart((prevCart) => [...prevCart, product]);
            setCartCount(cartCount + 1)
            setCartTotal(cartTotal + product.price);
        }
    };

    const removeFromCart = (productId) => {
        const product = cart.find((cartProduct) => cartProduct.id === productId)
        if (product) {
            const productQuantity = product?.quantity ? product?.quantity : 0;
            setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
            setCartCount(cartCount - productQuantity)
            setCartTotal(cartTotal - product?.price * productQuantity);
        }
    };

    const contextValue = {
        products,
        loading,
        cart,
        addToCart,
        removeFromCart,
        cartCount,
        cartTotal
    };

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
}