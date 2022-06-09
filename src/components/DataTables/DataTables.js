import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Button, Container } from '@mui/material';
import { connect } from 'react-redux';
import {Modal, Box, Typography} from '@mui/material';
import { ethers } from 'ethers';
import Swal from 'sweetalert2';
import { imageBasePath } from '../../config/config';

const columns = [
  { id: 'sNo', label: 'S. No.', minWidth: 170 },
  { id: 'tokenId', label: 'Token\u00a0ID', minWidth: 100 },
  {
    id: 'status',
    label: 'Status',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  { id: 'reward', label: 'Accumulated Rewards', minWidth: 100 },
  {
    id: 'actions',
    label: 'Actions',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];

function createData(sNo, tokenId, status, reward, actions) {
  return { sNo, tokenId, status, reward, actions };
}

function StickyHeadTable(props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [stakes, setStakes] = React.useState([]);
  const [providerActionPending, setProviderActionPending] = React.useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  React.useEffect(async () => {

    if(props.selectedAccount.address == null){
      setStakes([]);
    }

    if (props.connected && props.stakerContract && props.selectedAccount.address) {
      var currentIdOfUser = await props.stakerContract.currentIdOfUser(props.selectedAccount.address);
      setStakes([]);

      for (let i = 0; i < currentIdOfUser; i++) {
        let stake = await props.stakerContract.stakesOfUser(props.selectedAccount.address, i);
        let reward = !stake.isWithdrawn ? await props.stakerContract.calclulateReward(props.selectedAccount.address, stake.stakeId) : "N/A";
        if(!isNaN(reward)) {
          reward = ethers.utils.formatEther(reward);
        }
        console.log(reward)
        setStakes((prevStakes) => {
          return [...prevStakes, createData(i + 1, parseInt(stake.tokenId._hex, 16), stake.isWithdrawn ? 'Withdrawn' : "Not withdrawn", reward, <Button disabled={stake.isWithdrawn} style={{"color":"#fff"}} onClick={() => { handleWithdraw(stake.stakeId) }}> {!stake.isWithdrawn ? "Unstake" : "Already withdrawn"} </Button>)]
        });
      }
    }
  }, [props.connected, props.stakerContract, props.selectedAccount.address])

  async function handleWithdraw(stakeId) {
    if (props.stakerContract) {
      try {
        setProviderActionPending(true);
        let gasLimit = await props.stakerContract.estimateGas.claim(stakeId);
        let tx = await props.stakerContract.claim(stakeId, { gasLimit: gasLimit });
        await tx.wait();
        // TODO: Update the state without reqerying 
        setProviderActionPending(false);
        Swal.fire("success","NFT unstake successfully!","success");
        window.location.reload();
      } catch (e) {
        console.log(e);
        setProviderActionPending(false);
        Swal.fire("error","Something went wrong","error");
      }
    }
  }

  return (
    <>
      <Paper className='tab_col' sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer className='tablesidebar' sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {stakes
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={stakes.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          className="paginate"
        />
      </Paper>

      {providerActionPending && 
        <Modal open={true}>
        <Box margin='auto' textAlign='center' style={{
          position: "absolute",
          left: '0',
          right: '0',
          top: '0',
          bottom: '0',
          margin: 'auto',
          zIndex: '11111',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: '100vh',
          justifyContent: 'center',
          backdropFilter: ' blur(10px)',
        }}>
          <img style={{ marginTop: '0.7rem', marginBottom: '0.7rem', borderRadius:'50%' }} src={imageBasePath+"/img/bar-loader.svg"} />
          <Typography variant='h5' style={{ color: 'white' }}>Transaction Pending</Typography>
        </Box>
      </Modal>}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    connected: state.connected,
    stakerContract: state.stakerContract,
    selectedAccount: state.selectedAccount,
  }
}

export default connect(mapStateToProps)(StickyHeadTable);