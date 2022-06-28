import * as React from 'react';
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
import { Link } from 'react-router-dom';


const pages = [

  // {
  //   name: 'Home',
  //   route: 'home'
  // },
  // {
  //   name: 'My Page',
  //   route: 'page'
  // },
  // {
  //   name: 'NFT',
  //   route: 'nft'
  // },
  // {
  //   name: 'Stake',
  //   route: 'Stake'
  // },
  // {
  //   name: 'More',
  //   route: 'more'
  // },
  // {
  //   name: 'Contact',
  //   route: 'contact'
  // },


]

const ResponsiveAppBar = () => {
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
    <Box className='Header_start'>
      <AppBar position="static" sx={{ background: '#151625;' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>

            {/* Responsive box */}
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none', lg: 'none', xl: 'none' } }}>
              <IconButton size="large" aria-label="account of current user"
                aria-controls="menu-appbar" aria-haspopup="true" onClick={handleOpenNavMenu} color="inherit" >
                <MenuIcon style={{ color: '#fff' }} />
              </IconButton>
              <Typography variant="h6" noWrap component="div" sx={{ mr: 2, display: { xs: 'flex', md: 'none' } }}>
                <Link to='./home'>
                  <img src='./img/logo.png' width={'100px'} />
                </Link>
              </Typography>
              <Menu id="menu-appbar" anchorEl={anchorElNav} anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }}
                keepMounted transformOrigin={{ vertical: 'top', horizontal: 'left', }} open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu} sx={{ display: { xs: 'block', md: 'none' }, }} >
                {pages.map((page) => (
                  <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                    <Link to={page.route}>
                      <Typography textAlign="center">{page.name}</Typography>
                    </Link>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <Typography variant="h6" noWrap
              component="div" sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}  >
              <Link to='./home'>
                <img src='./img/logo.png' width={'100px'} />
              </Link>
            </Typography>

            {/* Desktop box */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } , justifyContent:'right', alignItems:'right' }} >

              {pages.map((page) => (
                <Link to={page.route}>
                  <Button key={page.name} onClick={handleCloseNavMenu} sx={{ my: 2,  color: 'white', display: 'block' }}  >
                    {page.name}
                  </Button>
                </Link>
              ))}
            </Box>
            <Button className='connect_walt'  variant='Contained'>  Connect Wallet </Button>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};
export default ResponsiveAppBar;
