"use client"
import React from 'react'
import { useCart } from '../_contexts/CartContext';
import Image from 'next/image';
import styled from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';
import { Button } from '@mui/material';

const Container = styled.div`
display: flex;
flex-direction: row;
gap: 16px;
padding: 16px;
`

const Wrapper = styled.div`
display: flex;
flex-direction: column;
gap: 8px;
`

const StyledButton = styled.button`
font-size: 12px;
text-align: left;
`

const StyledImage = styled.img`
width: 90px;
height: 90px;

@media (min-width: 769px) {
  width: 180px;
  height: 180px;
}
`

function ShoppingCartRow({ product }) {
  const { removeFromCart } = useCart();

  return (
    <Container>
      <StyledImage src={product.images[0]}></StyledImage>
      <Wrapper>
        <h2>
          {product.title}
        </h2>
        <h4>
          {product.price} €
        </h4>
        quantità: {product.quantity}
        {/*         
          <h6>
            totale parziale: {product.price * product.quantity} €
          </h6> 
        */}
        <StyledButton
          onClick={() => {
            removeFromCart(product.id);
          }}
        >
          Rimuovi dal carrello
          <CloseIcon fontSize='small' />
        </StyledButton>
      </Wrapper>
    </Container>
  )
}

export default ShoppingCartRow