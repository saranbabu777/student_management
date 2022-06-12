import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import { styled } from "@mui/material";

const FilterBar = styled('div')(
    ({ theme }) => `
    margin: 20px;
  `,
);

const columns = [
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'phone', headerName: 'Phone', width: 150 },
    { field: 'doj', headerName: 'Date of Joining', width: 110 }
]

const StudentList = () => {

    const [students, setStudents] = useState([]);
    const [rows, setRows] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getList = () => {
            fetch('http://localhost:5000/student', {
                method: 'GET'
            }).then(response => response.json()).then(response => {
                response = response.map(x => { return { ...x, id: x._id } })
                setStudents(response)
                setRows(response)
            })
        }
        getList();
    }, [])

    const editStudent = (id) => {
        navigate(`/edit/${id}`);
    }

    const filterChange = (searchString) => {
        const allStudents = [...students];
        const filteredRows = allStudents.filter(s => {
            return s.name.startsWith(searchString)
        })
        setRows(filteredRows)
    }

    return (
        <div style={{ height: 700, width: '100%' }}>
            <FilterBar>
                <TextField label="Search" variant="outlined" onChange={(event) => filterChange(event.target.value)} />
            </FilterBar>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                disableSelectionOnClick
                onRowClick={(e) => editStudent(e.row.id)}
            />
        </div>
    )
}

export default StudentList;