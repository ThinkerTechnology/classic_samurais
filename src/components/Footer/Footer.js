import { Container, Grid, Typography, Box } from '@mui/material';
import React from 'react'
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

import styled from 'styled-components';
import { imageBasePath } from '../../config/config';

const OptionsKings = styled.div`
    padding: 2rem 0 0rem;
    background-color: #181818;
    color: #fff;
`

const SocialContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

`

const SocialIcon = styled.div`
    margin:10px;
`

const socialtext = [
    { text: '', variant: 'h6' }
]


const FooterSections = () => {
    return (
        <OptionsKings>
            <Container maxWidth="lg">
                <Grid container spacing={2} >
                    <Grid item xs={12} sm={12} md={6} lg={6} margin="auto">
                        <Box textAlign="center">
                            <Box >
                                <img src={imageBasePath + 'img/logo512.png'} alt='logo' width="100px !important" />
                            </Box>
                            {socialtext.map((heading) => (
                                <Typography key={heading.text} variant={heading.variant}> {heading.text} </Typography>
                            ))}
                            <SocialContainer>
                                <SocialIcon>
                                    <FacebookOutlinedIcon color="#fff" />
                                </SocialIcon>
                                <SocialIcon>
                                    <InstagramIcon color="#fff" />
                                </SocialIcon>
                                <SocialIcon>
                                    <YouTubeIcon color="#fff" />
                                </SocialIcon>
                                <SocialIcon>
                                    <LinkedInIcon color="#fff" />
                                </SocialIcon>
                            </SocialContainer>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
            <Box className='last_foot'>
            <Typography variant='h6'>
            © Copyright 2022 <span style={{ color: '#e2a226' ,fontSize:'20px;' }}> NFT STAKING </span>
            </Typography>
          </Box>
        </OptionsKings>
       
    )
}

export default FooterSections;