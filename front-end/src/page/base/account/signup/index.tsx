import "../../../../assets/scss/layout/signUp.scss";
import logo from "../../../../assets/image/logo.png";
import banner from "../../../../assets/image/banner.png";
import GoogleIcon from "../../../../assets/svg/googleIcon";
import FacebookIcon from "../../../../assets/svg/facebookIcon";
const Signup = () => {
  return (
    <div className="container">
      <div className="singup-top">
        <img src={logo} alt="logo" />
        <p>Need help?</p>
      </div>
      <div className="singup-bottom">
        <img className="img-bg" src={banner} alt="" />
        <form className="f-singup">
          <h1>sign up</h1>
          <br />
          <p>
            have an account? <a href="">Log in</a>
          </p>
          <div className="input-flex">
            <input
              className="btn-f"
              type="text"
              placeholder="Phone number/Username/email"
            />

            <input className="btn-f" type="password" placeholder="password" />

            <input
              className="btn-f"
              type="password"
              placeholder="Confirm password"
            />
          </div>

          <button className="btn-f bg-submit" type="submit">
            Submit
          </button>
          <br />
          <div className="btn-flex">
            <button className="btn-f bg-with">
              <GoogleIcon /> <div>đăng nhập bằng google</div>
            </button>
            <button className="btn-f bg-with">
              <FacebookIcon /> <div>đăng nhập bằng facebook</div>
            </button>
          </div>

          <p>
            By signing up, you agree to Meow's Terms of Service & Privacy Policy
          </p>
          <br />
        </form>
      </div>
    </div>
  );
};
export default Signup;
