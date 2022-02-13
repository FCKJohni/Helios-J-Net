import React, { useState } from 'react';
import Alert from '@mui/material/Alert';
import { Snackbar } from '@mui/material';

export default function HeliosAlert({text, type}) {
    const [open, setOpen] = useState(true);
  
    setTimeout(function() {
        setOpen(false);
    }, 6500);
    
    return (
        <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'right'}} sx={{width: '50%'}} open={open} autoHideDuration={6500}>
            <Alert variant="outlined" severity={type} onClose={()=> {setOpen(false)}}>{text}</Alert>
        </Snackbar>
    );
}