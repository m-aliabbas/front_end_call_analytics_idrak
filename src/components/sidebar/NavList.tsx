import React, { useState, useEffect } from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ChevronDown from "../icons/chevronDown";
import ReportingIcon from "@mui/icons-material/Dvr";
import ArticleIcon from '@mui/icons-material/Article';
import AssessmentIcon from '@mui/icons-material/Assessment';
import CallIco from '@mui/icons-material/Call';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useLocation, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import './Sidebar.scss'
const https = "http://113.203.209.145:8011";


function NavItemWithoutChildren({ text, link, isActive, setActive, Icon }) {
  return (
    <ListItemButton
      key={link + text}
      onClick={() => setActive(link)}
      className={isActive ? "active" : ""}
    >
      <ListItemIcon className="justify-center"  >
        {Icon && <Icon color={isActive ? "#fff" : undefined} />}
      </ListItemIcon>
      <ListItemText primary={text} />
    </ListItemButton>
  );
}

function NavItemWithCollapse({
  text,
  link,
  isActive,
  setActive,
  isOpen,
  Icon,
}) {
  return (
    <ListItemButton
      sx={{
        paddingRight: "10%",
      }}
      onClick={() => {
        setActive(link);
      }}
      className={isActive ? "active" : ""}
    >
      <ListItemIcon className="justify-center" >
        {Icon && <Icon color={isActive ? "#fff" : undefined} />}
      </ListItemIcon>
      <ListItemText primary={text} />
      {isActive ? (
        <ChevronDown
          style={{
            rotate: "180deg",
            transition: "rotate 500ms",
          }}
          color="#fff"
        />
      ) : (
        <ChevronDown
          style={{
            rotate: "0deg",
            transition: "rotate 500ms",
          }}
        />
      )}
    </ListItemButton>
  );
}

function SubMenu({ links, activeLink }) {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <Collapse in={true} timeout="auto" unmountOnExit>
      <List
        component="div"
        sx={{
          paddingY: "17px",
        }}
        disablePadding
      >
        {links.map((link,index) => {
          return (
            <ListItemButton
              onClick={() => navigate(link.link)}
             key={index}
              sx={{ pl: 6 }}
            >
              <ListItemIcon
                sx={{
                  minWidth: "unset",
                  paddingRight: "6px",
                }}
              >
              <ArrowRightIcon />

              </ListItemIcon>
              <ListItemText
                className="sub-menu"
                sx={{
                  span: {
                    fontWeight:
                      link.link === location.pathname ||
                        location.pathname.includes(link.link + "/")
                        ? "500 !important"
                        : "400 !important",
                  },
                }}
                primary={link.text}
              />
            </ListItemButton>
          );
        })}
      </List>
    </Collapse>
  );
}

function NavList() {
  const [activeLink, setActiveLink] = useState("/");
  const [dispositionChildren, setDispositionChildren] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);


  const handleItemClick = (link) => {
    setActiveLink(link);
    navigate(link);
  };

  const fetchDispositionChildren = async (lastUpdatedTimestamp) => {
    try {
      const response = await fetch(https + '/get_client');
      const result = await response.json();
      
      // Check if the API data has changed based on a timestamp or some other identifier
      if (result?.data?.status && Array.isArray(result.data.data)) {
        const newTimestamp = result.data.timestamp; // Replace with the actual timestamp from your API
  
        if (newTimestamp !== lastUpdatedTimestamp) {
          // If the timestamp has changed, update the state with the new data
          let temp_data = result.data.data;
          let objectArray = temp_data.map(item => ({ 'link': 'dispana/'+item, 'text': item }));
          setDispositionChildren(objectArray);
          setLastUpdatedTimestamp(newTimestamp);
        }
      } else {
        console.error("Invalid API response structure for disposition children");
      }
    } catch (error) {
      console.error("Error fetching disposition children:", error);
    }
  };
  
  // State variable to track the last updated timestamp
  const [lastUpdatedTimestamp, setLastUpdatedTimestamp] = useState(null);
  
  // State variable to store disposition children
  // const [dispositionChildren, setDispositionChildren] = useState([]);
  
  // Fetch data on component mount
  useEffect(() => {
    fetchDispositionChildren(lastUpdatedTimestamp);
  }, [lastUpdatedTimestamp]);
  
  useEffect(() => {
    console.log("Updated Disposition Children: ", dispositionChildren);
  }, [dispositionChildren]);
  
  // Cleanup interval on component unmount (if needed)
  useEffect(() => {
    return () => {
      // Clear any intervals or timeouts if necessary
    };
  }, []);
  
  
  // Cleanup interval on component unmount (if needed)
  useEffect(() => {
    return () => {
      // Clear any intervals or timeouts if necessary
    };
  }, []);
  
  // You can manually trigger a data refresh by setting dataFetchedOnce to false when you want to update the data
  // For example, after detecting that the API data has changed, you can call setDataFetchedOnce(false);
  


  const items = [
    {
      text: "Call Analytics",
      link: "/callanalytics",
      hasChildren: true,
      icon: CallIco,
      childrenLinks: [
        { text: "Full Transcript", link: "/fulltranscript" },
      ],
    },
    {
      text: "Log Analytics",
      link: "/loganalytics",
      hasChildren: false,
      icon: ArticleIcon,
    },
    {
      text: "Log Stats",
      link: "/logstats",
      hasChildren: false,
      icon: AssessmentIcon,
    },
    {
      text: "Disposition",
      link: "/dispana",
      hasChildren: dispositionChildren.length > 0,
      icon: ReportingIcon,
      childrenLinks: dispositionChildren, // dynamically add fetched children here
    },
  ];

  return (
    <List
      sx={{ width: "100%", bgcolor: "background.paper", marginTop: "15px" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      className="nav-list"
    >
      {items.map((item) =>
        item.hasChildren ? (
          <React.Fragment key={item.link}>
            <NavItemWithCollapse
              text={item.text}
              link={item.link}
              isActive={
                activeLink === item.link ||
                item.childrenLinks?.some(
                  (e) =>
                    location.pathname === e.link ||
                    location.pathname.includes(e.link + "/")
                )
              }
              setActive={handleItemClick}
              isOpen={activeLink === item.link}
              Icon={item.icon && item.icon}
            />
            {(activeLink === item.link ||
              item.childrenLinks?.some(
                (e) =>
                  location.pathname === e.link ||
                  location.pathname.includes(e.link + "/")
              )) && (
              <SubMenu links={item.childrenLinks} activeLink={activeLink} />
            )}
          </React.Fragment>
        ) : (
          <NavItemWithoutChildren
            key={item.text}
            text={item.text}
            link={item.link}
            isActive={activeLink === item.link}
            setActive={handleItemClick}
            Icon={item.icon && item.icon}
          />
        )
      )}
    </List>
  );
}

export default NavList;
