import React, { useState } from 'react';
import {
    Typography,
    Box,
    Paper,
    Grid,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    LinearProgress,
    Chip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
} from '@mui/material';
import { useBanking } from '../contexts/BankingContext.tsx';

const SavingsAccount: React.FC = () => {
    const { bankingData, addSavingsAccount, contributeSavings } = useBanking();
    const [openDialog, setOpenDialog] = useState(false);
    const [openContributeDialog, setOpenContributeDialog] = useState(false);
    const [newAccount, setNewAccount] = useState({ name: '', goalName: '', goalAmount: '' });
    const [selectedAccount, setSelectedAccount] = useState<string | null>(null);
    const [contributionAmount, setContributionAmount] = useState('');
    const handleOpenDialog = () => setOpenDialog(true);
    const handleCloseDialog = () => {
        setOpenDialog(false);
        setNewAccount({ name: '', goalName: '', goalAmount: '' });
    };
    const handleOpenContributeDialog = (account) => {
        setSelectedAccount(account);
        setOpenContributeDialog(true);
    };
    const handleCloseContributeDialog = () => {
        setOpenContributeDialog(false);
        setSelectedAccount(null);
        setContributionAmount('');
    };
    const handleAddAccount = () => {
        if (newAccount.name && newAccount.goalName && newAccount.goalAmount) {
          addSavingsAccount(newAccount.name, newAccount.goalName, parseFloat(newAccount.goalAmount));
          handleCloseDialog();
        }
      };
    
      const handleContribute = () => {
        if (selectedAccount && contributionAmount) {
          const amount = parseFloat(contributionAmount);
          if (!isNaN(amount) && amount > 0) {
            contributeSavings(selectedAccount, amount);
          }
        }
        handleCloseContributeDialog();
      };
    
      return (
        <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
          <Typography component="h1" variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
            Savings Accounts
          </Typography>
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {Object.entries(bankingData.savings).map(([name, account]) => (
              <Grid item xs={12} md={4} key={name}>
                <Paper elevation={3} sx={{ display: 'flex', height: '100%', flexDirection: 'column', p: 3 }}>
                  <Typography variant="h6" gutterBottom>{name}</Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="body1">Balance:</Typography>
                    <Typography variant="body1" fontWeight="bold">${account.balance.toFixed(2)}</Typography>
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" gutterBottom>Progress to Goal:</Typography>
                    <LinearProgress
                      variant="determinate"
                      value={(account.balance / account.goalAmount * 100)}
                      sx={{ height: 10, borderRadius: 5 }}
                    />
                    <Typography variant="body2" gutterBottom align="right" sx={{ mt: 0.5 }}>
                      ${account.balance.toFixed(2)} / ${account.goalAmount.toFixed(2)}
                    </Typography>
                    <Box sx={{ mt: 'auto' }}>
                      <Chip label={`Goal: ${account.goalName}`} size="small" sx={{ mr: 1 }} />
                    </Box>
                  </Box>
                  <Button variant="outlined" onClick={() => handleOpenContributeDialog(name)}>
                    Contribute
                  </Button>
                </Paper>
              </Grid>
            ))}
          </Grid>
          <Button
            variant="contained"
            onClick={handleOpenDialog}
            sx={{ mt: 4, mb: 2 }}
          >
            + Add New Savings Account
          </Button>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="savings account table">
              <TableHead>
                <TableRow>
                  <TableCell>Account Name</TableCell>
                  <TableCell align="right">Balance</TableCell>
                  <TableCell align="right">Goal</TableCell>
                  <TableCell align="right">Progress</TableCell>
                  <TableCell>Goal Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.entries(bankingData.savings).map(([name, account]) => (
                  <TableRow key={name}>
                    <TableCell component="th" scope="row">{name}</TableCell>
                    <TableCell align="right">${account.balance.toFixed(2)}</TableCell>
                    <TableCell align="right">${account.goalAmount.toFixed(2)}</TableCell>
                    <TableCell align="right">
                      <LinearProgress
                        variant="determinate"
                        value={(account.balance / account.goalAmount) * 100}
                        sx={{ width: 100, display: "inline-block", mr: 1 }}
                      />
                      {((account.balance / account.goalAmount) * 100).toFixed(0)}%
                    </TableCell>
                    <TableCell>{account.goalName}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>Add New Savings Account</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Account Name"
                type="text"
                fullWidth
                variant="outlined"
                value={newAccount.name}
                onChange={(e) => setNewAccount({ ...newAccount, name: e.target.value })}
              />
              <TextField
                margin="dense"
                id="goalName"
                label="Goal Name"
                type="text"
                fullWidth
                variant="outlined"
                value={newAccount.goalName}
                onChange={(e) => setNewAccount({ ...newAccount, goalName: e.target.value })}
              />
              <TextField
                margin="dense"
                id="goalAmount"
                label="Goal Amount"
                type="number"
                fullWidth
                variant="outlined"
                value={newAccount.goalAmount}
                onChange={(e) => setNewAccount({ ...newAccount, goalAmount: e.target.value })}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Cancel</Button>
              <Button onClick={handleAddAccount}>Add Account</Button>
            </DialogActions>
          </Dialog>
          <Dialog open={openContributeDialog} onClose={handleCloseContributeDialog}>
            <DialogTitle>Contribute to {selectedAccount}</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="contribution"
                label="Contribution Amount"
                type="number"
                fullWidth
                variant="outlined"
                value={contributionAmount}
                onChange={(e) => setContributionAmount(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseContributeDialog}>Cancel</Button>
              <Button onClick={handleContribute}>Contribute</Button>
            </DialogActions>
          </Dialog>
        </Box>
      );
}
export default SavingsAccount;