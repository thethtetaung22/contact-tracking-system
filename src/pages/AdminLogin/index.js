import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Box, makeStyles, Button, TextField } from '@material-ui/core'
import { useDispatch } from 'react-redux';
import { loginAdmin } from '../../redux/actions';

function AdminLogin() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleOnClick = () => {
        if (username.toLowerCase() === 'admin' && password.toLowerCase() === 'admin') {
            dispatch(loginAdmin());
            history.push('/');
        }
    }

    return (
        <div className={classes.container}>
            <Box className={classes.body}>
                <h1> Login to Admin </h1>
                <TextField autoFocus className={classes.textField} variant="outlined" label="Username" onChange={e => setUsername(e.target.value)}/>
                <TextField className={classes.textField} variant="outlined" label="Password" type="password" onChange={e => setPassword(e.target.value)}/>
                <Button className={classes.button} variant="contained" color='primary' onClick={handleOnClick}>Login</Button>
            </Box>
        </div>
    )
}

export default AdminLogin;

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
    textField: {
        width: 300,
        margin: 5
    },
    button: {
        marginTop: 10,
        width: 300,
    }
})
