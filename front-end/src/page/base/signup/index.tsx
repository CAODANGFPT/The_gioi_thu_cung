import { useFormik } from "formik";
import * as yup from "yup";
import "../../../assets/scss/layout/signUp.scss";
import logo from "../../../assets/image/logo.png";
import banner from "../../../assets/image/banner.png";
import GoogleIcon from "../../../assets/svg/googleIcon";
import FacebookIcon from "../../../assets/svg/facebookIcon";
import { Link } from "react-router-dom";
import AppleIcon from "../../../assets/svg/appleIcon";

const Signup = () => {
  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .min(6, "tên phải có ít nhất 6 ký tự")
      .required("Vui lòng nhập tên tài khoản"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("Submitted form:", values);
    },
  });

  return (
    <div className="container">
      <div className="singup-top">
        <img src={logo} alt="logo" />
        <Link to="" className="help">
          Trợ giúp?
        </Link>
      </div>
      <div className="singup-bottom">
        <img className="img-bg" src={banner} alt="" />
        <form className="f-singup" onSubmit={formik.handleSubmit}>
          <h1>Đăng ký</h1>
          <br />
          <p>
            bạn đã có tài khoản?
            <Link to="" className="text-login">
              Đăng nhập
            </Link>
          </p>
          <div className="input-flex">
            <input
              className="btn-f"
              type="text"
              placeholder="Số điện thoại/Tên tài khoản/Email"
              id="username"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.username && formik.errors.username && (
              <div className="error">{formik.errors.username}</div>
            )}
          </div>
          <button className="btn-f bg-submit" type="submit">
            tiếp theo
          </button>
          <br />
          <div className="or">Hoặc</div>
          <div className="btn-flex">
            <button className="btn-f bg-with">
              <GoogleIcon />
              <Link to="" className="google">
                Đăng nhập bằng google
              </Link>
            </button>
            <button className="btn-f bg-with">
              <FacebookIcon />
              <Link to="" className="google">
                Đăng nhập bằng facebook
              </Link>
            </button>
            <button className="btn-f bg-with">
              <AppleIcon />
              <Link to="" className="google">
                Đăng nhập bằng Apple
              </Link>
            </button>
          </div>
          <p className="rule">
            Bằng việc đăng ký, bạn đồng ý với
            <Link to="" className="rule-click">
              Điều khoản dịch vụ
            </Link>
            &
            <Link to="" className="rule-click">
              Chính sách quyền riêng tư
            </Link>
            của Meow
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
