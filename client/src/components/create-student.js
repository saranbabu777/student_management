import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

const CreateStudent = () => {

    const [student, setStudent] = useState({
        name: "",
        phone: "",
        doj: "",
        dob: ""
    })

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

    const insertStudent = () => {
        console.log('insertStudent called')
        const newStudent = { ...student };
        fetch('http://localhost:5000/student/add', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newStudent)
        }).then(response => {
            console.log(response)
        }).catch(err => {
            console.log(err)
        })

        setStudent({ name: "", phone: "", dob: "", doj: "" })
    }

    return (
        <div>
            <Card sx={{ minWidth: 275 }}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <CardContent>
                        <div>Enter student information</div>
                        <form>
                            <div>
                                <TextField label="name" variant="outlined" value={student.name} onChange={(event) => formChange({ name: event.target.value })} />
                            </div>
                            <div>
                                <TextField label="phone" variant="outlined" value={student.phone} onChange={(event) => formChange({ phone: event.target.value })} />
                            </div>
                            <div>
                                <DesktopDatePicker
                                    label="Date of Birth"
                                    inputFormat="dd/MM/yyyy"
                                    value={student.dob}
                                    onChange={(value) => formChange({ dob: value })}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </div>
                            <div>
                                <DesktopDatePicker
                                    label="Date Of Joining"
                                    inputFormat="dd/MM/yyyy"
                                    value={student.doj}
                                    onChange={(value) => formChange({ doj: value })}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </div>
                        </form>
                    </CardContent>
                    <CardActions>
                        <Button variant="contained" onClick={() => insertStudent()}>Create</Button>
                    </CardActions>
                </LocalizationProvider>
            </Card>
        </div>
    )
}

export default CreateStudent;