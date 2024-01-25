import React, { useState, useEffect } from 'react';
import { Card,Box, CardContent, Typography, Grid } from '@material-ui/core';
import { Button, TextField } from "@mui/material";
import theme from "../../styles/theme";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';
import Papa from 'papaparse';
import "./BasicTable.scss";
   // live
   const https = "http://65.109.229.64:9000";
   // local
   // const https = "http://113.203.209.145:9000";
const ClientsPanel = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [clientName, setClientName] = useState("");
  const [clients, setClients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { links } = useParams();


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

    const apiUrl = (https + '/insert_client'); // Replace with your actual API URL

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


const fetchClients = async () => {
  try {
    const response = await fetch(https +'/get_client');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    if (data?.data?.status) {
      setClients(data.data.data);
      setLastUpdate(data.data.lastUpdate); // Update with a timestamp or unique identifier from the response
    } else {
      setError('No data found');
    }
  } catch (error) {
    setError(error.message);
  } finally {
    setIsLoading(false);
  }
};

useEffect(() => {
  fetchClients();
}, []);

useEffect(() => {
  const intervalId = setInterval(async () => {
    try {
      const response = await fetch(https +'/get_client');
      const updateData = await response.json();
      if (updateData.lastUpdate !== lastUpdate) {
        fetchClients();
      }
    } catch (error) {
      console.error('Error checking update:', error);
    }
  }, 1000); // Adjust the interval as needed

  return () => clearInterval(intervalId);
}, [lastUpdate]);
console.log("hit client api 1 sec",fetchClients);



  return (
    <Box className="px-6 py-8">
    
     <div className='heading_out' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' ,marginBottom:"6px" }}>
  <Typography  color={theme.palette.primary.main} className="headline-medium heading_log" marginBottom="6px">
    Clients
  </Typography>

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

      
      {isPopupOpen && <div className="overlay"></div>}
      
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
            <Button variant="outlined" fullWidth onClick={handleAddClient}>
              Add
            </Button>
            <Button variant="outlined" fullWidth onClick={closePopup}>
              Cancel
            </Button>
          </div>
        </div>
        
      )}
<ToastContainer />
      <div>
        {isLoading ? (
          <Typography>Loading...</Typography>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <Grid container spacing={2}>
            {clients.map((client, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={index}>
                <Card variant="outlined" style={{ border: '1px solid #E01E26', padding: 0 }}>
              <CardContent style={{ textAlign: "center", padding: 0 }}> {/* Remove padding here */}
                <a href={`http://${window.location.hostname}:${window.location.port}/dispana/${client}`}>
                  <Typography variant="h6" component="h2" >
                    {client}
                  </Typography>
                </a>
              </CardContent>
            </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </div>
    
    </Box>
  );
};

export default ClientsPanel;