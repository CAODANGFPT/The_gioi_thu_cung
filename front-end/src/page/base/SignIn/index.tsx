import { useFormik } from "formik";
import { useState } from "react";
import { Link } from "react-router-dom";

import { SignInRequestSchema, TSignIn } from "../../../schema/signIn";
import "../../../assets/scss/page/SignIn.scss";

import logo from "../../../assets/image/logo.png";
import banner from "../../../assets/image/background.png";
import GoogleIcon from "../../../assets/svg/googleIcon";
import FacebookIcon from "../../../assets/svg/facebookIcon";
import AppleIcon from "../../../assets/svg/appleIcon";
import EyesCloseIcon from "../../../assets/svg/eyesCloseIcon";
import EyesOpenIcon from "../../../assets/svg/eyesOpenIcon";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const formik = useFormik<TSignIn>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: SignInRequestSchema,
    onSubmit: (values: any) => {
      console.log("Submitted form:", values);
    },
  });
  return (
    <div className="singIn">
      <div className="singin-top">
        <img src={logo} alt="logo" />
        <Link to="" className="help">
          Trợ giúp?
        </Link>
      </div>
      <div className="singin-bottom">
        <img className="img-bg" src={banner} alt="" />
        <form className="f-singin" onSubmit={formik.handleSubmit}>
          <h1>Đăng nhập</h1>

          <p className="new-to-account">
            Bạn chưa có tài khoản?
            <Link to="/signup" className="text-login">
              Đăng kí
            </Link>
          </p>
          <div className="input-flex">
            <input
              className="btn-f "
              type="text"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Nhập email của bạn "
            />
            {formik.touched.email && formik.errors.email && (
              <div className="error">{formik.errors.email}</div>
            )}
            <div className="btn-f-input-password">
              <input
                className="btn-f-input-password-1"
                type={showPassword ? "text" : "password"}
                placeholder="Mật khẩu"
                id="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <div onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyesOpenIcon /> : <EyesCloseIcon />}
              </div>
            </div>
          {formik.touched.password && formik.errors.password && (
            <div className="error">{formik.errors.password}</div>
          )}
          </div>

          <button className="btn-f bg-submit" type="submit">
            đăng nhập
          </button>

          <div className="forgot-phone">
            <Link to="" className="text-login">
              Quên mật khẩu
            </Link>
            <Link to="" className="text-login">
              Login with phone number
            </Link>
          </div>
          <br />

          <div className="or">
            <div className="or-border" />
            <div className="or-title">Hoặc</div>
            <div className="or-border" />
          </div>

          <div className="btn-flex">
            <button className="btn-f bg-with">
              <GoogleIcon />
              <Link to="" className="login-icon-with">
                Đăng nhập bằng google
              </Link>
            </button>
            <button className="btn-f bg-with">
              <FacebookIcon />
              <Link to="" className="login-icon-with">
                Đăng nhập bằng facebook
              </Link>
            </button>
            <button className="btn-f bg-with">
              <AppleIcon />
              <Link to="" className="login-icon-with">
                Đăng nhập bằng Apple
              </Link>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default SignIn;
