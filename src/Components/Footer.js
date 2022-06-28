import React from 'react'
import { Box, Button, Container, Grid, Typography, } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
  return (
    <div>
      <Box className='footer_start' sx={{ backgroundColor: '#151625' }} color='#000'>
        <Container maxWidth='xl'> 
          <Grid container spacing={2} padding={2}>
            <Grid item lg={12} sm={12} md={12} xs={12}>
              <Box className='social_icon' paddingTop={2} textAlign={'center'} color-={'#fff'}>
                <FacebookIcon sx='margin:0 5px' />
                <TwitterIcon sx='margin:0 5px' />
                <InstagramIcon sx='margin:0 5px' />
                <LinkedInIcon sx='margin:0 5px' />
              </Box>
              <Box className='links_foot'>
                <ul>
                  <li><a href='#'> Home </a> </li>
                  <li><a href='#'> Presale </a> </li>
                  <li><a href='#'> NFT </a> </li>
                  <li><a href='#'> Stake </a> </li>
                  <li><a href='#'> More </a> </li>
                </ul>
              </Box>
            </Grid>
          </Grid>

        </Container>
        <Box className='last_foot'>
          <Typography variant='h6'>
          © Copyright 2022 <span style={{ color: '#e2a226' ,fontSize:'20px;' }}> NFT STAKING </span>
          </Typography>
        </Box>

      </Box>
      {/* <Box className='foot_bottom' textAlign='center' paddingY={1} color='#fff' sx={{ backgroundColor: '#0b1b27' }} >
        2022 © All rights reserved by <span fontWeight='bold' style={{ color: '#d374ffed' }}> Thinker Technology </span></Box> */}
    </div>
  )
}

export default Footer;