import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'phone', headerName: 'Phone', width: 150 },
    { field: 'doj', headerName: 'Date of Joining', width: 110 }
]

const StudentList = () => {

    const [students, setStudents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getList = () => {
            fetch('http://localhost:5000/student', {
                method: 'GET'
            }).then(response => response.json()).then(response => {
                response = response.map(x => { return { ...x, id: x._id } })
                setStudents(response)
            })
        }
        getList();
    }, [students.length])

    const editStudent = (id) => {
        navigate(`/edit/${id}`);
    }

    return (
        <div style={{ height: 700, width: '100%' }}>
            <DataGrid
                rows={students}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                checkboxSelection
                disableSelectionOnClick
                onRowClick={(e) => editStudent(e.row.id)}
            />
        </div>
    )
}

export default StudentList;