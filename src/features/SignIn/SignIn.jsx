import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import avatar from "../../assest/avatar.svg";
import icon from "../../assest/iconshipper.png";
import InputField from "../../form-control/InputField";
import PasswordField from "../../form-control/PasswordField";
import "./SignIn.scss";

SignIn.propTypes = {};

function SignIn(props) {
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
    console.log(value);
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
