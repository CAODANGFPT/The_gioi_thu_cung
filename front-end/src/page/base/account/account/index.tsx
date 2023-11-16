import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import "../../../../assets/scss/page/account.scss";
import AddressCard from "../../../../assets/svg/account/AddressCard";
import Order from "../../../../assets/svg/account/Order";
import Payment from "../../../../assets/svg/account/Payment";
import Puchase from "../../../../assets/svg/account/Puchase";
import UserIcons from "../../../../assets/svg/account/User";
import Breadcrumb from "../../../../components/breadcrumb";
import { navigationLinksAccount } from "../../../../assets/data/data";

const AccountPage = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  const { pathname } = useLocation();

  useEffect(() => {
    const order = navigationLinksAccount.find(
      (item) => item.link === pathname.split("/")[2]
    );
    setActiveTab(order?.id || 1);
  }, [pathname]);

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
          <ul className="account_col-list">
            {navigationLinksAccount.map((item) => (
              <li className="account_col-item" key={item.id}>
                <Link
                  to={item.link}
                  className={`account_col-link ${
                    activeTab === item.id ? "active" : ""
                  }`}
                  onClick={() => handleTabClick(item.id)}
                >
                  <div className="icon">
                    <UserIcons />
                  </div>
                  {item.title}
                </Link>
              </li>
            ))}
            {/* <li className="account_col-item">
              <Link
                to="/account/payment"
                className={`account_col-link ${
                  activeTab === 2 ? "active" : ""
                }`}
                onClick={() => handleTabClick(2)}
              >
                <div className="icon">
                  <Payment />
                </div>
                Cài đặt thanh toán
              </Link>
            </li>
            <li className="account_col-item">
              <Link
                to="/account/history_follow"
                className={`account_col-link his_track ${
                  activeTab === 3 ? "active" : ""
                }`}
                onClick={() => handleTabClick(3)}
              >
                Lịch sử mua hàng & theo dõi đơn hàng
              </Link>
            </li> */}
          </ul>
        </div>
        <div className="account_info-col col_2">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
