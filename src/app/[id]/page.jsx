"use client"
import React from 'react'
import Image from 'next/image'
import useSWR from 'swr';
import { fetcher } from '../_libs';
import { useCart } from '../_contexts/CartContext'
import ImageList from '../_components/ImageList';
import Gallery from '../_components/Gallery'
import MobileGallery from '../_components/MobileGallery'
import { Button } from '@mui/material';
import styled from 'styled-components';

const StyledContainer = styled.section`
> * {
    width: 100%;
}
`

function productsDetail({ params }) {
    const { data: product, error, isLoading } = useSWR(
        `https://dummyjson.com/products/${params.id}`, fetcher
    );

    const { cart, addToCart, removeFromCart } = useCart();


    if (error) return <div>Failed to load</div>;
    if (isLoading) return <div>Loading...</div>;
    if (!product) return null;
    if (product?.message) return <div className="text-black">{product.message}</div>

    return (
        <div className="text-black">
            <StyledContainer className="core">
                <Gallery images={product.images} thumbs={product.images} />
                <MobileGallery images={product.images} />
                <section className="description">
                    <h1>{product.title}</h1>
                    <p className="desc">
                        {product.description}
                    </p>
                    <div className="price">
                        <div className="main-tag">
                            <p>{product.price} €</p>
                        </div>
                    </div>
                    <div className="flex flex-col xl:flex-row gap-4">
                        <Button
                            variant="contained"
                            onClick={() => {
                                addToCart(product);
                            }}
                        >
                            Aggiungi al carrello
                        </Button>
                        <Button
                            variant="contained"
                            onClick={() => {
                                removeFromCart(product.id);
                            }}
                        >
                            Rimuovi dal carrello
                        </Button>
                    </div>
                </section>
            </StyledContainer>
        </div>
    )
}

export default productsDetail