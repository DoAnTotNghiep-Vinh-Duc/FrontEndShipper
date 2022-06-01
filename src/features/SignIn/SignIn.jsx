import { yupResolver } from "@hookform/resolvers/yup";
import { unwrapResult } from "@reduxjs/toolkit";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import avatar from "../../assest/avatar.svg";
import icon from "../../assest/iconshipper.png";
import InputField from "../../form-control/InputField";
import PasswordField from "../../form-control/PasswordField";
import "./SignIn.scss";
import { signIn } from "./userSlice";

toast.configure();
SignIn.propTypes = {};

function SignIn(props) {
  const dispatch = useDispatch();
  const History = useHistory();
  const userLogIn = useSelector((state) => state.user.currentUser);

  const schema = yup.object().shape({
    email: yup
      .string()
      .required("Vui lòng nhập Email!")
      .email("Email không chính xác!"),
    password: yup
      .string()
      .required("Vui lòng nhập mật khẩu")
      .min(6, "Mật khẩu ít nhất 6 kí tự!"),
  });

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = (value) => {
    const fetchSignIn = async () => {
      try {
        const action = signIn({ email: value.email, password: value.password });
        const actionResult = await dispatch(action);
        const result = unwrapResult(actionResult);
        if (result.status === 200) {
          toast.success("Đăng nhập thành công", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
            theme: "light",
          });

          window.location = "http://localhost:3006/";
          History.push("/");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSignIn();
  };

  return (
    <>
      <div className="signin">
        <img src={icon} alt="" />
        <div className="signin-container">
          <form
            className="signin-container-wrapper"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <div className="signin-container-wrapper-image">
              <img src={avatar} alt="" />
            </div>
            <div className="signin-container-wrapper-title">ĐĂNG NHẬP</div>
            <div className="signin-container-wrapper-username-wrapper">
              <div className="signin-container-wrapper-username">
                <InputField name="email" label="Email" form={form} />
              </div>
              <div className="signin-container-wrapper-username">
                <PasswordField name="password" label="Mật khẩu" form={form} />
              </div>
            </div>
            <div className="signin-container-wrapper-forgot">
              <p>Quên mật khẩu?</p>
            </div>
            <div className="signin-container-wrapper-btn">
              <button type="submit">ĐĂNG NHẬP</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignIn;
