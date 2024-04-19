"use client"
import Image from "next/image";
import React from "react";
import { useCart } from '../_contexts/CartContext';
import ShoppingCart from '../_components/ShoppingCart'

export default function CartPage() {
    const { products, loading, cart, addToCart, removeFromCart } = useCart();
    
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <ShoppingCart></ShoppingCart>
    );
} 