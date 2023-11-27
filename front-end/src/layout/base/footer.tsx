import "../../assets/scss/layout/base/footerBase.scss";
import logo from "../../assets/image/logo.png";
import appStore from "../../assets/image/appStore.png";
import FacebookIcon from "../../assets/svg/facebookIcon";
import InstagramIcon from "../../assets/svg/instagramIcon";
import TwitterIcon from "../../assets/svg/twitterIcon";
import YoutubeIcon from "../../assets/svg/youtubeIcon";

const FooterBase = () => {
  return (
    <>
      <div className="containerFooter">
        <div className="containerFooter-1">
          <div className="logo">
            <img src={logo} alt="logo" />
            <p className="logo-title">Chúng tôi có mọi thứ cho mèo ở đây!</p>
          </div>
          <div className="group18">
            <p className="group18-title-1">Theo dõi bản tìn của chúng tôi</p>
            <p className="group18-title-2">Blog mới về mèo mỗi tuần</p>
            <div className="group18-input">
              <input type="text" placeholder="ĐỊA CHỈ EMAIL CỦA BẠN" />
              <button>ĐẶT MUA</button>
            </div>
          </div>
        </div>
        <div className="containerFooter-2">
          <div className="group8">
            <p className="group8-title-1">Đơn hàng của tôi đâu?</p>
            <button>THEO DÕI THỨ TỰ</button>
            <p className="group8-title-2">
              Xin lưu ý, có thể mất nhiều thời gian hơn bình thường để hoàn
              thành các đơn hàng do ảnh hưởng của COVID-19.
            </p>
          </div>
          <div className="group8">
            <p className="group8-title-1">Đang chuyển hàng</p>
            <p className="group8-title-2">Về Miễn Phí Vận Chuyển</p>
            <p className="group8-title-2">Thông tin vận chuyển</p>
          </div>
          <div className="group8">
            <p className="group8-title-1">Ứng dụng mua sắm</p>
            <p className="group8-title-2">
              Hãy dùng thử tính năng Xem trong phòng của bạn, quản lý đăng ký và
              lưu thông tin thanh toán.
            </p>
            <img src={appStore} alt="" />
          </div>
          <div className="group8">
            <p className="group8-title-1">Công ty chúng tôi</p>
            <p className="group8-title-2">Về chúng tôi</p>
            <p className="group8-title-2">Nghề nghiệp</p>
            <p className="group8-title-2">Liên hệ</p>
            <p className="group8-title-2">Địa điểm cửa hàng</p>
          </div>
          <div className="group8">
            <p className="group8-title-1">Truyền thông xã hội</p>
            <div className="icon">
              <FacebookIcon />
              <InstagramIcon />
              <YoutubeIcon />
              <TwitterIcon />
            </div>
            <p className="group8-title-2">
              Cho chúng tôi xem con mèo của bạn với: #meowshop #themeowshop
            </p>
          </div>
          <div className="group8">
            <p className="group8-title-1">Chính sách</p>
            <p className="group8-title-2">chính sách vận chuyển</p>
            <p className="group8-title-2">Chính sách hoàn tiền</p>
            <p className="group8-title-2">Chính sách bảo mật</p>
            <p className="group8-title-2">Điều khoản dịch vụ</p>
          </div>
        </div>
      </div>
      <div className="copyright">
        <p>Copyright © 2022 The Meow Shop. Đã đăng ký Bản quyền</p>
      </div>
    </>
  );
};
export default FooterBase;
