import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { makeStyles, useTheme, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import GradeIcon from "@material-ui/icons/Grade";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import orderAPI from "../../../api/orderAPI";
import NavbarUser from "../../../components/NavBarUser/NavbarUser";
import Product from "../Product/Product";
import "./MyOrderDetail.scss";

MyOrderDetail.propTypes = {};

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 700,
  },
}));

function MyOrderDetail(props) {
  const classes = useStyles();

  const {
    params: { orderId },
  } = useRouteMatch();

  const [myOrder, setMyOrder] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const response = await orderAPI.getOrderByOrderId(orderId);
        console.log(response);
        setMyOrder(response.data.data.order[0]);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [orderId]);

  return (
    <>
      <div className="myOrderDetail">
        <NavbarUser />
        <div className="myOrderDetail-content">
          <div className="myOrderDetail-title">
            <div className="myOrderDetail-title-left">
              <p>Chi tiết đơn hàng</p>
            </div>
            <div className="myOrderDetail-title-right">
              <Link className="myOrderDetail-title-right-home" to="/">
                Trang chủ
              </Link>
              <i className="bi bi-chevron-right"></i>
              <p className="myOrderDetail-title-right-order">Đơn hàng</p>
            </div>
          </div>
          <div className="myOrderDetail-status">
            <div className="myOrderDetail-status-title">
              TÌNH TRẠNG ĐƠN HÀNG
            </div>
            <div
              className={`${"myOrderDetail-status-body"} ${
                myOrder.status === "CANCELED" ? "cancel" : ""
              }`}
            >
              <div
                className={`${"myOrderDetail-status-body-card"} ${
                  myOrder.status === "DELIVERING"
                    ? "shipping"
                    : myOrder.status === "DONE"
                    ? "done"
                    : ""
                }`}
              >
                <div className="myOrderDetail-status-body-card-confirm">
                  <i className="bi bi-cart-check-fill"></i>
                </div>
                <div className="line-confirm"></div>
                <div className="myOrderDetail-status-body-card-handling">
                  <i className="bi bi-arrow-repeat"></i>
                </div>
                <div className="line-handling"></div>
                <div className="myOrderDetail-status-body-card-shipping">
                  <i className="bi bi-truck"></i>
                </div>
                <div className="line-shipping"></div>
                <div className="myOrderDetail-status-body-card-done">
                  <i className="bi bi-check-circle"></i>
                </div>
                <div className="myOrderDetail-status-body-card-cancel">
                  ĐÃ BỊ HỦY
                </div>
              </div>
              <div className="myOrderDetail-status-body-text">
                <div className="myOrderDetail-status-body-text-confirm">
                  Đã đặt hàng
                </div>
                <div className="myOrderDetail-status-body-text-handling">
                  Chờ xử lý
                </div>
                <div className="myOrderDetail-status-body-text-shipping">
                  Đang vận chuyển
                </div>
                <div className="myOrderDetail-status-body-text-done">
                  Hoàn thành
                </div>
              </div>
            </div>
          </div>
          <div className="myOrderDetail-order">
            <div className="myOrderDetail-order-logo">
              <p>Lemon</p>
            </div>
            <div className="myOrderDetail-order-detail">
              <div className="myOrderDetail-order-detail-side">
                <div className="myOrderDetail-order-detail-side-text">
                  <label htmlFor="">Đến: </label>
                  <span>{myOrder.name}</span>
                </div>
                <div className="myOrderDetail-order-detail-side-text">
                  <label htmlFor="">Địa chỉ: </label>
                  <span>
                    {myOrder.street}, {myOrder.ward}, {myOrder.district},{" "}
                    {myOrder.city}
                  </span>
                </div>
                <div className="myOrderDetail-order-detail-side-text">
                  <label htmlFor="">Số điện thoại: </label>
                  <span>{myOrder.account?.information.phone}</span>
                </div>
              </div>
              <div className="myOrderDetail-order-detail-side">
                <div className="myOrderDetail-order-detail-side-text">
                  <label htmlFor="">Mã hóa đơn: </label>
                  <span>{myOrder._id}</span>
                </div>
                <div className="myOrderDetail-order-detail-side-text">
                  <label htmlFor="">Ngày đặt hàng: </label>
                  <span> {moment(myOrder.createdAt).format("L")}</span>
                </div>
              </div>
            </div>
            <div className="myOrderDetail-table-title">CHI TIẾT HÓA ĐƠN</div>
            <div className="myOrderDetail-order-table">
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <>
                        <StyledTableCell width="5%">#</StyledTableCell>
                        <StyledTableCell width="10%">HÌNH ẢNH</StyledTableCell>
                        <StyledTableCell width="40%">SẢN PHẨM</StyledTableCell>
                        <StyledTableCell width="15%">GIÁ</StyledTableCell>
                        <StyledTableCell width="15%">SỐ LƯỢNG</StyledTableCell>
                        <StyledTableCell width="15%">TỔNG</StyledTableCell>
                      </>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {myOrder.listOrderDetail?.map((product, index) => {
                      return (
                        <Product
                          key={index}
                          product={product}
                          index={index}
                          myOrder={myOrder}
                        />
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
            <div className="myOrderDetail-table-footer">
              <div className="myOrderDetail-table-footer-subtotal">
                <div className="myOrderDetail-table-footer-subtotal-title">
                  THÀNH TIỀN
                </div>
                <div className="myOrderDetail-table-footer-subtotal-cost">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(myOrder.subTotal)}
                </div>
              </div>
              <div className="myOrderDetail-table-footer-subtotal">
                <div className="myOrderDetail-table-footer-subtotal-title">
                  PHÍ VẬN CHUYỂN
                </div>
                <div className="myOrderDetail-table-footer-subtotal-cost">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(30000)}
                </div>
              </div>
              <div className="myOrderDetail-table-footer-total">
                <div className="myOrderDetail-table-footer-total-title">
                  TỔNG
                </div>
                <div className="myOrderDetail-table-footer-total-cost">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(myOrder.total)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyOrderDetail;
