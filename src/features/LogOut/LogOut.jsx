import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Cookies from "js-cookie";
import React from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import userAPI from "../../api/userAPI";

toast.configure();
LogOut.propTypes = {};

function LogOut(props) {
  const History = useHistory();

  const handleClose = () => {
    props.closeLogout(false);
  };

  const handleClickLogOut = () => {
    (async () => {
      try {
        const response = await userAPI.logout({
          refreshToken: Cookies.get("refreshTokenShipper"),
        });
        if (response.status === 200) {
          props.closeLogout(false);
          Cookies.remove("refreshTokenShipper");
          Cookies.remove("tokenShipper");
          localStorage.removeItem("shipper");
          History.push("/signin");
          toast.success("Đăng xuất thành công", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
            theme: "dark",
          });
        }
      } catch (error) {
        console.log(error);
      }
    })();
  };

  return (
    <>
      <DialogTitle id="responsive-dialog-title">{"Đăng xuất"}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Bạn có chắc chắn đăng xuất tài khoản ra khỏi trang web này không?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined" size="small">
          Hủy
        </Button>
        <Button
          onClick={handleClickLogOut}
          color="secondary"
          variant="contained"
          size="small"
          startIcon={<ExitToAppIcon />}
        >
          Xác nhận
        </Button>
      </DialogActions>
    </>
  );
}

export default LogOut;
