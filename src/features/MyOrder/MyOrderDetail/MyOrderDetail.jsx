import Button from "@material-ui/core/Button";
import { green } from "@material-ui/core/colors";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Paper from "@material-ui/core/Paper";
import {
  createTheme,
  makeStyles,
  ThemeProvider,
  useTheme,
  withStyles,
} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import CloseIcon from "@material-ui/icons/Close";
import DirectionsBikeIcon from "@material-ui/icons/DirectionsBike";
import moment from "moment";
import "moment/locale/vi";
import React, { useEffect, useState } from "react";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { toast } from "react-toastify";
import orderAPI from "../../../api/orderAPI";
import NavbarUser from "../../../components/NavBarUser/NavbarUser";
import Product from "../Product/Product";
import "./MyOrderDetail.scss";

moment.locale("vi");
toast.configure();
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
  margin: {
    margin: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const theme = createTheme({
  palette: {
    primary: green,
  },
});

function MyOrderDetail(props) {
  const classes = useStyles();
  const history = useHistory();
  const usetheme = useTheme();
  const fullScreen = useMediaQuery(usetheme.breakpoints.down("sm"));

  const {
    params: { orderId },
  } = useRouteMatch();

  const [myOrder, setMyOrder] = useState({});
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openCancel, setOpenCancel] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await orderAPI.getOrderByOrderId(orderId);
        setMyOrder(response.data.data.order[0]);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [orderId]);

  const handleAccept = () => {
    (async () => {
      try {
        const response = await orderAPI.receiveOrder(orderId);
        if (response.status === 200) {
          toast.success("Nhận hàng thành công", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
            theme: "dark",
          });
          history.push("/myOrders");
        }
      } catch (error) {
        console.log(error);
      }
    })();
  };

  const handleClickOpenSuccess = () => {
    setOpenSuccess(true);
  };
  const handleCloseSuccess = () => {
    setOpenSuccess(false);
  };

  const handleClickOpenCancel = () => {
    setOpenCancel(true);
  };
  const handleCloseCancel = () => {
    setOpenCancel(false);
  };

  const handleSuccessOrder = () => {
    (async () => {
      try {
        const response = await orderAPI.successOrder(orderId);
        if (response.status === 200) {
          toast.success("Giao hàng thành công", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
            theme: "dark",
          });
          history.push("/myOrders");
        }
      } catch (error) {
        console.log(error);
      }
    })();
  };

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
                  myOrder.status === "WAITING"
                    ? "waiting"
                    : myOrder.status === "DELIVERING"
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
                <div className="myOrderDetail-status-body-card-waiting">
                  <i className="bi bi-box2"></i>
                </div>
                <div className="line-waiting"></div>
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
                <div className="myOrderDetail-status-body-text-waiting">
                  Chờ nhận hàng
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
                    {myOrder.street}, Phường {myOrder.ward}, Quận{" "}
                    {myOrder.district}, {myOrder.city}
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
                  <span>
                    {moment(myOrder.createdAt).format("LTS")} -{" "}
                    {moment(myOrder.createdAt).format("L")}
                  </span>
                </div>
                {myOrder.status === "DELIVERING" && (
                  <div className="myOrderDetail-order-detail-side-text">
                    <label htmlFor="">Ngày giao hàng: </label>
                    <span>
                      {myOrder.deliveryDay.slice(11, 19)} -{" "}
                      {moment(myOrder.deliveryDay).format("L")}
                    </span>
                  </div>
                )}

                {myOrder.status === "DONE" && (
                  <>
                    <div className="myOrderDetail-order-detail-side-text">
                      <label htmlFor="">Ngày giao hàng: </label>
                      <span>
                        {myOrder.deliveryDay.slice(11, 19)} -{" "}
                        {moment(myOrder?.deliveryDay).format("L")}
                      </span>
                    </div>
                    <div className="myOrderDetail-order-detail-side-text">
                      <label htmlFor="">Ngày nhận hàng: </label>
                      <span>
                        {myOrder.receiveDay.slice(11, 19)} -{" "}
                        {moment(myOrder.receiveDay).format("L")}
                      </span>
                    </div>
                  </>
                )}
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

          {myOrder.status === "WAITING" && (
            <div className="myOrderDetail-btn">
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                endIcon={<DirectionsBikeIcon />}
                onClick={handleAccept}
              >
                Nhận đơn hàng
              </Button>
            </div>
          )}

          {myOrder.status === "DELIVERING" && (
            <div className="myOrderDetail-btn">
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                startIcon={<CloseIcon />}
                size="large"
                onClick={handleClickOpenCancel}
              >
                THẤT BẠI
              </Button>
              <ThemeProvider theme={theme}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  className={classes.margin}
                  startIcon={<CheckCircleOutlineIcon />}
                  onClick={handleClickOpenSuccess}
                >
                  THÀNH CÔNG
                </Button>
              </ThemeProvider>
            </div>
          )}
        </div>
      </div>

      <Dialog
        fullScreen={fullScreen}
        open={openSuccess}
        onClose={handleCloseSuccess}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Xác nhận"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc chắn xác nhận là giao hàng thành công không?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" size="medium" onClick={handleCloseSuccess}>
            hủy
          </Button>
          <Button
            variant="contained"
            size="medium"
            color="primary"
            className={classes.margin}
            onClick={handleSuccessOrder}
          >
            XÁC NHẬN
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        fullScreen={fullScreen}
        open={openCancel}
        onClose={handleCloseCancel}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Xác nhận"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc chắn xác nhận là giao hàng thất bại không?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" size="medium" onClick={handleCloseCancel}>
            hủy
          </Button>
          <Button variant="contained" color="secondary">
            XÁC NHẬN
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default MyOrderDetail;
