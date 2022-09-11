import React, { useState } from 'react';
import { Box, makeStyles, Button } from '@material-ui/core';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import QrReader from 'react-qr-reader';
import { useDispatch, useSelector } from 'react-redux';
import { checkInUser } from '../../redux/actions';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function Home() {
    const classes = useStyles();
    const state = useSelector(state => state);
    const dispatch = useDispatch();
    const [openDialog, setOpenDialog] = useState(false);
    const [isCheckOut, setCheckOut] = useState(false);

    const handleOnClick = () => {
        setCheckOut(false);
        setOpenDialog(true);
    }

    const checkInNow = (id) => {
        const checkedInData = state.checkedInUsers.find((data, index) => data.userID === id);
        if (!checkedInData) {
            const bodyData = {
                userID: id
            }
            fetch('http://localhost:4000/api/history', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bodyData)
            })
                .then(response => response.json())
                .then(data => {
                    console.log("Checkin Result:", data);
                    if (data.status === 'success') {
                        dispatch(checkInUser([...state.checkedInUsers, { id: data.data.id, userID: data.data.userID }]))
                        alert('User checkin successful!')
                    }
                    return data;
                })
                .catch(error => {
                    console.log(error);
                    return error;
                });
        } else {
            alert('This user is already checked in!')
        }
    }

    const checkOutNow = (id) => {
        const checkedInData = state.checkedInUsers.find((data, index) => data.userID === id);
        if (checkedInData) {
            const bodyData = {
                userID: id,
                id: checkedInData.id
            }
            fetch('http://localhost:4000/api/history', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bodyData)
            })
                .then(response => response.json())
                .then(data => {
                    if (data.status === 'success') {
                        setCheckOut(false);
                        dispatch(checkInUser(state.checkedInUsers.filter(data => data.userID !== id)));
                        alert('User checkout successful!');
                    }
                    return data;
                })
                .catch(error => {
                    console.log(error);
                    return error;
                });
        } else {
            alert("This user has not been check in yet!")
        }
    }

    const handleScan = data => {
        if (data) {
            const scannedUser = JSON.parse(data);
            isCheckOut ? checkOutNow(scannedUser.id) : checkInNow(scannedUser.id);
            setOpenDialog(false);
        }
    }

    const handleError = err => {
        console.error(err)
    }

    const handleCheckout = () => {
        setCheckOut(true);
        setOpenDialog(true);
    }

    return (
        <div className={classes.container}>
            <Box className={classes.body}>
                <h1> Check In and Checkout </h1>
                <Button className={classes.button} variant="contained" color='primary' onClick={handleOnClick}>Scan QR To Checkin</Button>
                <Button className={classes.button} variant="contained" color='secondary' onClick={handleCheckout}>Scan QR To Checkout</Button>

                {
                    openDialog && <Dialog
                        open={openDialog}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={() => setOpenDialog(false)}>
                        <DialogTitle>{'Scan QR'}</DialogTitle>
                        <DialogContent>
                            <QrReader
                                delay={300}
                                onError={handleError}
                                onScan={handleScan}
                                style={{ width: '100%', minWidth: 350 }}
                            />
                        </DialogContent>
                    </Dialog>
                }
            </Box>
        </div>
    )
}

export default Home;

const useStyles = makeStyles({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'
    },
    body: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50
    },
    button: {
        width: 250,
        marginTop: 20
    }
});
