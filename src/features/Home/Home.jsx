import React from "react";
import a from "../../assest/iconshipper.png";
import NavbarUser from "../../components/NavBarUser/NavbarUser";
import "./Home.scss";

Home.propTypes = {};

function Home(props) {
  return (
    <div className="shipperInformation">
      <NavbarUser />
      <div className="shipperInformation-container">
        <div className="shipperInformation-infor-back">
          <div className="shipperInformation-infor">
            <div className="infor-name">đạt đức</div>
            <div className="infor-image">
              <div className="infor-image-circle">
                <img src={a} alt="" />
              </div>
            </div>
            <div className="infor-button">
              <button>
                <input type="file" accept="image/*" />
                Tải hình mới lên
              </button>
            </div>
            <div className="infor-time">
              Tham gia <b>14/05/2022</b>
            </div>
          </div>
        </div>
        <div className="shipperInformation-edit">
          <div className="shipperInformation-edit-header">
            <p>Chỉnh sửa thông tin cá nhân</p>
          </div>
          <div className="shipperInformation-edit-body">
            <div className="fullname-password">
              <div className="fullname">
                <label htmlFor="">Họ và tên</label>
                <input type="text" value="Đạt đức" />
              </div>
            </div>
            <div className="email-phone">
              <div className="email">
                <label htmlFor="">Email</label>
                <input type="text" value="12345ddduc@gmail.com" readOnly />
              </div>
              <div className="phone-number">
                <label htmlFor="">Số điện thoại</label>
                <input type="text" value="0359806602" readOnly />
              </div>
            </div>
            <div className="city-district">
              <div className="city">
                <label htmlFor="">Tỉnh/ Thành phố</label>
                <input type="text" name="" id="" value="bình dương" />
              </div>
              <div className="district">
                <label htmlFor="">Quận/ Huyện</label>
                <input type="text" name="" id="" value="bình dương" />
              </div>
            </div>
            <div className="ward-street">
              <div className="ward">
                <label htmlFor="">Phường/ Xã</label>
                <input type="text" value="bình dương" />
              </div>
              <div className="street">
                <label htmlFor="">Số nhà/ Đường</label>
                <input type="text" value="bình dương" />
              </div>
            </div>
            <div className="btnUpdate">
              <button>Cập nhập</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
