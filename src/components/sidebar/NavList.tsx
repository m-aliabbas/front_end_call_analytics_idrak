import React, { useEffect } from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ChevronDown from "../icons/chevronDown";
import { useLocation, useNavigate } from "react-router-dom";
import LogoutIcon from "../icons/logout";
import SettingsIcon from "../icons/settings";
import { Box, Button, Typography } from "@mui/material";
import theme from "../../styles/theme";
import CloudIcon from "../icons/cloud";
import CommandCenterIcon from "../icons/commandCenter";
import ReportingIcon from "../icons/reporting";
import CampaignsIcon from "../icons/campaigns";
import CallIcon from '@mui/icons-material/Call';
import ArticleIcon from '@mui/icons-material/Article';
import AssessmentIcon from '@mui/icons-material/Assessment';
import TargetsIcon from "../icons/targets";
import PublishersIcon from "../icons/publishers";
import NumbersIcon from "../icons/numbers";
import BillingsIcon from "../icons/billings";

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
        // setOpen(!isOpen);
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
      {/* <ChevronDown color={isActive ? "#fff" : undefined} /> */}
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
        {links.map((link) => {
          return (
            <ListItemButton
              onClick={() => navigate(link.link)}
              key={link.link}
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

export default function NavList() {
  const [activeLink, setActiveLink] = React.useState("/");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setActiveLink(location.pathname);
  }, []);

  const handleItemClick = (link) => {
    setActiveLink(link);
    navigate(link);
  };

  const items = [
    // {
    //   text: "Home",
    //   link: "/",
    //   hasChildren: false,
    //   icon: CommandCenterIcon,
    // },


    {
      text: "Call Analytics",
      link: "/callanalytics",
      hasChildren: true,
      icon: CallIcon,
      childrenLinks: [
        { text: "Full Transcript", link: "/fulltranscript" },
        // { text: "Sequence", link: "/publishers-group" },
        // { text: "Splitted Transcript", link: "/splittedtranscript" },
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
      hasChildren: false,
      icon: ReportingIcon,
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
                  (e: any) =>
                    location.pathname == e.link ||
                    location.pathname.includes(e.link + "/")
                )
              }
              setActive={handleItemClick}
              isOpen={activeLink === item.link}
              Icon={item.icon && item.icon}
            />
            {(activeLink === item.link ||
              item.childrenLinks?.some(
                (e: any) =>
                  location.pathname == e.link ||
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
      <Box height="50px" />

      {/* <Box className="divider" /> */}
      {/* {itemsBottom.map((item) =>
        item.hasChildren ? (
          <React.Fragment key={item.link}>
            <NavItemWithCollapse
              text={item.text}
              link={item.link}
              isActive={
                activeLink === item.link ||
                item.childrenLinks?.some(
                  (e: any) => location.pathname == e.link
                )
              }
              setActive={handleItemClick}
              isOpen={activeLink === item.link}
              Icon={item.icon && item.icon}
            />
            {(activeLink === item.link ||
              item.childrenLinks?.some(
                (e: any) => location.pathname == e.link
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
      )} */}
      <Box height="500px" />
    </List>
  );
}
