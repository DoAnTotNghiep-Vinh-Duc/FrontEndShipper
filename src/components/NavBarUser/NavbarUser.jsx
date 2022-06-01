import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./NavBarUser.scss";

NavbarUser.propTypes = {};

function NavbarUser(props) {
  const location = useLocation();

  return (
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

        <Link
          className={`${"userInformation-navbar-menu-password"} ${
            location.pathname === "/changePassword" ? "active-password" : ""
          }`}
          to="/changePassword"
        >
          <i className="bi bi-key"></i>
          <p>Đổi mật khẩu</p>
        </Link>
      </div>
    </div>
  );
}

export default NavbarUser;
