import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import DataTables from "../src/components/DataTables/DataTables";
import { Modal, Box, Button, Container, Grid, Typography } from "@mui/material";

import { tokenSymbol } from "../src/contract/contract";
import stakerContractAddress from "../src/contract/contract";

import { connect } from "react-redux";
import { ethers } from "ethers";
import Swal from "sweetalert2";
import { imageBasePath } from "../src/config/config";

function ColumnGroupingTable(props) {
  const [myNfts, setMyNfts] = React.useState([]);
  const [myBalance, setMyBalance] = React.useState(null);
  const [age, setAge] = React.useState(null);
  const [selectedTokenId, setTokenId] = React.useState(null);
  const [providerActionPending, setProviderActionPending] =
    React.useState(false);
  const [tokenPerSecond, setTokenPerSecond] = React.useState(null);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  React.useEffect(async () => {
    if (props.publicContract) {
      var tps = await props.publicContract.tokenPerSecond();
      setTokenPerSecond(ethers.utils.formatEther(tps));
    }
  }, [props.publicContract]);

  React.useEffect(async () => {
    if (!props.selectedAccount.address || !props.contract) return;
    updateMyWallet();
  }, [props.selectedAccount.address, props.contract]);

  async function updateMyWallet() {
    if (
      props.selectedAccount.address &&
      props.contract 
    ) {
      try {
        const balance = await props.contract.balanceOf(
          props.selectedAccount.address
        );

        props.setAccountBalance(parseInt(balance, 16));

        setMyBalance(true);

        const receivedNfts = await props.contract.walletOfOwner(
          props.selectedAccount.address
        );

        setMyNfts(receivedNfts);
      } catch (e) {
        console.log(e);
      }
    }
  }

  async function handleStake() {
    if (props.contract && props.stakerContract && selectedTokenId) {
      try {
        setProviderActionPending(true);
        var gasLimit = await props.contract.estimateGas.approve(
          "0x30217574995cfe57b4C3942FD48DF3C775D47ad3",
          selectedTokenId.toString()
        );
        var tx = await props.contract.approve(
          "0x30217574995cfe57b4C3942FD48DF3C775D47ad3",
          selectedTokenId.toString(),
          { gasLimit: gasLimit }
        );
        await tx.wait();

        gasLimit = await props.stakerContract.estimateGas.deposite(
          selectedTokenId.toString()
        );

        tx = await props.stakerContract.deposite(selectedTokenId.toString());
        await tx.wait();
        // TODO: Remove the staked nft from Mynfts variable
        myNfts.filter((nft) => nft.tokenId !== selectedTokenId);
        setProviderActionPending(false);
        Swal.fire("success", "NFT stake successfully!", "success");
      } catch (e) {
        console.log(e);
        setProviderActionPending(false);
        Swal.fire("error", "Something went wrong", "error");
      }
    }
  }

  return (
    <div className="nftsstkingbox" style={{"backgroundImage":`url(${imageBasePath}img/banner.jpg) !important`}}>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Box className="stakenftmainboxs" marginTop={"100px"}>
              <Box className="majar_top" marginBottom="30px">
                <img className="four" src="./img/moto.png" />
                <Typography variant="h2" fontSize={55} fontWeight={900}>
                  <span color=""> Classic Samurais </span>
                </Typography>
                <Typography variant="h6" fontSize={17} fontWeight={200}>
                  Stake your NFTs for rewards. You can make sure to get high
                  tokens per second and get benefits according for your stake
                  duration.
                </Typography>
              </Box>
              <Box className="wrapboxinner">
                <Box padding="1rem">
                  <Box className="textstakings">
                    <Typography
                      color="#fff"
                      variant="h6"
                      fontWeight="normal"
                      gutterBottom
                      component="div"
                      sx={{ color: "#e2a226" }}
                    >
                      Balance
                    </Typography>
                    <Typography
                      color="#fff"
                      variant="h4"
                      gutterBottom
                      component="div"
                    >
                      {props.selectedAccount.balance
                        ? props.selectedAccount.balance
                        : "-"}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box className="wrapboxinner">
                <Box padding="1rem">
                  <Box className="textstakings">
                    <Typography
                      color="#fff"
                      variant="h6"
                      fontWeight="normal"
                      gutterBottom
                      component="div"
                      sx={{ color: "#e2a226" }}
                    >
                      Symbol
                    </Typography>
                    <Typography
                      color="#fff"
                      variant="h4"
                      gutterBottom
                      component="div"
                    >
                      {tokenSymbol}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box className="wrapboxinner">
                <Box padding="1rem">
                  <Box className="textstakings">
                    <Typography
                      color="#fff"
                      variant="h6"
                      fontWeight="normal"
                      gutterBottom
                      component="div"
                      sx={{ color: "#e2a226" }}
                    >
                      Your Wallet
                    </Typography>

                    <FormControl sx={{ minWidth: "100%" }}>
                      <InputLabel
                        id="demo-simple-select-autowidth-label"
                        sx={{ color: "#fff" }}
                      >
                        Token ID
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-autowidth-label"
                        id="demo-simple-select-autowidth"
                        value={age}
                        onChange={handleChange}
                        autoWidth
                        label="Token ID"
                        sx={{ color: "#fff" }}
                      >
                        <MenuItem value="">
                          <em>Token ID</em>
                        </MenuItem>
                        {myNfts.map((nft) => (
                          <MenuItem
                            key={nft._hex}
                            onClick={() => setTokenId(parseInt(nft._hex, 16))}
                            value={nft._hex}
                          >
                            {parseInt(nft._hex, 16)}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                </Box>
              </Box>
              <Box className="wrapboxinner">
                <Box padding="1rem">
                  <Box className="textstakings">
                    <Typography
                      color="#fff"
                      variant="h6"
                      fontWeight="normal"
                      gutterBottom
                      component="div"
                      sx={{ color: "#e2a226" }}
                    >
                      Rewards per second
                    </Typography>
                    <Typography
                      color="#fff"
                      variant="h4"
                      gutterBottom
                      component="div"
                    >
                      {tokenPerSecond
                        ? parseFloat(tokenPerSecond).toFixed(6)
                        : "-"}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={5} margin="auto">
            <Box paddingY="1rem" className="mintbtnnft" textAlign="center">
              <Button
                className="withdranbtn"
                variant="outlined"
                onClick={() => handleStake()}
              >
                Stake{" "}
                {selectedTokenId && (
                  <small style={{ color: "#282b39" }}>
                    {" "}
                    &nbsp; Token ID {selectedTokenId}
                  </small>
                )}
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={12} margin="auto">
            <Box paddingY="2rem" style={{ width: "100%", overflow: "hidden" }}>
              <DataTables />
            </Box>
          </Grid>
        </Grid>
      </Container>
      {providerActionPending && (
        <Modal open={true}>
          <Box
            margin="auto"
            textAlign="center"
            style={{
              position: "absolute",
              left: "0",
              right: "0",
              top: "0",
              bottom: "0",
              margin: "auto",
              zIndex: "11111",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              height: "100vh",
              justifyContent: "center",
              backdropFilter: " blur(10px)",
            }}
          >
            <img
              style={{
                marginTop: "0.7rem",
                marginBottom: "0.7rem",
                borderRadius: "50%",
              }}
              src={imageBasePath+"/img/bar-loader.svg"}
            />
            <Typography variant="h5" style={{ color: "white" }}>
              Transaction Pending
            </Typography>
          </Box>
        </Modal>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    connected: state.connected,
    contract: state.contract,
    stakerContract: state.stakerContract,
    publicContract: state.publicContract,
    selectedAccount: state.selectedAccount,
    nfts: state.nfts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setAccountBalance: (balance) => {
      dispatch({ type: "SET_ACCOUNT_BALANCE", payload: balance });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ColumnGroupingTable);
