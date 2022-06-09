import { Button } from '@mui/material';
import styled from 'styled-components';

export const BoxModals = styled.div`
    position: absolute;
    top: 50%;
    left: 50%; 
    transform: translate(-50%,-50%);
    width: 400px;
    backdrop-filter: blur(15px);
    padding: 3rem 2rem;
    border: 1px dashed #e2a226;
    border-radius: 15px;
    color:#fff;
    text-align:center;
    @media only screen and (max-width:425px) {
        padding: 2rem 1rem; 
        width: 81%;
    }
`
export const MetaMask = styled.div` 
    padding: 2rem 0;
`

export const MintNftButton = styled(Button)`
    background: rgb(87, 196, 119);
    color: white;
    width: 100%;
    boxShadow: none;
    padding: 8px 20px;
    fontSize: 15px;
    :hover {
        background: rgb(50, 55, 57);
    }
`

export const ConnectButton = styled(Button)`
    background: rgb(87, 196, 119);
    color: white;
    width: 100%;
    boxShadow: none;
    padding: 8px 20px;
    fontSize: 15px;
    :hover {
        background: rgb(50, 55, 57);
    }
`

export const DisconnectButton = styled(Button)`
    background: rgb(50, 55, 57);
    color: white;
    width: 100%;
    boxShadow: none;
    padding: 8px 20px;
    fontSize: 15px;
    :hover {
        background: rgb(50, 55, 57);
    }
`