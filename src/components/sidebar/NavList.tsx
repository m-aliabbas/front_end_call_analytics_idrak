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
import './Sidebar.scss';

// Assuming your API URL is defined here
const https = "http://213.121.184.27:9000";

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
  onToggle,
}) {
  return (
    <ListItemButton
      sx={{ paddingRight: "10%" }}
      onClick={() => {
        setActive(link);
        onToggle && onToggle(); // Toggle only if onToggle is provided
      }}
      className={isActive ? "active" : ""}
    >
      <ListItemIcon className="justify-center">
        {Icon && <Icon color={isActive ? "#fff" : undefined} />}
      </ListItemIcon>
      <ListItemText primary={text} />
      <ChevronDown
        style={{
          transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
          transition: "transform 500ms",
        }}
        color={isActive ? "#fff" : undefined}
      />
    </ListItemButton>
  );
}

function SubMenu({ links, activeLink }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Collapse in={true} timeout="auto" unmountOnExit>
    <List component="div" disablePadding>
      {links.map((link, index) => (
        <ListItemButton
          key={index}
          onClick={() => navigate(link.link)}
          sx={{
            pl: 6,
            bgcolor: location.pathname === link.link ? "rgba(0, 0, 0, 0.04)" : "inherit", // Apply gray background if active
            '&:hover': {
              bgcolor: location.pathname === link.link ? "rgba(0, 0, 0, 0.04)" : "rgba(0, 0, 0, 0.08)", // Darken on hover
            }
          }}
        >
          <ListItemIcon>
            <ArrowRightIcon />
          </ListItemIcon>
          <ListItemText primary={link.text} />
        </ListItemButton>
      ))}
    </List>
  </Collapse>
  );
}

function NavList() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);
  const [dispositionChildren, setDispositionChildren] = useState([]);
  const [isDispositionOpen, setIsDispositionOpen] = useState(false); // Track open state for the disposition dropdown

  // Fetch Disposition Children
  useEffect(() => {
    const fetchDispositionChildren = async () => {
      try {
        const response = await fetch(`${https}/get_client`);
        const result = await response.json();
        if (result?.data?.status && Array.isArray(result.data.data)) {
          let tempData = result.data.data.map(item => ({ link: `/dispana/${item}`, text: item }));
          setDispositionChildren(tempData);
        } else {
          console.error("Invalid API response structure for disposition children");
        }
      } catch (error) {
        console.error("Error fetching disposition children:", error);
      }
    };

    fetchDispositionChildren();
  }, []); // Dependency array left empty to run only once at mount

  const handleItemClick = (link) => {
    setActiveLink(link);
    navigate(link);
  };

  const toggleDispositionOpen = () => setIsDispositionOpen(!isDispositionOpen);

  const items = [
    {
      text: "Call Analytics",
      link: "/callanalytics",
      hasChildren: true,
      icon: CallIco,
      childrenLinks: [{ text: "Full Transcript", link: "/fulltranscript" }],
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
      childrenLinks: dispositionChildren,
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
              isActive={activeLink.startsWith(item.link)}
              setActive={handleItemClick}
              isOpen={item.link === "/dispana" ? isDispositionOpen : activeLink.startsWith(item.link)}
              onToggle={item.link === "/dispana" ? toggleDispositionOpen : undefined}
              Icon={item.icon}
            />
            {(item.link === "/dispana" ? isDispositionOpen : activeLink.startsWith(item.link)) && (
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
            Icon={item.icon}
          />
        )
      )}
    </List>
  );
}

export default NavList;
