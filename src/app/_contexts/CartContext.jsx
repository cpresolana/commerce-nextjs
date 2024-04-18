import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function useCart() {
    return useContext(CartContext);
}

export function CartProvider({ children }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [cartCount, setCartCount] = useState(localStorage?.getItem('cartCount') ? JSON.parse(localStorage.getItem('cartCount')) : 0)
    const [cart, setCart] = useState(localStorage?.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []);
    const [cartTotal, setCartTotal] = useState(localStorage?.getItem('cartTotal') ? JSON.parse(localStorage.getItem('cartTotal')) : 0);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        localStorage.setItem("cartCount", JSON.stringify(cartCount));
    }, [cartCount]);

    useEffect(() => {
        localStorage.setItem("cartTotal", JSON.stringify(cartTotal));
    }, [cartTotal]);

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
        const isItemInCart = cart.find((cartProduct) => cartProduct.id === product.id);
        if (isItemInCart) {
            setCart(
                cart.map((cartProduct) =>
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
            setCartTotal(cartTotal - product.price * productQuantity);
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