import React from "react";
import { Link, NavLink } from "react-router-dom";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Notifications from "@material-ui/icons/Notifications";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import "../styles/Header.css";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import logo from "../assest/MedPro.png";
import { Badge, Button } from "@material-ui/core";
import { auth } from "../firebase";
import { useHistory } from "react-router";
function Header() {
  //   constructor() {
  //     super();
  //     this.state = {
  //       active: 1,
  //       anchorEl: null,
  //     };
  //   }
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const history = useHistory();
  console.log(window.location.origin);
  const activeStyle = {
    color: "#Fecb2a",
  };
  const handleSignout = () => {
    auth.signOut().then(() => {
      history.push("/sign");
    })
  }

  return (
    <div>
      <div className="header__top">
        <img className="header__topimg" src={logo} alt="Doctors" />
        <div className="header__topleft">
          <div className="header__toplist">
            <NavLink
              className="header__topitem"
              exact
              activeStyle={{ color: "rgb(19, 119, 254)" }}
              to="/"
            >
              DASHBOARD
            </NavLink>
            <NavLink
              className="header__topitem"
              activeStyle={{ color: "rgb(19, 119, 254)" }}
              to="/doctors"
            >
              PATIENTS
            </NavLink>
            <NavLink
              className="header__topitem"
              activeStyle={{ color: "rgb(19, 119, 254)" }}
              to="/appointment"
            >
              APPOINTMENTS
            </NavLink>
            <NavLink
              className="header__topitem"
              activeStyle={{ color: "rgb(19, 119, 254)" }}
              to="/calender"
            >
              CALENDER
            </NavLink>
            <NavLink
              className="header__topitem"
              activeStyle={{ color: "rgb(19, 119, 254)" }}
              to="/message"
            >
              MESSAGES
            </NavLink>
          </div>
        </div>
        <div className="header__topright">
          <Badge badgeContent={1} color="primary">
            <Notifications color="action" />
          </Badge>

          <Button
            id="basic-button"
            aria-controls="basic-menu"
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <div className="header__topprofile">
              <AccountCircleIcon />
              <ExpandMoreIcon />
            </div>
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}>{auth.currentUser ? auth.currentUser.email : "profile"}</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleSignout}>Logout</MenuItem>
          </Menu>
        </div>
      </div>
      <div className="header__bottom">
        <div className="header__bottomleft">
          <div>Hello,Welcome here,</div>
        </div>
        <div className="header__bottomright">
          REPORTS:
          <div className="header__bottomrightreport">
            1.04.2019 to 30.4.2019
            <ExpandMoreIcon />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
