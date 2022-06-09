import Header from './components/Header/Header';
import FooterSections from './components/Footer/Footer';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { ethers } from 'ethers';
import { contractAbi, contractAddress, rpcUrl, stakerContractAbi, stakerContractAddress } from './contract/contract';

import { ToastContainer, Flip } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function Layout(props) {
    useEffect(() => {
        const provider = new ethers.getDefaultProvider(rpcUrl);
        let publicContract = new ethers.Contract(stakerContractAddress, stakerContractAbi, provider);
        props.setPublicContract(publicContract);
    
        const { ethereum } = window;
        if(ethereum) {
          ethereum.on('accountsChanged', () => props.resetState());
          ethereum.on('chainChanged', () => props.resetState());
        }
    }, []);
    
    return (
        <>
            <Header />
            <ToastContainer transition={Flip} />
            <main>{props.children}</main>
            <FooterSections />
        </>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
      setPublicContract: (publicContract) => { dispatch({ type: "SET_PUBLIC_CONTRACT", payload: publicContract }) },
      resetState: () => { dispatch({ type: "RESET" }) }
    }
}

export default connect(null, mapDispatchToProps)(Layout);