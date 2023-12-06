import { Menu, MenuProps } from "antd";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "../../../../assets/scss/page/account/account.scss";
import Breadcrumb from "../../../../components/breadcrumb";
import logo from "../../../../assets/image/logo.png";
import { useGetUserQuery } from "../../../../services/user";
type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(<Link to={"/account"}>Thông tin</Link>, "account"),
  getItem(<Link to={"pet-user"}>Thú cưng</Link>, "pet-user"),
  getItem(<Link to={"payment"}>Cài đặt thanh toán</Link>, "payment"),
  getItem("Lịch đã đặt", "sub1", null, [
    getItem(
      <Link to={"wait-for-confirmation-appointment"}>Chờ xác nhận</Link>,
      "5"
    ),
    getItem(<Link to={"confirmed-appointment"}>Đã xác nhận</Link>, "6"),
    getItem(<Link to={"doing-appointment"}>Đang thực hiện</Link>, "7"),
    getItem(<Link to={"accomplished-appointment"}>Đã Hoàn thành</Link>, "8"),
    getItem(<Link to={"cancelledAppointment"}>Đã hủy</Link>, "9"),
  ]),
];

const AccountPage = () => {
  const navigate = useNavigate();
  const { data: user } = useGetUserQuery();

  if (!user) {
    return (
      <div style={{ width: "50%", margin: "0 auto" }}>
        <p style={{ textAlign: "center" }}>Bạn chưa đăng nhập.</p>
        <img style={{ width: "100%" }} src={logo} alt="logo" />
        <p className="link" onClick={() => navigate("/SignIn")}>
          Đăng nhập ngay tại đây!
        </p>
      </div>
    );
  }
  return (
    <div className="account_info">
      {/* <div className="account_info-row">
        <Breadcrumb name="Tài khoản" />
      </div> */}
      <div className="account_info-row">
        <h4 className="account_info-heading">Tài Khoản</h4>
      </div>
      <div className="account_info-row">
        <div className="account_info-col col_1">
          <Menu defaultSelectedKeys={["1"]} mode="inline" items={items} />
        </div>
        <div className="account_info-col col_2">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
