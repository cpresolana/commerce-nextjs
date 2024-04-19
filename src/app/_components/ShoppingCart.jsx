"use client"
import React from 'react'
import { useCart } from '../_contexts/CartContext';
import ShoppingCartRow from '../_components/ShoppingCartRow'
import styled from 'styled-components';

const CartTotal = styled.h3`
text-align: right;
`

function ShoppingCart() {
  const { loading, cart, removeFromCart, cartTotal } = useCart();

  const rows = cart?.map((product, index) => {
    return {
      id: product.id,
      title: product.title,
      images: product.images,
      price: product.price,
      thumnbnail: product.thumbnail,
      quantity: product.quantity
    }
  })

  return (
    <div className="text-black">
      <h1>Carrello</h1>
      {
        rows?.map((product, index) => {
          return (
            <ShoppingCartRow key={index} product={product} />
          )
        })
      }
      <CartTotal>
        totale: {cartTotal ? cartTotal : 0} €
      </CartTotal>
    </div>
  )

}

export default ShoppingCart