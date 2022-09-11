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
    IconButton
} from '@material-ui/core'
import RegisterNewUser from '../RegisterNewUser';
import DeleteIcon from '@material-ui/icons/Delete';

const History = () => {
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [histories, setHistories] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);

    const columns = [
        { id: 'no', label: 'No', minWidth: 60 },
        { id: 'name', label: 'Name', minWidth: 100 },
        { id: 'nrc', label: 'NRC', minWidth: 100 },
        { id: 'phone', label: 'Phone', minWidth: 100 },
        { id: 'address', label: 'Address', minWidth: 100 },
        { id: 'checked_in', label: 'Checked In', minWidth: 100 },
        { id: 'checked_out', label: 'Checked Out', minWidth: 100 },
        { id: 'delete', label: 'Delete', minWidth: 70 }
    ];

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleDelete = async (row) => {
        console.log(row);
        fetch('http://localhost:4000/api/history', {
            method: "DELETE",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: row['_id'] })
        }).then(response => response.json())
        .then(data => {
            alert('History remove success!');
        })
        .catch(err => {
            console.log(err);
            alert('History remove failed!');
        });
    }

    useEffect(() => {
        fetch('http://localhost:4000/api/user', {
            method: "GET"
        })
            .then(response => response.json())
            .then(data => {
                const users = data.data;
                fetch('http://localhost:4000/api/history', {
                    method: "GET"
                })
                    .then(response => response.json())
                    .then(data => {
                        const allHistories = [];
                        data.data.forEach((historyData, index) => {
                            const user = users.find(userData => userData.id === historyData.userID);
                            allHistories.push(
                                {
                                    _id: historyData._id,
                                    no: index + 1,
                                    name: user.name,
                                    nrc: user.nrc,
                                    phone: user.phone,
                                    address: user.address,
                                    checked_in: new Date(historyData.checkedIn_at).toLocaleString(),
                                    checked_out: historyData.checkedOut_at ? new Date(historyData.checkedOut_at).toLocaleString() : 'N/A'
                                }
                            )
                        });
                        setHistories(allHistories);
                        return data;
                    })
                    .catch(error => {
                        console.log(error);
                        return error;
                    });
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
                    <Typography variant='h5' color='primary'> Contact History </Typography>
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
                                            { column.label }
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    histories?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                                {
                                                    columns.map((column) => {
                                                        const value = row[column.id];
                                                        return (
                                                            <TableCell key={column.id} align={column.align}>
                                                                {   
                                                                    column.id === 'delete' ? 
                                                                    <IconButton key={row['_id']} onClick={() => handleDelete(row)}> <DeleteIcon /> </IconButton>:
                                                                    column.format && typeof value === 'number' ? column.format(value) : value
                                                                }
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
                        count={histories.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </Paper>
            </Box>
            <RegisterNewUser openDialog={openDialog} closeDialog={() => setOpenDialog(false)} />
        </div>
    )
}

export default History;

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
