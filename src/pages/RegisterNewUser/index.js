import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { makeStyles, TextField, Typography } from '@material-ui/core';
import { QRCode } from 'react-qr-svg';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const RegisterNewUser = (props) => {
    const classes = useStyles();
    const openDialog = props.openDialog;
    const closeDialog = props.closeDialog;
    const [isRegistered, setRegistered] = useState(false);
    const [name, setName] = useState('');
    const [nrc, setNrc] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [id, setID] = useState('');

    const handleRegisterPress = () => {
        if (name !== '' && nrc !== '' && phone !== '' && address !== '') {
            const requestData = {
                name,
                nrc,
                phone,
                address
            };
            fetch('http://localhost:4000/api/user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestData)
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    if (data.status === 'success') {
                        setID(data.data.id);
                        setRegistered(true);
                    }
                    return data;
                })
                .catch(error => {
                    console.log(error);
                    return error;
                });
        }
    }

    return (
        <div>
            <Dialog
                open={openDialog}
                TransitionComponent={Transition}
                keepMounted
                onClose={closeDialog}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title" style={{ backgroundColor: "Background", color: 'white' }}>{"Register New User"}</DialogTitle>
                {
                    isRegistered ?
                        <DialogContent dividers style={{ marginRight: 30, marginLeft: 30 }}>
                            <Typography variant='h6'> Capture QR Code </Typography>
                            <Typography variant="subtitle1">Name : {name}</Typography>
                            <QRCode
                                id="QRCode"
                                level="Q"
                                style={{ width: 256 }}
                                value={JSON.stringify({
                                    id,
                                    name,
                                    nrc,
                                    phone,
                                    address
                                })}
                                includeMargin={true}
                            />
                        </DialogContent>
                        :
                        <DialogContent dividers>
                            <TextField value={name} className={classes.textField} variant="outlined" label="Name" onChange={e => setName(e.target.value)} />
                            <TextField value={nrc} className={classes.textField} variant="outlined" label="NRC" onChange={e => setNrc(e.target.value)} />
                            <TextField value={phone} className={classes.textField} variant="outlined" label="Phone" onChange={e => setPhone(e.target.value)} />
                            <TextField value={address} className={classes.textField} variant="outlined" label="Address" onChange={e => setAddress(e.target.value)} />
                        </DialogContent>
                }
                <DialogActions>
                    {!isRegistered && <Button onClick={closeDialog} color="primary">Cancel</Button>}
                    {
                        isRegistered ?
                            <Button onClick={closeDialog} variant="contained" color="primary">Done</Button> :
                            <Button onClick={handleRegisterPress} variant="contained" color="primary">Register</Button>
                    }
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default RegisterNewUser;

const useStyles = makeStyles({
    textField: {
        width: '100%',
        margin: 5
    },
});
