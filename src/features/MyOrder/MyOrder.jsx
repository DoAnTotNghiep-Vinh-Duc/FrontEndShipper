import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import NavbarUser from "../../components/NavBarUser/NavbarUser";
import "./MyOrder.scss";
import a from "../../assest/iconshipper.png";

MyOrder.propTypes = {};

function MyOrder(props) {
  const [value, setValue] = useState("HANDLING");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="myOrder">
      <NavbarUser />
      <div className="myOrder-container">
        <div className="myOrder-title">
          <div className="myOrder-title-left">
            <p>Đơn hàng của tôi</p>
          </div>
          <div className="myOrder-title-right">
            <Link className="myOrder-title-right-home" to="/">
              Trang chủ
            </Link>
            <i className="bi bi-chevron-right"></i>
            <p className="myOrder-title-right-order">Đơn hàng</p>
          </div>
        </div>
        <div className="myOrder-search">
          <input type="text" placeholder="Nhập mã đơn hàng..." />
          <div className="myOrder-search-icon">
            <i className="bi bi-search"></i>
          </div>
        </div>

        <div className="myOrder-listOrder-title">
          <Tabs
            value={value}
            indicatorColor="primary"
            textColor="primary"
            onChange={handleChange}
            aria-label="disabled tabs example"
          >
            <Tab
              value="HANDLING"
              label="chờ xử lí"
              style={{ minWidth: "20%", fontSize: "12px" }}
            />
            <Tab
              value="DELIVERING"
              label="đang vận chuyển"
              style={{ minWidth: "20%", fontSize: "12px" }}
            />
            <Tab
              value="DONE"
              label="đã giao"
              style={{ minWidth: "20%", fontSize: "12px" }}
            />
            <Tab
              value="CANCELED"
              label="đã hủy"
              style={{ minWidth: "20%", fontSize: "12px" }}
            />
            <Tab
              value="ALL"
              label="tất cả"
              style={{ minWidth: "20%", fontSize: "12px" }}
            />
          </Tabs>
        </div>
        <div className="myOrder-listOrder-title-list">
          <div className="myOrder-listOrder-title-list-order">
            <div className="myOrder-listOrder-title-list-order-header">
              <div className="myOrder-listOrder-title-list-order-header-id">
                <p>
                  Mã hóa đơn: <b>1234334r4r</b>
                </p>
              </div>
              <div className="myOrder-listOrder-title-list-order-header-status">
                <div
                  className={`${"myOrder-listOrder-title-list-order-header-status-container"} ${"DONE"}`}
                >
                  <p>DONE</p>
                </div>
              </div>
            </div>

            <div className="myOrder-listOrder-title-list-order-product">
              <div className="myOrder-listOrder-title-list-order-product-image">
                <img src={a} alt="" />
              </div>
              <div className="myOrder-listOrder-title-list-order-product-infor">
                <div className="myOrder-listOrder-title-list-order-product-infor-name">
                  hahaha
                </div>
                <div className="myOrder-listOrder-title-list-order-product-infor-size">
                  Màu: trắng
                </div>
                <div className="myOrder-listOrder-title-list-order-product-infor-size">
                  Kích cỡ: L
                </div>
                <div className="myOrder-listOrder-title-list-order-product-infor-name">
                  x12
                </div>
              </div>
              <div className="myOrder-listOrder-title-list-order-product-price">
                <span className="myOrder-listOrder-title-list-order-product-price-main">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(111111)}
                </span>
                <span className="myOrder-listOrder-title-list-order-product-price-sale">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(100000)}
                </span>
              </div>
            </div>

            <div className="myOrder-listOrder-title-list-order-footer">
              <div className="myOrder-listOrder-title-list-order-footer-btn">
                <button>Xem chi tiết</button>
              </div>
              <div className="myOrder-listOrder-title-list-order-footer-total">
                <i className="bi bi-coin"></i>
                Tổng số tiền:{" "}
                <span>
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(100000)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyOrder;
