import "../../../../assets/scss/layout/resetPassword.scss";
import GoogleIcon from "../../../../assets/svg/googleIcon";
import FooterBase from "../../../../layoutBase/footer";
import HeaderBase from "./../../../../layoutBase/header";
import FacebookIcon from "./../../../../assets/svg/facebookIcon";

const ResetPassWord = () => {
  return (
    <div>
      <HeaderBase />
      <div className="resetPassword-form">
        <form className="">
          <br />
          <h2>Reset Password</h2>
          <br />
          <div className="form-group">
            <input required className="input" type="text" placeholder="Email" />
          </div>

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
        <div className="form-group">
          <button className="button ">
            <FacebookIcon />
            Continue with Facebook
          </button>
        </div>
        <div className="form-group">
          <button className="button ">
            <GoogleIcon />
            Continue with Google
          </button>
        </div>
      </div>
      <FooterBase />
    </div>
  );
};
export default ResetPassWord;
