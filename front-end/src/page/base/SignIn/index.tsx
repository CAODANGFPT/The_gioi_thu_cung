import "../../../assets/scss/layout/SignIn.scss";
import logo from "../../../assets/image/logo.png";
import banner from "../../../assets/image/banner.png";
import GoogleIcon from "../../../assets/svg/googleIcon";
import FacebookIcon from "../../../assets/svg/facebookIcon";
import { Link } from "react-router-dom";
import AppleIcon from "../../../assets/svg/appleIcon";
const SignIn = () => {
  return (
    <div className="container">
      <div className="singin-top">
        <img src={logo} alt="logo" />
        <Link to="" className="help">
          Cần trợ giúp?
        </Link>
      </div>
      <div className="singin-bottom">
        <img className="img-bg" src={banner} alt="" />
        <form className="f-singin">
          <h1>Đăng nhập</h1>
          <p className="new-to-account">
            Bạn chưa có tài khoản?
            <Link to="" className="text-login">
              Đăng kí
            </Link>
          </p>
          <div className="input-flex">
            <input
              className="btn-f "
              type="text"
              placeholder="Số điện thoại/Tên tài khoản/Email"
            />
            <input className="btn-f " type="password" placeholder="Password" />
          </div>
          <button className="btn-f bg-submit" type="submit">
            đăng nhập
          </button>

          <div className="forgot-phone">
            <Link to="" className="text-login">
              Forgot password
            </Link>
            <Link to="" className="text-login">
              Login with phone number
            </Link>
          </div>
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
        </form>
      </div>
    </div>
  );
};
export default SignIn;
