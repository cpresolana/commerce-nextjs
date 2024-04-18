"use client"
import Image from 'next/image'
import Link from 'next/link'
import useSWR from 'swr';
import { fetcher } from '../_libs';
import Card from '../_components/ProductCard'
import styled from 'styled-components';

const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  margin: 3em auto;
`

export default function ProductPage() {
  const { data, error, isLoading } = useSWR(
    `https://dummyjson.com/products`,
    fetcher
  );
  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;
  if (!data) return null;
  return (
    <div className='w-full'>
      <StyledDiv className=''>
        {
          data && data.products.map((product) => {
            return (
              <Card product={product}></Card>
            )
          })
        }
      </StyledDiv>
    </div>
  )
}