import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { styled } from "@mui/material";
import Autocomplete from '@mui/material/Autocomplete';
import { useNavigate } from 'react-router-dom';
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const StyleForm = styled('form')(
    ({ theme }) => `
    display: flex;
    margin: 10px;
    justify-content:center;
    align-items:center;
  `,
);
const FormControl = styled('div')(
    ({ theme }) => `
    flex: 1;
  `,
);
const StyleTable = styled('div')(
    ({ theme }) => `
    margin: 20px;
  `,
);

const typeList = [
    { label: `Registration Fees`, value: `registration_fees` },
    { label: `Monthly Fees`, value: `monthly_fees` }
]
const yearList = [`2021`, `2022`, `2023`]
const monthList = [
    { label: `January`, value: `jan` },
    { label: `February`, value: `feb` },
    { label: `March`, value: `mar` },
    { label: `April`, value: `apr` },
    { label: `May`, value: `may` },
    { label: `June`, value: `jun` },
    { label: `July`, value: `jul` },
    { label: `August`, value: `aug` },
    { label: `September`, value: `sep` },
    { label: `October`, value: `oct` },
    { label: `November`, value: `nov` },
    { label: `December`, value: `dec` },
]

const EditStudent = () => {
    const [fees, setFees] = useState({
        amount: "",
        for: "",
        month: "",
        year: ""
    })
    const [student, setStudent] = useState("");
    const [newFeesForm, setNewFeesForm] = useState(false);
    const [editStudentForm, setEditStudentForm] = useState(false);

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const id = params.id.toString();
        fetch(`http://localhost:5000/student/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        }).then(response => response.json())
            .then(response => {
                setStudent((prev) => {
                    return response;
                });
            })

    }, [])

    const updateFees = (change) => {
        setFees((prevValue) => {
            return { ...prevValue, ...change }
        })
    }

    const saveFees = () => {
        const newFees = { ...fees }
        const studentFees = student.fees ? student.fees : [];
        studentFees.push(newFees);
        fetch(`http://localhost:5000/student/update/${student._id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...student, fees: studentFees })
        }).then(response => {
            setStudent(prevValue => {
                return { ...prevValue, fees: studentFees }
            })
            setNewFeesForm(false)
        })
    }

    const updateStudent = (updatedFeilds) => {
        fetch(`http://localhost:5000/student/update/${student._id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...student, ...updatedFeilds })
        }).then(response => {
            setStudent(prevValue => {
                return { ...prevValue, ...updatedFeilds }
            })
        })
    }

    const editStudent = () => {
        setEditStudentForm(prevValue => {
            return !prevValue;
        });
    }

    const formChange = (change) => {
        if (change.dob) {
            const yr = change.dob.getFullYear();
            const mn = change.dob.getMonth() + 1;
            const dy = change.dob.getDate();
            change.dob = `${yr}-${mn}-${dy}`;
        }
        if (change.doj) {
            const yr = change.doj.getFullYear();
            const mn = change.doj.getMonth() + 1;
            const dy = change.doj.getDate();
            change.doj = `${yr}-${mn}-${dy}`;
        }
        setStudent((prevState) => {
            return { ...prevState, ...change }
        })
    }

    const deleteStudent = () => {
        fetch(`http://localhost:5000/student/delete/${student._id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        }).then(response => {
            navigate(`/`);
        })
    }

    return (
        <div>
            <div>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Card sx={{ minWidth: 275 }}>
                        {!editStudentForm ?
                            <CardContent>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    Name: {student.name}
                                </Typography>
                                <Typography x={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    Phone: {student.phone}
                                </Typography>
                                <Typography x={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    DOB: {student.dob}
                                </Typography>
                                <Typography x={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    DOJ: {student.doj}
                                </Typography>
                            </CardContent>
                            :
                            <CardContent>
                                <form>
                                    <FormControl>
                                        <TextField label="Name" variant="outlined" value={student.name} onChange={(event) => formChange({ name: event.target.value })} />
                                    </FormControl>
                                    <FormControl>
                                        <TextField label="Phone" variant="outlined" value={student.phone} onChange={(event) => formChange({ phone: event.target.value })} />
                                    </FormControl>
                                    <FormControl>
                                        <DesktopDatePicker
                                            label="Date of Birth"
                                            inputFormat="dd/MM/yyyy"
                                            value={student.dob}
                                            onChange={(value) => formChange({ dob: value })}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <DesktopDatePicker
                                            label="Date Of Joining"
                                            inputFormat="dd/MM/yyyy"
                                            value={student.doj}
                                            onChange={(value) => formChange({ doj: value })}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </FormControl>
                                </form>
                            </CardContent>
                        }
                        <CardActions>
                            {editStudentForm ?
                                <Button size="small" onClick={() => updateStudent({})}>Save Changes</Button>
                                : null}
                            <Button size="small" onClick={() => editStudent()}>Edit</Button>
                            <Button size="small" onClick={() => deleteStudent()}>Delete</Button>
                            <Button size="small" onClick={() => updateStudent({ active: true })}>Activate</Button>
                            <Button size="small" onClick={() => updateStudent({ active: false })}>Deactivate</Button>
                        </CardActions>
                    </Card>
                </LocalizationProvider>
            </div>
            <StyleTable>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">Amount</TableCell>
                                <TableCell align="right">For</TableCell>
                                <TableCell align="right">Month</TableCell>
                                <TableCell align="right">Year</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {student.fees?.map((row, i) => (
                                <TableRow
                                    key={i}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="right">{row.amount}</TableCell>
                                    <TableCell align="right">{row.for}</TableCell>
                                    <TableCell align="right">{row.month}</TableCell>
                                    <TableCell align="right">{row.year}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Button size="small" onClick={() => setNewFeesForm(true)}>Add Item</Button>
            </StyleTable>
            {newFeesForm ?
                <StyleForm>
                    <FormControl>
                        <TextField label="Amount" variant="outlined" onChange={(event) => updateFees({ amount: event.target.value })} />
                    </FormControl>
                    <FormControl>
                        <Autocomplete
                            disablePortal
                            onChange={(event, newValue) => {
                                updateFees({ for: newValue ? newValue.value : `` });
                            }}
                            options={typeList}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="For" />}
                        />
                    </FormControl>
                    <FormControl>
                        <Autocomplete
                            disablePortal
                            onChange={(event, newValue) => {
                                updateFees({ month: newValue ? newValue.value : `` });
                            }}
                            options={monthList}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Month" />}
                        />
                    </FormControl>
                    <FormControl>
                        <Autocomplete
                            disablePortal
                            onChange={(event, newValue) => {
                                updateFees({ year: newValue });
                            }}
                            options={yearList}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Year" />}
                        />
                    </FormControl>
                    <Button variant="contained" onClick={() => saveFees()}>Save</Button>
                </StyleForm>
                : null}
        </div>
    )
}

export default EditStudent;