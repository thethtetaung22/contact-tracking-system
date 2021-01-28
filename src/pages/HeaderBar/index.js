import React, { useEffect, useState } from 'react'
import { AppBar, Button, IconButton, makeStyles, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { useHistory } from 'react-router'
import { useDispatch, useSelector } from 'react-redux';
import { logoutAdmin } from '../../redux/actions';

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'flex',
        flexGrow: 1,
    },
    rightComponent: {
        display: 'flex',
        flexDirection: 'row',
    },
    textButton: {
        color: 'white'
    }
}));

const HeaderBar = () => {
    const history = useHistory();
    const classes = useStyles();
    const dispatch = useDispatch();
    const [activePage, setActivePage] = useState('home');
    const { isAdminLoggedIn } = useSelector(state => state);

    const handleButtonClick = (route) => {
        switch (route) {
            case 'home': {
                setActivePage('home');
                history.push('/');
                break;
            };
            case 'login': {
                setActivePage('login');
                history.push('/admin-login');
                break;
            }
            case 'history': {
                setActivePage('history');
                history.push('/history');
                break;
            }
            case 'user': {
                setActivePage('user');
                history.push('/users');
                break;
            }
            case 'logout': {
                setActivePage('home')
                dispatch(logoutAdmin());
                history.push('/');
                break;
            }
        }
    }

    return (
        <AppBar position="static">
            <Toolbar variant='dense'>
                {/* <IconButton
                    edge="start"
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="open drawer"
                >
                    <MenuIcon />
                </IconButton> */}
                <Typography className={classes.title} variant="h6" noWrap>
                    Contact Tracking System
                </Typography>
                <div className={classes.rightComponent}>
                    <Button color={activePage === 'home' ? 'secondary' : 'inherit'} onClick={() => handleButtonClick('home')}>Home</Button>
                    {isAdminLoggedIn && <Button color={activePage === 'history' ? 'secondary' : 'inherit'} onClick={() => handleButtonClick('history')}>History</Button>}
                    {isAdminLoggedIn && <Button color={activePage === 'user' ? 'secondary' : 'inherit'} onClick={() => handleButtonClick('user')}>Users</Button>}
                    {isAdminLoggedIn && <Button color='inherit' onClick={() => handleButtonClick('logout')}>Logout</Button>}
                    {!isAdminLoggedIn && <Button color={activePage === 'login' ? 'secondary' : 'inherit'} onClick={() => handleButtonClick('login')}>Login</Button>}
                </div>
            </Toolbar>
        </AppBar>
    )
}

export default HeaderBar;
