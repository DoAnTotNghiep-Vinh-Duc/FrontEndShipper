import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import orderAPI from "../../api/orderAPI";
import icon_order from "../../assest/icon-order.jpg";
import NavbarUser from "../../components/NavBarUser/NavbarUser";
import "./MyOrder.scss";

MyOrder.propTypes = {};

function MyOrder(props) {
  const history = useHistory();

  const [value, setValue] = useState("WAITING");
  const [listOrder, setListOrder] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await orderAPI.getAllOrderByShipper(value);
        setListOrder(response.data.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [value]);

  const handleViewDetail = (order) => {
    history.push(`/orderDetail/${order._id}`);
  };

  return (
    <div className="myOrder">
      <NavbarUser />
      <div className="myOrder-container">
        <div className="myOrder-title">
          <div className="myOrder-title-left">
            <p>Lịch sử giao hàng</p>
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
              value="WAITING"
              label="chờ nhận hàng"
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
          {listOrder.length ? (
            <>
              {listOrder.map((order) => {
                return (
                  <div
                    className="myOrder-listOrder-title-list-order"
                    key={order._id}
                  >
                    <div className="myOrder-listOrder-title-list-order-header">
                      <div className="myOrder-listOrder-title-list-order-header-id">
                        <p>
                          Mã hóa đơn: <b>{order._id}</b>
                        </p>
                      </div>
                      <div className="myOrder-listOrder-title-list-order-header-status">
                        <div
                          className={`${"myOrder-listOrder-title-list-order-header-status-container"} ${
                            order.status
                          }`}
                        >
                          <p>
                            {order.status === "DONE"
                              ? "Đã hoàn tất"
                              : order.status === "CANCELED"
                              ? "Đã bị hủy"
                              : order.status === "DELIVERING"
                              ? "Đang vận chuyển"
                              : order.status === "WAITING"
                              ? "Chờ nhận hàng"
                              : ""}
                          </p>
                        </div>
                      </div>
                    </div>
                    {order.listOrderDetail.map((product, index) => {
                      return (
                        <div
                          className="myOrder-listOrder-title-list-order-product"
                          key={index}
                        >
                          <div className="myOrder-listOrder-title-list-order-product-image">
                            <img src={product.productDetail.image} alt="" />
                          </div>
                          <div className="myOrder-listOrder-title-list-order-product-infor">
                            <div className="myOrder-listOrder-title-list-order-product-infor-name">
                              {product.productDetail.product.name}
                            </div>
                            <div className="myOrder-listOrder-title-list-order-product-infor-size">
                              Màu: {product.productDetail.color.name}
                            </div>
                            <div className="myOrder-listOrder-title-list-order-product-infor-size">
                              Kích cỡ: {product.productDetail.size}
                            </div>
                            <div className="myOrder-listOrder-title-list-order-product-infor-name">
                              x{product.quantity}
                            </div>
                          </div>
                          <div className="myOrder-listOrder-title-list-order-product-price">
                            {product.price ===
                            product.productDetail.product.price ? (
                              <>
                                <span className="myOrder-listOrder-title-list-order-product-price-main-nosale">
                                  {new Intl.NumberFormat("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                  }).format(
                                    product.productDetail.product.price
                                  )}
                                </span>
                              </>
                            ) : (
                              <>
                                <span className="myOrder-listOrder-title-list-order-product-price-main">
                                  {new Intl.NumberFormat("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                  }).format(
                                    product.productDetail.product.price
                                  )}
                                </span>
                                <span className="myOrder-listOrder-title-list-order-product-price-sale">
                                  {new Intl.NumberFormat("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                  }).format(product.price)}
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      );
                    })}

                    <div className="myOrder-listOrder-title-list-order-footer">
                      <div className="myOrder-listOrder-title-list-order-footer-btn">
                        <button onClick={() => handleViewDetail(order)}>
                          Xem chi tiết
                        </button>
                      </div>
                      <div className="myOrder-listOrder-title-list-order-footer-total">
                        <i className="bi bi-coin"></i>
                        Tổng số tiền:{" "}
                        <span>
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(order.total)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <>
              <div className="myOrder-listOrder-notfound">
                <img src={icon_order} alt="" />
                <p>Chưa có đơn hàng</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyOrder;
