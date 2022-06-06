import Dialog from "@material-ui/core/Dialog";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import LogOut from "../../features/LogOut/LogOut";
import "./NavBarUser.scss";

NavbarUser.propTypes = {};

function NavbarUser(props) {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="userInformation-navbar">
        <div className="userInformation-navbar-logo">
          <Link to="/">
            <p>Lemon</p>
          </Link>
        </div>
        <div className="userInformation-navbar-menu">
          <Link
            className={`${"userInformation-navbar-menu-infor"} ${
              location.pathname === "/" ? "active-infor" : ""
            }`}
            to="/"
          >
            <i className="bi bi-person-lines-fill"></i>
            <p>Thông tin cá nhân</p>
          </Link>

          <Link
            className={`${"userInformation-navbar-menu-order"} ${
              location.pathname === "/myOrders" ? "active-order" : ""
            }`}
            to="/myOrders"
          >
            <i className="bi bi-journal-text"></i>
            <p>Đơn hàng của tôi</p>
          </Link>

          <div
            className={`${"userInformation-navbar-menu-password"}`}
            onClick={handleClickOpen}
          >
            <i className="bi bi-box-arrow-left"></i>
            <p>Đăng xuất</p>
          </div>
        </div>
      </div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <LogOut closeLogout={handleClose} />
      </Dialog>
    </>
  );
}

export default NavbarUser;
