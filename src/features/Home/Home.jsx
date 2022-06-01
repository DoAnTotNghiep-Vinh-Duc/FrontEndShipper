import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import userAPI from "../../api/userAPI";
import NavbarUser from "../../components/NavBarUser/NavbarUser";
import "./Home.scss";
import moment from "moment";

Home.propTypes = {};

function Home(props) {
  const userLogIn = useSelector((state) => state.user.currentUser);

  const [userInformation, setUserInformation] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const response = await userAPI.getInformation();
        setUserInformation(response.data.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const handleChangeName = (event) => {
    setUserInformation({
      ...userInformation,
      name: event.target.value,
    });
  };

  if (userLogIn) {
    return (
      <div className="shipperInformation">
        <NavbarUser />
        <div className="shipperInformation-container">
          <div className="shipperInformation-infor-back">
            <div className="shipperInformation-infor">
              <div className="infor-name">{userInformation.name}</div>
              <div className="infor-image">
                <div className="infor-image-circle">
                  <img src={userInformation.avatar} alt="" />
                </div>
              </div>
              <div className="infor-button">
                <button>
                  <input type="file" accept="image/*" />
                  Tải hình mới lên
                </button>
              </div>
              <div className="infor-time">
                Tham gia <b>{moment(userInformation.createdAt).format("L")}</b>
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
                  <input
                    type="text"
                    value={userInformation.name}
                    onChange={handleChangeName}
                  />
                </div>
              </div>
              <div className="email-phone">
                <div className="email">
                  <label htmlFor="">Email</label>
                  <input type="text" value={userInformation.email} readOnly />
                </div>
                <div className="phone-number">
                  <label htmlFor="">Số điện thoại</label>
                  <input type="text" value={userInformation.phone} readOnly />
                </div>
              </div>
              <div className="city-district">
                <div className="city">
                  <label htmlFor="">Tỉnh/ Thành phố</label>
                  <input type="text" value={userInformation.city} readOnly />
                </div>
                <div className="district">
                  <label htmlFor="">Quận/ Huyện</label>
                  <input
                    type="text"
                    value={userInformation.district}
                    readOnly
                  />
                </div>
              </div>
              <div className="ward-street">
                <div className="ward">
                  <label htmlFor="">Phường/ Xã</label>
                  <input type="text" value={userInformation.ward} readOnly />
                </div>
                <div className="street">
                  <label htmlFor="">Số nhà/ Đường</label>
                  <input type="text" value={userInformation.street} readOnly />
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
  } else {
    return <Redirect to="/signin" />;
  }
}

export default Home;
