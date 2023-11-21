import { Menu, MenuProps } from "antd";
import { Link, Outlet } from "react-router-dom";
import "../../../../assets/scss/page/account/account.scss";
import Breadcrumb from "../../../../components/breadcrumb";

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
  getItem(<Link to={"/account"}>Thông tin đăng nhập</Link>, "/account"),
  getItem(<Link to={"payment"}>Cài đặt thanh toán</Link>, "payment"),
  getItem(
    <Link to={"history_follow"}>Lịch sử mua hàng & theo dõi đơn hàng</Link>,
    "history_follow"
  ),
  getItem("Lịch đã đặt", "sub1", null, [
    getItem("Chờ xác nhận", "5"),
    getItem("Đẵ xác nhận", "6"),
    getItem("Chưa thanh toán", "7"),
    getItem("Đã thanh toán", "8"),
    getItem(<Link to={"cancelled"}>Đã hủy</Link>, "9"),
  ]),

];
const AccountPage = () => {
  return (
    <div className="account_info">
      <div className="account_info-row">
        <Breadcrumb name="Tài khoản" />
      </div>
      <div className="account_info-row">
        <h4 className="account_info-heading">Tài Khoản</h4>
      </div>
      <div className="account_info-row">
        <div className="account_info-col col_1">
          <Menu 
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={items}
          />
        </div>
        <div className="account_info-col col_2">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
