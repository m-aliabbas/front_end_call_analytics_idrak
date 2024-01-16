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
import { useLocation, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
const https = "http://113.203.209.145:8011";

function NavItemWithoutChildren({ text, link, isActive, setActive, Icon }) {
  return (
    <ListItemButton
      key={link + text}
      onClick={() => setActive(link)}
      className={isActive ? "active" : ""}
    >
      <ListItemIcon className="justify-center">
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
        paddingRight: "25%",
      }}
      onClick={() => {
        setActive(link);
      }}
      className={isActive ? "active" : ""}
    >
      <ListItemIcon className="justify-center">
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
                  paddingRight: "23px",
                }}
              >
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    bgcolor: "var(--blackColor)",
                  }}
                />
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


  useEffect(() => {
    const fetchDispositionChildren = async () => {
      try {
       const response = await fetch(https + '/get_client');
const result = await response.json();
// console.log("API Response:", result);

  
        // Check if the response has the expected structure
        if (result?.data?.status && Array.isArray(result.data.data)) {
          let temp_data = result.data.data;
          let objectArray = temp_data.map(item => ({ 'link': 'dispana/'+item, 'text':item, }));
          setDispositionChildren(objectArray);
          console.log(typeof(dispositionChildren));
          console.log("Updated State:", dispositionChildren); // Log to check state update
        } else {
          console.error("Invalid API response structure for disposition children");
        }
      } catch (error) {
        console.error("Error fetching disposition children:", error);
      }
    };
  
    fetchDispositionChildren();
  }, []);
  
  useEffect(() => {
    console.log("Updated Disposition Children: ", dispositionChildren);
  }, [dispositionChildren]);
  

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
