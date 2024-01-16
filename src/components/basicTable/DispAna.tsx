import React, { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import { Box, Typography, Button, TextField } from "@mui/material";
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
import { useParams } from 'react-router-dom';
import Papa from 'papaparse'; // Import PapaParse for CSV parsing
import { Select, MenuItem, InputLabel, FormControl, Chip, OutlinedInput } from '@mui/material';

export default function DispAna({
    className = "",
    blackBorder = false,
    alignLeft = false,
    outlineHeader = false,
    hideHeader = false,
}) {

    const [isDownloadOpen, setIsDownloadOpen] = useState(false);
    const [numberOfChunks, setNumberOfChunks] = useState("");
    const [numberOfIds, setNumberOfIds] = useState("");

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [clientName, setClientName] = useState("");
    const [clientStates, setClientStates] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [campaignStates, setCampaignStates] = useState([]);
    const [selectedCampaign, setSelectedCampaign] = useState([]);
    const [open, setOpen] = useState(false);
    // const [clientInfo, setClientInfo] = useState("");
    const [areaStates, setAreaStates] = useState([]);
    const [selectedStates, setSelectedStates] = useState([]);
    const [dispositionStates, setDispositionStates] = useState([]);
    const [selectedDisp, setSelectedDisp] = useState([]);
    const [allData, setAllData] = useState([]); // State for all fetched data
    const [tableData, setTableData] = useState([]); // State for currently displayed table data
    const [page, setPage] = useState(0); // Current page
    const [rowsPerPage, setRowsPerPage] = useState(20); // Rows per page
    const [totalCount, setTotalCount] = useState(0); // Total count of rows
    const [isAreaStateActive, setIsAreaStateActive] = useState(false);
    const [isDispositionActive, setIsDispositionActive] = useState(false);
    const https = "http://113.203.209.145:8011";
    const [menuOpen, setMenuOpen] = useState(false);
    const [areaMenuOpen, setAreaMenuOpen] = useState(false);


    const [uploadedCSV, setUploadedCSV] = useState(null);
    const { links } = useParams();
    const handleChange = (event) => {
        setSelectedDisp(event.target.value);
    };

    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: 48 * 4.5 + 8,
                width: 250,
            },
        },
    };



    const openDownloadPop = () => {
        setIsDownloadOpen(true);
    };
    
    const closeDownloadPop = () => {
        setIsDownloadOpen(false);
        setClientName("");
        // setClientInfo("");
    };
    // console.log('Type',typeof(med))
 


    const handleFileUpload = (event) => {
        const file = event.target.files[0];

        if (file) {
            Papa.parse(file, {
                complete: (result) => {
                    console.log("CSV Data:", result.data);
                    const areasFromCSV = result.data
                        .map(entry => entry[0]) // Assuming the area data is in the first column
                        .filter(area => typeof area === 'string' && area.trim() !== '');

                    console.log("Areas from CSV:", areasFromCSV);

                    // Update both areaStates and selectedStates
                    setAreaStates(areasFromCSV.length > 0 ? areasFromCSV : []);
                    setSelectedStates(areasFromCSV); // Update selected states with areas from CSV

                    toast.success("CSV file uploaded successfully!", {
                        // ... (toast options)
                    });
                },
                header: false,
                skipEmptyLines: true,
            });
        } else {
            toast.error("Please upload a file.", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    // Fetch area and disposition states
    useEffect(() => {
        // fetch(https + '/get_client')
        //     .then(response => response.json())
        //     .then(data => setClientStates(data.data.data))
        //     .catch(error => console.error('Error:', error));
        let data_to_send = {client_name:links}
        fetch(https + '/get_file_client', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data_to_send),
          })
            .then(response => response.json())
            .then(data => setClientStates(data.data.data))
            .catch(error => console.error('Error:', error));

            console.log('After post ap',clientStates)

        fetch(https + '/get_area_states')
            .then(response => response.json())
            .then(data => setAreaStates(data.data.data))
            .catch(error => console.error('Error:', error));

        fetch(https + '/get_campaign')
            .then(response => response.json())
            .then(data => setCampaignStates(data.data.data))
            .catch(error => console.error('Error:', error));
        campaignStates
        fetch(https + '/get_disposition_states')
            .then(response => response.json())
            .then(data => setDispositionStates(data.data.data))
            .catch(error => console.error('Error:', error));
    }, []);

    const fetchTableData = () => {
        // Calculate start index based on current page and rows per page
        const startIndex = page * rowsPerPage + 1; // Assuming page starts at 0

        const url = new URL(https + '/get_dispositions');
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
                disp_exclude: isDispositionActive,
                // med_name: selectedCampaign
                med_name: selectedCampaign
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
    }, [page, rowsPerPage, selectedStates, selectedDisp, isAreaStateActive, isDispositionActive,selectedCampaign,]);
    console.log( "disp_name"+ selectedDisp)
    console.log( "campaign_name"+ selectedCampaign)

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Reset to the first page whenever rows per page changes
    };

    const openPopup = () => {
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
        setClientName("");
        // setClientInfo("");
    };
    // console.log('Type',typeof(med))

    const handleAddClient = () => {
        if (clientName.trim() === "") {
            toast.error("Please enter a client name.");
            return;
        }

        const apiUrl = "http://113.203.209.145:8011/insert_client"; // Replace with your actual API URL

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ client_name: clientName }), // Send the client name in the request body
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log("Client added:", data);
                toast.success("Client added successfully!");

                closePopup(); // Close the popup after successful addition
                setClientName(""); // Reset client name
            })
            .catch(error => {
                console.error('Error adding client:', error);
                toast.error("Error adding client. Please try again.");
            });
    };

    function getCurrentDateTime() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
      
        return `${year}${month}${day}_${hours}${minutes}${seconds}`;
      }

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
                disp_exclude: isDispositionActive,
                med_name: selectedCampaign
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
                const dateTimeString = getCurrentDateTime();

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
                disp_exclude: isDispositionActive,
                med_name: selectedCampaign,
                client_name: links
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
                // console.log('fileName',a)
                const now = new Date();
                const dateTimeString = now.toISOString().replace(/[\-\:\.]/g, '').slice(0, 15); // Format: 'YYYYMMDDTHHMMSS'

                // Use the date-time string in the file name
                const fileName = `${links}__${dateTimeString}.csv`;
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
            <div className='heading_out' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
  <Typography className="headline-medium heading_log" marginBottom="6px" color={theme.palette.primary.main}>
    {links}
  </Typography>
  
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <Button
      type="button"
      variant="outlined"
      className="title-medium"
      sx={{
        width: "160px",
        padding: "8.5px 16px",
        textTransform: "none",
        border: "1px solid #E01E26",
        color: "#E01E26",
        borderRadius: "5px",
        "&:hover": {
          color: "#fff",
          backgroundColor: "var(--redColor)",
          "& svg": {
            fill: "#fff",
          },
        },
      }}
      onClick={openPopup}
    >
      Add Client
    </Button>
  </div>
</div>


                {/* Overlay */}
                {isPopupOpen && <div className="overlay"></div>}

                {/* Popup */}
                {isPopupOpen && (
                    <div className="popup">
                        <div className="popup-content">
                            <Typography variant="h6">Add Client</Typography>
                            <TextField
                                sx={{ marginBottom: "10px", marginTop: "12px" }}
                                label="Client Name"
                                variant="outlined"
                                fullWidth
                                value={clientName}
                                onChange={(e) => setClientName(e.target.value)}
                            />
                            {/* <TextField
                                sx={{ marginBottom: "14px" }}
                                label="Client Info"
                                variant="outlined"
                                fullWidth
                                value={clientInfo}
                                onChange={(e) => setClientInfo(e.target.value)}
                            /> */}
                            <Button variant="outlined" fullWidth onClick={handleAddClient}>
                                Add
                            </Button>
                            <Button variant="outlined" fullWidth onClick={closePopup}>
                                Cancel
                            </Button>
                        </div>
                    </div>
                )}

                <div className="form-container mt-3">
                    <div className='filters_divs'>

                        <div className='filters_div'>
                            {/* left side */}
                            <div className='leftside_div'>
                                <div>
                                    <Typography className="heading_log" marginBottom="6px" fontSize="12pt" color={theme.palette.primary.main}>
                                        Files
                                    </Typography>
                                </div>
                                <ToastContainer />


                                <Box sx={{ width: "100%", marginBottom: "14px" }}>
                                    <Autocomplete
                                        multiple
                                        freeSolo
                                        id="tags-outlined"
                                        options={clientStates}
                                        getOptionLabel={(option) => option}
                                        filterSelectedOptions
                                        value={selectedFiles}
                                        onChange={(event, newValue) => {
                                            setSelectedFiles(newValue);
                                        }}
                                        renderInput={(params) => (
                                            <TextField {...params} label="Please Select File(s)" placeholder="Files" />
                                        )}
                                    />
                                </Box>

                                <div>
                                    <Typography className="heading_log" marginBottom="6px" fontSize="12pt" color={theme.palette.primary.main}>
                                        Areas
                                    </Typography>
                                </div>
                                <ToastContainer />


                                <Box sx={{ width: "100%", marginBottom: "14px", maxHeight: "100px", overflow: "scrollbar" }}>
                                    <Autocomplete
                                        multiple
                                        freeSolo // Allows free text input
                                        id="tags-outlined"
                                        options={areaStates}
                                        getOptionLabel={(option) => option}
                                        filterSelectedOptions
                                        value={selectedStates}
                                        onChange={(event, newValue) => {
                                            // Handle both existing options and new entries
                                            if (typeof newValue === 'string') {
                                                setSelectedStates([...selectedStates, newValue]);
                                            } else if (Array.isArray(newValue)) {
                                                setSelectedStates(newValue);
                                            } else if (newValue === null) {
                                                // Clear the selected options when clicking the close button
                                                setSelectedStates([]);
                                            }
                                        }}
                                        open={areaMenuOpen}
                                        onBlur={() => setAreaMenuOpen(false)}
                                        onClose={() => setAreaMenuOpen(true)} // Close the dropdown
                                        onOpen={() => setAreaMenuOpen(true)} 
                                        renderInput={(params) => (
                                            <TextField {...params} label="Please Select Area(s)" placeholder="Areas" 
                                            onClick={(event) => {
                                                event.stopPropagation();
                                                setAreaMenuOpen(true);
                                            }}
                                            />
                                        )}
                                        clearOnBlur={false} // Set this prop to false
                                        disableCloseOnSelect={false} // Set this prop to false
                                    />


                                    <div className='scv_button'>
                                        <FormControlLabel
                                            className='lable'
                                            control={<Switch checked={isAreaStateActive} onChange={(e) => setIsAreaStateActive(e.target.checked)} />}
                                            label={isAreaStateActive ? "Include Selected Area(s)" : "Exclude Selected Area(s)"}
                                        />

                                        <div className="file-upload-container">
                                            <input
                                                type="file"
                                                accept=".csv"
                                                onChange={handleFileUpload}
                                                style={{ display: 'none' }}
                                                id="file-input"
                                            />
                                            <label htmlFor="file-input">
                                                <Button

                                                    variant="outlined"
                                                    className="title-medium"
                                                    sx={{
                                                        marginBottom: "6px",
                                                        width: "160px",
                                                        // padding: "8.5px 16px",
                                                        textTransform: "none",
                                                        border: "1px solid #E01E26",
                                                        color: "#E01E26",
                                                        // marginLeft: "80%",
                                                        borderRadius: "5px",
                                                        "&:hover": {
                                                            color: "#fff",
                                                            backgroundColor: "var(--redColor)",
                                                            "& svg": {
                                                                fill: "#fff",
                                                            },
                                                        },
                                                    }}
                                                    component="span"
                                                >
                                                    Upload CSV
                                                </Button>
                                            </label>
                                        </div>
                                    </div>

                                </Box>
                            </div>

                            {/* right side */}
                            <div className='leftside_div'>
                                <div>
                                    <Typography className="heading_log" marginBottom="6px" fontSize="12pt" color={theme.palette.primary.main}>
                                        Campaigns
                                    </Typography>
                                </div>
                                <ToastContainer />
                                <Box sx={{ width: "100%", marginBottom: "14px" }}>
                                    <Autocomplete
                                        multiple
                                        freeSolo
                                        id="tags-outlined"
                                        options={campaignStates}
                                        getOptionLabel={(option) => option}
                                        filterSelectedOptions
                                        value={selectedCampaign}
                                        onChange={(event, newValue) => {
                                            setSelectedCampaign(newValue);
                                        }}
                                        renderInput={(params) => (
                                            <TextField {...params} label="Please Select Campaign(s)" placeholder="Campaigns" />
                                        )}
                                    />                                </Box>
                                <div>
                                    <Typography className="heading_log" marginBottom="6px" fontSize="12pt" color={theme.palette.primary.main}>
                                        Dispositions
                                    </Typography>
                                </div>

                                <div className='f'>
                                    <Box sx={{ width: "100%" }}>
                                        <Autocomplete
                                            multiple
                                            freeSolo
                                            id="tags-outlined"
                                            options={dispositionStates}
                                            getOptionLabel={(option) => option}
                                            filterSelectedOptions
                                            value={selectedDisp}
                                            onChange={(event, newValue) => {
                                                setSelectedDisp(newValue);
                                            }}
                                            open={menuOpen}
                                            onBlur={() => setMenuOpen(false)}
                                            onClose={() => setMenuOpen(true)} // Close the dropdown
                                            onOpen={() => setMenuOpen(true)}  // Open the dropdown
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label="Please Select Disposition(s)"
                                                    placeholder="Disposition"
                                                    // Handle clicking outside the text field to keep the dropdown open
                                                    onClick={(event) => {
                                                        event.stopPropagation();
                                                        setMenuOpen(true);
                                                    }}
                                                />
                                            )}
                                        />
                                        <FormControlLabel
                                            control={<Switch checked={isDispositionActive} onChange={(e) => setIsDispositionActive(e.target.checked)} />}
                                            label={isDispositionActive ? "Include Selected Disposition(s)" : "Exclude Selected Disposition(s)"}
                                        />
                                    </Box>
                                </div>
                            </div>
                        </div>

                        <div className='button_out_div'>
                            <div className="f">
                                <Button
                                    type="button"
                                    variant="outlined"
                                    className="title-medium"
                                    sx={{
                                        marginBottom: "6px",
                                        width: "100%",
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
                                    width: "100%",
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
                                Add File & Download
                            </Button>

                            <Button
                                type="button"
                                variant="outlined"
                                className="title-medium"
                                sx={{
                                    width: "100%",
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
                                onClick={openDownloadPop}
                             
                            >
                       Download Chunks
                            </Button>

{/* Overlay */}
{isDownloadOpen && <div className="overlay"></div>}

{/* Popup */}
{isDownloadOpen && (
    <div className="popup">
        <div className="popup-content">
            <Typography  sx={{ marginTop: "12px" }} variant="h6">No of Chunks</Typography>
            <TextField
                sx={{ marginBottom: "10px" }}
                label="No of Chunks"
                variant="outlined"
                fullWidth
                value={numberOfChunks}
                onChange={(e) => setNumberOfChunks(e.target.value)}
            />
             <Typography variant="h6">No of IDs</Typography>
            <TextField
                sx={{ marginBottom: "14px" }}
                label="No of IDs"
                variant="outlined"
                fullWidth
                value={numberOfIds}
                onChange={(e) => setNumberOfIds(e.target.value)}
            />
            <Button variant="outlined" fullWidth >
            Add File & Download
            </Button>
            <Button variant="outlined" fullWidth onClick={closeDownloadPop}>
                Cancel
            </Button>
        </div>
    </div>
)}



                        </div>
                    </div>
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
                    <TablePagination
                        rowsPerPageOptions={[20, 50, 100]}
                        component="div"
                        count={totalCount}
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
