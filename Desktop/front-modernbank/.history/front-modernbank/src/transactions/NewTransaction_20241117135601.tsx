
import React, { useState } from 'react';
import {
  Typography,
  Box,
  TextField,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
} from '@mui/material';

const NewTransaction = () => {
    const [transactionType, settransactionType] = useState("");
    const [amount, setamount] = useState("");
    const [toAccountOrReceipient, setToAccountOrReceipient] = useState("");
    const [description, setDescription] = useState("");

const handleTransactionType = (event : SelectChangeEvent) => {
    settransactionType(event.target.value as string)
    setToAccountOrReceipient("")
}

const handleSubmit = (event : React.FormEvent<HTMLFormElement>) =>{

}

return (
    <div>
        
    </div>
)
}

export default NewTransaction;