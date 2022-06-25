import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { styled } from "@mui/material";
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';

const FormControl = styled('div')(
    ({ theme }) => `
    flex: 1;
  `,
);

const StyleForm = styled('form')(
    ({ theme }) => `
    display: flex;
    margin: 10px;
    justify-content:center;
    align-items:center;
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

const AddFees = () => {
    const [fees, setFees] = useState({
        date: "",
        amount: "",
        for: "",
        month: "",
        year: ""
    })

    const [student, setStudent] = useState({})

    const [studentList, setStudentList] = useState([])

    useEffect(() => {
        const getStudents = () => {
            fetch('http://localhost:5000/student', { method: 'GET' })
                .then(response => response.json())
                .then(response => {
                    setStudentList(response)
                })
        }
        getStudents();
    }, [])

    const selectStudent = (change) => {
        setStudent(change);
    }

    const updateFees = (change) => {
        setFees(prev => {
            return { ...prev, ...change }
        })
    }

    const updateStudent = () => {
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
            resetForm();
        })
    }

    const resetFees = () => {
        fetch(`http://localhost:5000/student/update/${student._id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...student, fees: [] })
        }).then(response => {
            resetForm();
        })
    }

    const resetForm = () => {
        setStudent({})
        setFees({
            date: "",
            amount: "",
            for: "",
            month: "",
            year: ""
        })
    }

    return (
        <React.Fragment>
            <Card sx={{ minWidth: 275 }}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Add Fees
                        </Typography>
                        <Autocomplete
                            disablePortal
                            onChange={(event, newValue) => {
                                selectStudent(newValue);
                            }}
                            getOptionLabel={option => option.name}
                            options={studentList}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Student" />}
                        />
                        <StyleForm>
                            <FormControl>
                                <DesktopDatePicker
                                    label="Date"
                                    inputFormat="dd/MM/yyyy"
                                    value={fees.date}
                                    onChange={(value) => updateFees({ date: value })}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </FormControl>
                            <FormControl>
                                <TextField label="Amount" variant="outlined" value={fees.amount} onChange={(event) => updateFees({ amount: event.target.value })} />
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
                        </StyleForm>
                    </CardContent>
                    <CardActions>
                        <Button variant="contained" onClick={() => updateStudent()}>Add</Button>
                        {/* <Button variant="contained" onClick={() => resetFees()}>Reset Fees</Button> */}
                    </CardActions>
                </LocalizationProvider>
            </Card>
        </React.Fragment>
    )
}

export default AddFees;