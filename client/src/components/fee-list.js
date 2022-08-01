import React, { useEffect, useState } from "react";
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'amount', headerName: 'Amount', width: 150 },
    { field: 'date', headerName: 'Date', width: 110 },
    { field: 'for', headerName: 'For', width: 110 },
    { field: 'month', headerName: 'Month', width: 110 },
    { field: 'year', headerName: 'Year', width: 110 }
]

const FeeList = () => {

    const [entireFees, setEntireFees] = useState([])
    useEffect(() => {
        const getStudents = () => {
            fetch('http://localhost:5000/student', {
                method: 'GET'
            }).then(response => response.json())
                .then(response => {
                    const flattenFees = response.reduce((prev, curr) => {
                        const fees = curr.fees;
                        return prev.concat(...fees.map((x, i) => { return { ...x, name: curr.name, id: curr._id + i, _id: curr._id } }))
                    }, [])
                    setEntireFees(flattenFees)
                })
        }
        getStudents();
    }, [])

    return (
        <div style={{ height: 700, width: '100%' }}>
            <DataGrid
                rows={entireFees}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                disableSelectionOnClick
            />
        </div>
    )
}

export default FeeList;