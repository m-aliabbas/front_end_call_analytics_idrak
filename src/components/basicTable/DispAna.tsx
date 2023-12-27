import React, { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import { Box, Typography, Button } from "@mui/material";
import TextField from '@mui/material/TextField';
import TablePagination from "@mui/material/TablePagination";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import "./BasicTable.scss";
import theme from "../../styles/theme";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    const [allData, setAllData] = useState([]); // State for all fetched data
    const [tableData, setTableData] = useState([]); // State for currently displayed table data
    const [page, setPage] = useState(0); // Current page
    const [rowsPerPage, setRowsPerPage] = useState(30); // Rows per page
    const [totalCount, setTotalCount] = useState(0); // Total count of rows
    const [isAreaStateActive, setIsAreaStateActive] = useState(false);
    const [isDispositionActive, setIsDispositionActive] = useState(false);
    const https = "http://localhost:8000";

    // Fetch area and disposition states
    useEffect(() => {
        fetch(https + '/get_area_states')
            .then(response => response.json())
            .then(data => setAreaStates(data.data.data))
            .catch(error => console.error('Error:', error));

        fetch(https + '/get_disposition_states')
            .then(response => response.json())
            .then(data => setDispositionStates(data.data.data))
            .catch(error => console.error('Error:', error));
    }, []);

    // Fetch table data
    // const fetchTableData = () => {
    //     fetch(https + '/get_dispositions', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             area_states: selectedStates,
    //             dispositions: selectedDisp,
    //             area_exclude: isAreaStateActive,
    //             disp_exclude: isDispositionActive
    //         }),
    //     })
    //     .then(response => response.json())
    //     .then(data => {
    //         setAllData(data.data.data); // Store all fetched data
    //         setTotalCount(data.data.data.length); // Set total count
    //     })
    //     .catch(error => console.error('Error fetching table data:', error));
    // };

    // Trigger API call on select change or pagination change
    // useEffect(() => {
    //     fetchTableData();
    // }, [selectedStates, selectedDisp, isAreaStateActive, isDispositionActive]);
    const fetchTableData = () => {
        // Calculate start index based on current page and rows per page
        const startIndex = page * rowsPerPage + 1; // Assuming page starts at 0
    
        const url = new URL('http://localhost:8000/get_dispositions');
        url.searchParams.append('start_index', startIndex);
        url.searchParams.append('num_rows', rowsPerPage);
    
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                area_states: selectedStates,
                dispositions: selectedDisp,
                area_exclude: isAreaStateActive,
                disp_exclude: isDispositionActive
            }),
        })
        .then(response => response.json())
        .then(data => {
            setTableData(data.data.data); // Update table data with response
            setTotalCount(data.totalCount); // Update total count if provided in response
        })
        .catch(error => console.error('Error fetching table data:', error));
    };
    useEffect(() => {
        fetchTableData();
    }, [page, rowsPerPage, selectedStates, selectedDisp, isAreaStateActive, isDispositionActive]);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Reset to first page whenever rows per page changes
    };
    // Calculate display data for pagination
    // useEffect(() => {
    //     const startIndex = page * rowsPerPage;
    //     const endIndex = startIndex + rowsPerPage;
    //     const newDisplayData = allData.slice(startIndex, endIndex);
    //     setTableData(newDisplayData); // Set data to display for current page
    // }, [allData, page, rowsPerPage]); // Recalculate when these values change

    // Function to handle the API call for downloading dispositions
    const handleDownload = () => {
        fetch(https + '/get_download_dispositions_new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                area_states: selectedStates,
                dispositions: selectedDisp,
                area_exclude: isAreaStateActive,
                disp_exclude: isDispositionActive
            }),
        })
        .then(response => response.blob()) // Handle response as a blob
        .then(blob => {
            // Create a new URL for the blob
            toast.success("Download started!", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            const url = window.URL.createObjectURL(blob);
            const now = new Date();
            const dateTimeString = now.toISOString().replace(/[\-\:\.]/g, '').slice(0, 15); // Format: 'YYYYMMDDTHHMMSS'

            // Use the date-time string in the file name
            const fileName = `call_analytics_${dateTimeString}.csv`;
            // Create a link and set the URL as the href
            const a = document.createElement('a');
            a.href = url;
            
            a.download = fileName; // Set the file name for download
            document.body.appendChild(a);
            a.click();
            a.remove(); // Clean up
            window.URL.revokeObjectURL(url); // Release the URL
        })
        .catch(error => console.error('Error:', error));
    };

    const handleTagDownload = () => {
        fetch(https + '/get_download_dispositions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                area_states: selectedStates,
                dispositions: selectedDisp,
                area_exclude: isAreaStateActive,
                disp_exclude: isDispositionActive
            }),
        })
        .then(response => response.blob()) // Handle response as a blob
        .then(blob => {
            // Create a new URL for the blob
            toast.success("Tag Download started!", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            const url = window.URL.createObjectURL(blob);
            // Create a link and set the URL as the href
            const a = document.createElement('a');
            a.href = url;
            const now = new Date();
            const dateTimeString = now.toISOString().replace(/[\-\:\.]/g, '').slice(0, 15); // Format: 'YYYYMMDDTHHMMSS'

            // Use the date-time string in the file name
            const fileName = `tag_call_analytics_${dateTimeString}.csv`;
            a.download = fileName; // Set the file name for download
            document.body.appendChild(a);
            a.click();
            a.remove(); // Clean up
            window.URL.revokeObjectURL(url); // Release the URL
        })
        .catch(error => console.error('Error:', error));
    };
    

    return (
        <>
            <Box className="px-6 py-8">
                <Typography className="headline-medium heading_log" marginBottom="6px" color={theme.palette.primary.main}>
                    Filters
                </Typography>
                <div className="form-container mt-3">
                    <div>
                        <Typography className="heading_log" marginBottom="6px" fontSize="12pt" color={theme.palette.primary.main}>
                            Areas
                        </Typography>
                    </div>
                    <ToastContainer />
                    <Box sx={{ width: "100%", marginBottom: "14px" }}>
                        <Autocomplete
                            multiple
                            id="tags-outlined"
                            options={areaStates}
                            getOptionLabel={(option) => option}
                            filterSelectedOptions
                            value={selectedStates}
                            onChange={(event, newValue) => {
                                setSelectedStates(newValue);
                            }}
                            renderInput={(params) => (
                                <TextField {...params} label="Please Select Area(s)" placeholder="Areas" />
                            )}
                        />
                        <FormControlLabel 
                            control={<Switch checked={isAreaStateActive} onChange={(e) => setIsAreaStateActive(e.target.checked)} />}
                            label={isAreaStateActive ? "Include Selected State(s)" : "Exclude Selected Area(s)"}
                        />
                    </Box>
                    <div>
                        <Typography className="heading_log" marginBottom="6px" fontSize="12pt" color={theme.palette.primary.main}>
                            Dispositions
                        </Typography>
                    </div>
                    <div className='f'>
                    <Box sx={{ width: "100%" }}>
                        <Autocomplete
                            multiple
                            id="tags-outlined"
                            options={dispositionStates}
                            getOptionLabel={(option) => option}
                            filterSelectedOptions
                            value={selectedDisp}
                            onChange={(event, newValue) => {
                                setSelectedDisp(newValue);
                            }}
                            renderInput={(params) => (
                                <TextField {...params} label="Please Select Disposition(s)" placeholder="Disposition" />
                            )}
                        />
                        <FormControlLabel 
                            control={<Switch checked={isDispositionActive} onChange={(e) => setIsDispositionActive(e.target.checked)} />}
                            label={isDispositionActive ? "Include Selected Disposition(s)" : "Exclude Selected Disposition(s)"}
                        />
                    </Box>
                    </div>
                    <div className="f">

                  
                    <Button
                        type="button"
                        variant="outlined"
                        className="title-medium"
                        sx={{
                            width: "16%",
                            padding: "8.5px 16px",
                            textTransform: "none",
                            border: "1px solid #E01E26",
                            color: "#E01E26",
                            marginTop: "2%",
                            borderRadius: "5px",
                            "&:hover": {
                                color: "#fff",
                                backgroundColor: "var(--redColor)",
                                "& svg": {
                                    fill: "#fff",
                                },
                            },
                        }}
                        onClick={handleDownload}
                    >
                        Download
                    </Button>
                    </div>

                    <Button
                        type="button"
                        variant="outlined"
                        className="title-medium"
                        sx={{
                            width: "16%",
                            padding: "8.5px 16px",
                            textTransform: "none",
                            border: "1px solid #E01E26",
                            color: "#E01E26",
                            marginTop: "2%",
                            borderRadius: "5px",
                            "&:hover": {
                                color: "#fff",
                                backgroundColor: "var(--redColor)",
                                "& svg": {
                                    fill: "#fff",
                                },
                            },
                        }}
                        onClick={handleTagDownload}
                    >
                       Tag & Download
                    </Button>
                </div>
                <TableContainer
                    className={`${className} basic-table ${blackBorder ? "black-border" : ""} ${outlineHeader ? "outline-header" : ""}`}
                    component={Paper}
                >
                    <Box sx={{ display: "flex", justifyContent: "start", marginBottom: "10px", marginTop: "15px" }}>
                        <Typography className="headline-medium heading_log" marginBottom="6px" color={theme.palette.primary.main}>
                            Disposition
                        </Typography>
                    </Box>
                    <Table aria-label="simple table" sx={{ ...(hideHeader && { thead: { display: "none !important" } }) }}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Caller ID</TableCell>
                                <TableCell>Disposition</TableCell>
                                <TableCell>Area State</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tableData.map((row, index) => (
                                <TableRow key={row._id.$oid}>
                                    <TableCell>{row.caller_id}</TableCell>
                                    <TableCell>{row.disposition}</TableCell>
                                    <TableCell>{row.area_state}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    {/* <TablePagination
                        rowsPerPageOptions={[20, 50, 100, totalCount]}
                        component="div"
                        count={totalCount}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={(event, newPage) => setPage(newPage)}
                        onRowsPerPageChange={(event) => {
                            setRowsPerPage(parseInt(event.target.value, 10));
                            setPage(0); // Reset to first page
                        }}
                    /> */}

<TablePagination
    rowsPerPageOptions={[20, 50, 100]}
    component="div"
    count={-1}
    rowsPerPage={rowsPerPage}
    page={page}
    onPageChange={handleChangePage}
    onRowsPerPageChange={handleChangeRowsPerPage}
/>
                </TableContainer>
            </Box>
        </>
    );
}
