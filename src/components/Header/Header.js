import * as React from "react";

// Material UI
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Divider } from "@mui/material";

// Router
import Link from "next/link";
// import { useLocation } from 'react-router-dom';

// Providers
import WalletConnectProvider from "@walletconnect/web3-provider";

// Ethers
import { ethers } from "ethers";

// Redux
import { connect } from "react-redux";

// Misc
import { toast } from "react-toastify";

//Elements
import {
  BoxModals,
  MetaMask,
  ConnectButton,
  DisconnectButton,
  MintNftButton,
} from "./HeaderElements";

// Contract
import {
  contractAddress,
  contractAbi,
  stakerContractAddress,
  stakerContractAbi,
  chainId,
  addEthereumChainParameter,
} from "../../contract/contract";
import { useRouter } from "next/router";
import { baseName, imageBasePath, projectBaseUrl } from "../../config/config";

var provider;

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1a2f35",
    },
  },
});

const pages = [
  // { text: 'Home', route: '/' },
  // { text: 'Mint', route: '/mint' },
  // { text: 'My wallet', route: '/wallet' },
  // { text: 'My stakes', route: '/staking'},
];

const modalButtons = [
  {
    action: "Metamask",
    buttonText: "Metamask",
    logoImgPath: "/img/MetaMask.png",
    logoImgAltText: "Metamask Logo",
  },
  {
    action: "WalletConnect",
    buttonText: "WalletConnect",
    logoImgPath: "/img/WalletConnect.png",
    logoImgAltText: "WalletConnect Logo",
  },
];

const homePageSectionsLinks = [
  // {
  //     title: "Features",
  //     route: "/home#features"
  // },
  // {
  //     title: "About",
  //     route: "/home#about"
  // },
];

const ResponsiveAppBar = (props) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [currentWindowPathTerminal, setWindowPathTerminal] =
    React.useState("/staking");

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getSignerAndContract = async (provider) => {
    if (provider) {
      const ethersProvider = new ethers.providers.Web3Provider(provider);
      var signer, account;
      try {
        signer = await ethersProvider.getSigner();
      } catch (e) {
        console.log("Error while getting signer: ", e);
      }
      if (signer.provider.provider.selectedAddress) {
        account = signer.provider.provider.selectedAddress;
      } else {
        account = signer.provider.provider.accounts[0];
      }
      props.setAccount(account);
      const contract = new ethers.Contract(
        contractAddress,
        contractAbi,
        signer
      );
      props.setContract(contract);

      const stakerContract = new ethers.Contract(
        stakerContractAddress,
        stakerContractAbi,
        signer
      );
      props.setStakerContract(stakerContract);
    }
  };

  const getProvider = () => {
    if ("ethereum" in window) {
      return window.ethereum;
    }
  };

  const handleAccountsRequest = async (provider) => {
    try {
      await provider.request({ method: "eth_requestAccounts" });
      props.setConnected(true);
      handleClose();
    } catch (error) {
      toast.error("Error while requesting accounts!");
      props.resetState();
    }
    getSignerAndContract(provider);
  };

  const handleConnection = async (providerChoice) => {
    const { ethereum } = window;
    if (
      providerChoice !== "WalletConnect" &&
      ethereum &&
      parseInt(ethereum.chainId, 16) !== chainId
    ) {
      try {
        await ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x" + chainId.toString(16) }],
        });
      } catch (e) {
        if (e.code === 4001) {
          toast.info(
            "Please switch to " +
              addEthereumChainParameter.chainName +
              " to use our app!"
          );
        } else if (e.code === 4902) {
          try {
            await ethereum.request({
              method: "wallet_addEthereumChain",
              params: [addEthereumChainParameter],
            });
          } catch (e) {
            console.log(e);
            if (e.code === 4001) {
              toast.info(
                "Please switch to " +
                  addEthereumChainParameter.chainName +
                  " to use our app!"
              );
            } else {
              console.log("Error attempting to add chain: ", e);
            }
            return;
          }
        } else console.log(e);
        return;
      }
    }

    switch (providerChoice) {
      case "Metamask":
        provider = getProvider();
        if (provider && provider.isMetaMask) {
          props.setProvider(provider);
          handleAccountsRequest(provider);
        } else {
          toast.info("Couldn't find Metamask!");
        }
        break;
      case "WalletConnect":
        await handleDisconnect();
        const wcProvider = new WalletConnectProvider({
          infuraId: "4e990aac9bc9418b8112eb1ed524cf91",
          rpc: {
            4: "https://rinkeby-light.eth.linkpool.io/",
          },
          chainId: chainId,
          qrcode: true,
          qrcodeModalOptions: {
            mobileLinks: ["metamask", "trust"],
          },
        });

        provider = wcProvider;

        try {
          await provider.enable().then(handleClose);

          getSignerAndContract(wcProvider);

          props.setProvider(wcProvider);
          props.setConnected(true);

          provider.on("disconnect", async (error) => {
            await provider.close();
            handleDisconnect();
          });
        } catch (e) {
          if (!e.toString().includes("User closed")) {
            toast.error(e.toString());
          }
        }
        break;
      default:
        provider = getProvider();
        if (provider) {
          props.setProvider(provider);
          handleAccountsRequest(provider);
        } else {
          toast.info("Couldn't find " + providerChoice + "!", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
        break;
    }
  };

  const handleDisconnect = () => {
    if (props.provider && props.provider.close) {
      props.provider.close().catch();
    }
    props.clearState();
  };

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <AppBar position="fixed" sx={{ background: "#181818 !important" }}>
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              {/* Logo */}
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
              >
                <Link href="/">
                  <img
                    width="100px"
                    src={`${imageBasePath}img/logo512.png`}
                    alt="logo512"
                  />
                </Link>
              </Typography>

              {/* Responsive hamburger button and menu */}

              {/* Responsive Logo */}
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ display: { xs: "flex", md: "none" } }}
              >
                <Link href="/">
                  <img
                    src={imageBasePath + "img/logo512.png"}
                    alt="logo512"
                    width="100px"
                  />
                </Link>
              </Typography>

              {/* Large screen Navbar LHS */}
              <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
                {/* <MenuItem  sx={{ my: 2, textDecoration: 'none' }} disableRipple>
                                    <Link href="/">Home</Link>
                                </MenuItem> */}
                {homePageSectionsLinks.map((item) => (
                  <MenuItem
                    key={item.title}
                    sx={{ my: 2 }}
                    disableRipple
                    href={item.route}
                  >
                    {item.title}
                  </MenuItem>
                ))}
                {/* Rest of the links start */}
                {pages.map((page) => (
                  <MenuItem
                    key={page.text}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    <Link href={page.route}>{page.text}</Link>
                  </MenuItem>
                ))}
              </Box>

              {/* Large screen Navbar RHS */}
              <Box
                sx={{
                  flexGrow: 0,
                  display: "flex",
                  position: "absolute",
                  right: "0px",
                  marginRight: { xs: "40px", md: "0px" },
                }}
              >
                {!props.connected ? (
                  <ConnectButton
                    style={{
                      backgroundColor: "#e2a226",
                      color: "#000",
                      display: "block",
                    }}
                    onClick={handleOpen}
                  >
                    Connect
                  </ConnectButton>
                ) : (
                  <DisconnectButton
                    style={{
                      backgroundColor: "#e2a226",
                      color: "#000",
                      display: "block",
                    }}
                    onClick={handleDisconnect}
                  >
                    {props.selectedAccount.address
                      ? props.selectedAccount.address.slice(0, 6) +
                        "..." +
                        props.selectedAccount.address.slice(-5)
                      : "Disconnect"}
                  </DisconnectButton>
                )}
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
        <Toolbar />
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <BoxModals
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <Typography id="modal-modal-title" variant="h5" component="h2">
              Connect Wallet
            </Typography>
            <MetaMask>
              {modalButtons.map((buttonInfo, idx) => {
                return (
                  <Button
                    key={idx}
                    onClick={() => {
                      handleConnection(buttonInfo.action);
                      handleClose();
                    }}
                    style={{
                      width: "100%",
                      margin: "10px 0",
                      boxShadow: "none",
                      background: "#e2a226",
                      color: "#000",
                      padding: "10px 20px",
                      fontSize: "16px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>{buttonInfo.buttonText}</div>
                    <div>
                      <img
                        src={
                            projectBaseUrl + buttonInfo.logoImgPath
                        }
                        width="30px"
                        alt={buttonInfo.logoImgAltText}
                      />
                    </div>
                  </Button>
                );
              })}
            </MetaMask>
          </BoxModals>
        </Modal>
      </ThemeProvider>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    connected: state.connected,
    provider: state.provider,
    selectedAccount: state.selectedAccount,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setProvider: (provider) => {
      dispatch({ type: "SET_PROVIDER", payload: provider });
    },
    setConnected: (isConnected) => {
      dispatch({ type: "SET_CONNECTED", payload: isConnected });
    },
    setAccount: (account) => {
      dispatch({ type: "SET_ACCOUNT_ADDRESS", payload: account });
    },
    setContract: (contract) => {
      dispatch({ type: "SET_CONTRACT", payload: contract });
    },
    setStakerContract: (contract) => {
      dispatch({ type: "SET_STAKER_CONTRACT", payload: contract });
    },
    clearState: () => {
      dispatch({ type: "RESET" });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResponsiveAppBar);
