import React from 'react'
import { Box, Button, Container, Grid, Typography, } from '@mui/material';
import { Link } from "react-router-dom";
import Tokenselect from './Tokenselect';
import Table from './Table';

const Home = () => {
  return (
    <div>
      <Box className='banner'>
        <Container maxWidth='xl'>
          <Grid container spacing={2} alignItems='center'>
            <Grid item lg={12} sm={12}>
              <Box className='majar_top' marginBottom='30px'>
                <img className='four' src='./img/moto.png' />
                <Typography variant='h2' fontSize={55} fontWeight={900}>
                  <span color='#fff'> Classic Samurais </span> 
                </Typography>
                <Typography variant='h6' fontSize={17} fontWeight={200}>
                  Stake your NFTs for rewards. You can make sure to get high tokens per second and get benefits according for your
                  stake duration.
                </Typography>
              </Box>
            </Grid>
            <Grid item lg={3} sm={6} xs={12}>
              <Box className='majority'>
                <Typography variant='h6' fontSize={20} fontWeight={400}>
                  Balance
                </Typography>
                <Typography variant='h4' fontSize={24} fontWeight={600}>
                  -
                </Typography>
              </Box>
            </Grid>
            <Grid item lg={3} sm={6} xs={12}>
              <Box className='majority'>
                <Typography variant='h6' fontSize={20} fontWeight={400}>
                  Symbol
                </Typography>
                <Typography variant='h4' fontSize={24} fontWeight={600}>
                  NFT
                </Typography>
              </Box>
            </Grid>
            <Grid item lg={3} sm={6} xs={12}>
              <Box className='majority'>
                <Typography variant='h6' fontSize={20} fontWeight={400}>
                  Your Wallet
                </Typography>
                <Typography variant='h4' fontSize={24} fontWeight={600}>
                  <Tokenselect />
                </Typography>
              </Box>
            </Grid>
            <Grid item lg={3} sm={6} xs={12}>
              <Box className='majority'>
                <Typography variant='h6' fontSize={20} fontWeight={400}>
                  Rewards per second
                </Typography>
                <Typography variant='h4' fontSize={24} fontWeight={600}>
                  0.000032
                </Typography>
              </Box>
            </Grid>
            <Box className='staked'>
              <Button variant="contained" sx={{ fontSize: '18px' }}>
                Stake
              </Button>
            </Box>

          </Grid>
        </Container>
      </Box>
      <Table />
    </div>
  )
}

export default Home;