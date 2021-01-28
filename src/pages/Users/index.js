import React, { useEffect, useState } from 'react';
import {
    Box,
    makeStyles,
    Typography,
    Paper,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TablePagination,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from '@material-ui/core'
import RegisterNewUser from '../RegisterNewUser';
import { QRCode } from 'react-qr-svg';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Users = () => {
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [users, setUsers] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [isShowQRDialog, setShowQRDialog] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const columns = [
        { id: 'no', label: 'No', minWidth: 60 },
        { id: 'name', label: 'Name', minWidth: 170 },
        { id: 'nrc', label: 'NRC', minWidth: 100 },
        { id: 'phone', label: 'Phone', minWidth: 100 },
        { id: 'address', label: 'Address', minWidth: 160 },
        { id: 'createdAt', label: 'CreatedAt', minWidth: 100 }
    ];

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const showQRCode = (user) => {
        setSelectedUser(user);
        setShowQRDialog(true)
    }

    const renderQRDialog = () => {
        const user = selectedUser;
        return (user &&
            <Dialog
                open={isShowQRDialog}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => setShowQRDialog(false)}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogContent dividers style={{ marginRight: 30, marginLeft: 30 }}>
                    <Typography variant='h6'> Capture QR Code </Typography>
                    <Typography variant="subtitle1">Name : {user.name}</Typography>
                    <QRCode
                        id="QRCode"
                        level="Q"
                        style={{ width: 256, marginTop:5 }}
                        value={JSON.stringify({
                            id: user.id,
                            name: user.name,
                            nrc: user.nrc,
                            phone: user.phone,
                            address: user.address
                        })}
                        includeMargin={true}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShowQRDialog(false)} color="primary">Close</Button>
                </DialogActions>
            </Dialog>)
    }

    useEffect(() => {
        fetch('http://localhost:4000/api/user', {
            method: "GET"
        })
            .then(response => response.json())
            .then(data => {
                const userArr = [];
                data.data.forEach(
                    (userData, index) => userArr.push(
                        {
                            no: index + 1,
                            name: userData.name,
                            nrc: userData.nrc,
                            phone: userData.phone,
                            address: userData.address,
                            createdAt: new Date(userData.created_at).toLocaleString()
                        }
                    )
                )
                setUsers(userArr);
                return data;
            })
            .catch(error => {
                console.log(error);
                return error;
            });
    }, []);

    return (
        <div className={classes.container}>
            <Box className={classes.body}>
                <Box className={classes.topBox}>
                    <Typography variant='h5' color='primary'> All Users </Typography>
                    <Button variant="contained" color="primary" onClick={() => setOpenDialog(true)}>Add New User</Button>
                </Box>
                <Paper className={classes.tableRoot}>
                    <TableContainer className={classes.tableContainer}>
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
                                {
                                    users?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                                {
                                                    columns.map((column) => {
                                                        const value = row[column.id];
                                                        return (
                                                            <TableCell key={column.id} align={column.align} onClick={() => showQRCode(row)}>
                                                                {column.format && typeof value === 'number' ? column.format(value) : value}
                                                            </TableCell>
                                                        );
                                                    })
                                                }
                                            </TableRow>
                                        );
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={users.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </Paper>
            </Box>
            <RegisterNewUser openDialog={openDialog} closeDialog={() => setOpenDialog(false)} />
            {renderQRDialog()}
        </div>
    )
}

export default Users;

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
        marginTop: 15
    },
    topBox: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        width: '100%',
        justifyContent: 'space-between'
    },
    tableHead: {
        background: 'primary',
        backgroundColor: 'primary'
    },
    tableRoot: {
        marginTop: 15,
        width: '100%',
    },
    tableContainer: {
        maxHeight: 590,
    },
});
