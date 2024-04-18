"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import Header from './_components/Header'
import { CartProvider } from './_contexts/CartContext'
import styled from "styled-components";

const Container = styled.div`
padding: 16px 48px;

@media (min-width: 769pxpx) {
padding: 48px 72px ;
}
`

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <CartProvider>
          <Header></Header>
          <Container>
            {children}
          </Container>
        </CartProvider>
      </body>
    </html>
  );
}
