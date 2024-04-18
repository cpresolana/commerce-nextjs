import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Link from 'next/link';
import { useCart } from '../_contexts/CartContext'
import styled from 'styled-components'


const StyledCard = styled(Card)`
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  flex: 0 0 250px;
  display: flex;
  flex-direction: column;
  background: #fff;
  margin: 0 1px @baseline-half;
  padding: 1em;
  border-radius: 16px;

  > * {
    height:
  }
`

const StyledMedia = styled(CardMedia)`
height: 200px;
border-radius: 16px;
`

const StyledLink = styled(Link)`
display: flex;
flex-direction: column;
`

const StyledActions = styled(CardActions)`
justify-self: end;
margin-top: auto
`

export default function ProductCard({ product }) {
    const { addToCart } = useCart();

    return (
        <StyledCard key={product.id}>
            <StyledLink href={`/${product.id}`} >
                <StyledMedia
                    component="img"
                    image={product.images[0]}
                    alt={product.title}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {product.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {product.description}
                    </Typography>
                </CardContent>
            </StyledLink >
            <StyledActions>
                <Button variant="contained" size="small" color="primary" onClick={() => addToCart(product)}>
                    Aggiungi al carrello
                </Button>
            </StyledActions>
        </StyledCard >
    );
}