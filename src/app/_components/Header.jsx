"use client"
import * as React from 'react';
import logo from '../../../public/next.svg'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Link from '@mui/material/Link';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCart } from '../_contexts/CartContext';
import styled from 'styled-components';
import Image from 'next/image';

const StyledAppBar = styled(AppBar)`
padding: 16px 48x;

@media (min-width: 1200px) {
padding: 16px 72px ;
}
`

const CardCount = styled.div`
display: flex;
align-items: center;
justify-self: center;
margin: 0 auto;
color: black;
`

const StyledLink = styled(Link)`
display: flex;
align-items: center;
justify-self: center;
`

const CountWrapper = styled.div`
border-radius: 50%;
background: white;
width: 20px;
height: 20px;
color: #1876D1;
display: flex;
justify-content: center;
font-size: 14px;
font-weight: bold;
`


const pages = ['cart'];

function ResponsiveAppBar() {
    const { cartCount } = useCart();

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <StyledAppBar position="static" className="!bg-transparent text-black flex">
            <Container maxWidth="xl">
                <Toolbar disableGutters className="flex justify-between">
                    <Link href="/">
                        <Image alt="logo" src={logo} height={80} width={80}></Image>
                    </Link>
                    {/* menu mobile */}
                    <Box
                        className="flex flex-column justify-center md:hidden"
                        sx={{ display: { xs: 'flex', md: 'none' } }}
                    >
                        <IconButton
                            size="large"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="black"
                            className="ml-auto mr-0 order-last"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page, index) => (
                                <Link key={index} className="!no-underline" href={`/${(page)}`}>
                                    <MenuItem to={page} key={page} onClick={handleCloseNavMenu}>
                                        <Typography className="uppercase !text-black !text-[14px]" textAlign="center">{page}</Typography>
                                    </MenuItem>
                                </Link>
                            ))}
                        </Menu>
                    </Box>
                    {/* menu desktop */}
                    <Box className="hidden md:flex flex-row justify-end content-end w-fit "
                        sx={{ display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page, index) => (
                            <Link key={index} href={`/${(page)}`}>
                                <Button
                                    key={page}
                                    onClick={handleCloseNavMenu}
                                    className="!text-black font-[16px]"
                                >
                                    {page}
                                </Button>
                            </Link>
                        ))}
                        <CardCount>
                            {cartCount ? `(${cartCount})` : 0}
                        </CardCount>
                    </Box>
                </Toolbar>
            </Container>
        </StyledAppBar>
    );
}
export default ResponsiveAppBar;