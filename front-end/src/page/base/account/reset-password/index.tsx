import * as yup from "yup";
import { useFormik } from "formik";
import "../../../../assets/scss/layout/resetPassword.scss";
import FooterBase from "../../../../layoutBase/footer";
import HeaderBase from "./../../../../layoutBase/header";
import { Link } from "react-router-dom";
import GoogleIcon from "../../../../assets/svg/googleIcon";
import AppleIcon from "../../../../assets/svg/appleIcon";
import FacebookIcon from "./../../../../assets/svg/facebookIcon";

const ResetPassWord = () => {
  const ResetPasswordSchema = yup.object().shape({
    email: yup
      .string()
      .email("Email không hợp lệ")
      .required("Vui lòng điền email"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: ResetPasswordSchema,
    onSubmit: (values) => {},
  });
  return (
    <div>
      <HeaderBase />
      <div className="resetPassword-form">
        <form onSubmit={formik.handleSubmit}>
          <br />
          <h2>Reset Password</h2>
          <br />
          <div className="form-group">
            <input
              className="input"
              type="text"
              name="email"
              placeholder="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          {formik.touched.email && formik.errors.email ? (
            <div className="error-message">{formik.errors.email}</div>
          ) : null}

          <button className="btn-resetpass" type="submit">
            NEXT
          </button>
        </form>
        <div className="line-all">
          <div className="line"></div>
          <span className="or">or</span>
          <div className="line"></div>
        </div>
        <br />
        <div className="btn-flex">
          <button className="button">
            <GoogleIcon />
            <Link to="" className=" custom-link">
              Đăng nhập bằng google
            </Link>
          </button>

          <button className="button">
            <FacebookIcon />
            <Link to="" className=" custom-link">
              Đăng nhập bằng facebook
            </Link>
          </button>

          <button className="button">
            <AppleIcon />
            <Link to="" className=" custom-link">
              Đăng nhập bằng Apple
            </Link>
          </button>
        </div>
      </div>
      <FooterBase />
    </div>
  );
};
export default ResetPassWord;
