import React, { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import TablePagination from "@mui/material/TablePagination";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import "./BasicTable.scss";
import theme from "../../styles/theme";
import {
    Box,
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TablePagination,
    Chip
  } from "@mui/material";

export default function DispAna({
    className = "",
    blackBorder = false,
    alignLeft = false,
    outlineHeader = false,
    hideHeader = false,
}) {
    const [areaStates, setAreaStates] = useState([]);
    const [selectedStates, setSelectedStates] = useState([]);
    const [dispositionStates, setDispositionStates] = useState([]);
    const [selectedDisp, setSelectedDisp] = useState([]);
    const [allData, setAllData] = useState([]); // State for all data fetched
    const [displayData, setDisplayData] = useState([]); // Data to display (paginated)
    const [page, setPage] = useState(0); // Current page
    const [rowsPerPage, setRowsPerPage] = useState(10); // Rows per page
    const https = "http://localhost:8000";

    // Fetch area and disposition states
    useEffect(() => {
        // Fetch Area States
        fetch(https + '/get_area_states')
            .then(response => response.json())
            .then(data => setAreaStates(data.data.data))
            .catch(error => console.error('Error:', error));

        // Fetch Disposition States
        fetch(https + '/get_disposition_states')
            .then(response => response.json())
            .then(data => setDispositionStates(data.data.data))
            .catch(error => console.error('Error:', error));
    }, []);

    // Function to filter and paginate data
    const paginateData = (data) => {
        const startIndex = page * rowsPerPage;
        const paginatedData = data.slice(startIndex, startIndex + rowsPerPage);
        setDisplayData(paginatedData);
    };

    // Fetch table data
    useEffect(() => {
        fetch(https + '/get_dispositions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                area_states: selectedStates,
                dispositions: selectedDisp,
            }),
        })
            .then(response => response.json())
            .then(data => {
                setAllData(data.data.data); // Update based on your response structure
                paginateData(data.data.data);
            })
            .catch(error => console.error('Error fetching table data:', error));
    }, [selectedStates, selectedDisp]);

    // Update display data when page or rowsPerPage changes
    useEffect(() => {
        paginateData(allData);
    }, [page, rowsPerPage, allData]);

    return (
        <>
            {/* States Select */}
            {/* ... (rest of your JSX) */}

            {/* Table Start */}
            <TableContainer
                className={`${className} basic-table ${blackBorder ? "black-border" : ""} ${outlineHeader ? "outline-header" : ""}`}
                component={Paper}
        
                {/* ... */}
            >
                {/* ... */}
                <TableBody>
                    {displayData.map((row) => (
                        <TableRow key={row._id.$oid}>
                            <TableCell>{row.caller_id}</TableCell>
                            <TableCell>{row.disposition}</TableCell>
                            <TableCell>{row.area_state}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[5, 10, 20]}
                component="div"
                count={allData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={(event, newPage) => setPage(newPage)}
                onRowsPerPageChange={(event) => {
                    setRowsPerPage(parseInt(event.target.value, 10));
                    setPage(0); // Reset to first page
                }}
            />
        </>
    );
}
