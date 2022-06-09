import contractAbi from './abi/nft-contract-abi.json';
import stakerContractAbi from './abi/staker-contract-abi.json';

export const chainName = "Rinkeby Test Network";
export const rpcUrl = 'https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161';
export const blockExplorerUrl = "https://rinkeby.etherscan.com/";
export const chainId = 4;

export const addEthereumChainParameter = {
    chainId: '0x' + chainId.toString(16),
    chainName: chainName,
    nativeCurrency: {
        name: 'Rinkeby Ether',
        symbol: 'rETH',
        decimals: 18,
    },
    rpcUrls: [rpcUrl],
    blockExplorerUrls: [blockExplorerUrl],
}

export const walletConnectOptions = {
    infuraId: "4e990aac9bc9418b8112eb1ed524cf91",
    rpc: {
        [chainId]: rpcUrl,
    },
    chainId: chainId,
    qrcode: true,
    qrcodeModalOptions: {
        mobileLinks: [
            "metamask",
            "trust",
        ],
    },
}

// NFT Contract 
export const contractAddress = "0xd7FF16171B011A7205816c53af35CC5Ad333924f";
export { contractAbi };
export const tokenSymbol = "NT";

// Staker Contract
export const stakerContractAddress = "0x30217574995cfe57b4C3942FD48DF3C775D47ad3";
export { stakerContractAbi };

// Reward
export const rewardTokenSymbol = "LAA";