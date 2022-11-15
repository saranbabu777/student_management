import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Autocomplete from '@mui/material/Autocomplete';
import { styled } from "@mui/material";

const FilterBar = styled('div')(
    ({ theme }) => `
    margin: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: #ccc 1px solid;
    padding-bottom: 15px;
  `,
);

const columns = [
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'phone', headerName: 'Phone', width: 150 },
    { field: 'doj', headerName: 'Date of Joining', width: 110 },
    { field: 'active', headerName: 'Active', width: 110 },
    { field: 'paidMonths', headerName: 'Paid Months', width: 700 },
]

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


const StudentList = () => {

    const [students, setStudents] = useState([]);
    const [filter, setFilter] = useState({
        paid: false,
        month: '',
        q: ''
    })
    const navigate = useNavigate();

    useEffect(() => {
        getList();
    }, [])

    const getList = () => {
        fetch('http://localhost:5000/student', {
            method: 'GET'
        }).then(response => response.json()).then(response => {
            response = response.map(x => {
                return {
                    ...x, id: x._id,
                    active: x.active ? 'Active' : 'Inactive',
                    paidMonths: x.fees.map(y => y.month + ' ' + y.year).join(', ')
                }
            })
            setStudents(response);
        })
    }

    const editStudent = (id) => {
        navigate(`/edit/${id}`);
    }

    const handleFilter = (filter) => {
        setFilter((prev) => ({ ...prev, ...filter }))
    }

    const YEAR = '2022';

    const showRows = [...students].filter(({ name, fees }) => {
        let showItem = true;
        if (filter.q) {
            showItem = name.toLowerCase().startsWith(filter.q.toLowerCase());
        }
        if (filter.month) {
            const paid = fees.filter(x => (x.month === filter.month && x.year == YEAR)).length > 0;
            showItem = showItem && ((filter.paid) ? paid : !paid);
        }
        return showItem;
    });

    return (
        <div style={{ height: 700, width: '100%' }}>
            <FilterBar>
                <TextField label="Search" variant="outlined" onChange={(event) => handleFilter({ q: event.target.value })} />
                <div>
                    <Select
                        labelId="paid-fees-label"
                        id="paid-fees"
                        value={filter.paid}
                        label="Fees"
                        onChange={(event) => handleFilter({ paid: event.target.value })}
                    >
                        <MenuItem value={true}>Paid</MenuItem>
                        <MenuItem value={false}>Has not paid</MenuItem>
                    </Select>
                </div>
                <div>
                    <Autocomplete
                        disablePortal
                        onChange={(event, newValue) => {
                            handleFilter({ month: newValue ? newValue.value : `` });
                        }}
                        options={monthList}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Month" />}
                    />
                </div>
            </FilterBar>
            <DataGrid
                rows={showRows}
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