import { useState } from "react";
import "../../../../assets/scss/layout/account.scss";
import AddressCard from "../../../../assets/svg/account/AddressCard";
import Order from "../../../../assets/svg/account/Order";
import Payment from "../../../../assets/svg/account/Payment";
import Puchase from "../../../../assets/svg/account/Puchase";
import UserIcons from "../../../../assets/svg/account/User";
import Breadcrumb from "../../../../components/breadcrumb";
import { Link, Outlet } from "react-router-dom";

const AccountPage = () => {
  const [data, setData] = useState({
    name: "Duy",
    email: "duytvph19916@fpt.edu.vn",
    address: "Nam Định",
    password: "12345",
  });

  const [activeTab, setActiveTab] = useState<number>(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };
  return (
    <div className="container">
      <div className="account_info">
        <Breadcrumb name="Tài khoản" />
        <div className="account_info-row">
          <h4 className="account_info-heading">
            Tài Khoản {data.name}
            <a href="#" className="logout">
              (Logout)
            </a>
          </h4>
        </div>
        <div className="account_info-row">
          <div className="account_info-col col_1">
            <ul className="account_col-list">
              <li className="account_col-item">
                <Link
                  to="/account"
                  className={`account_col-link ${
                    activeTab === 0 ? "active" : ""
                  }`}
                  onClick={() => handleTabClick(0)}
                >
                  <div className="icon">
                    <UserIcons/>
                  </div>
                  Thông tin đăng nhập
                </Link>
              </li>
              <li className="account_col-item">
                <Link
                  to="/account/address"
                  className={`account_col-link ${
                    activeTab === 1 ? "active" : ""
                  }`}
                  onClick={() => handleTabClick(1)}
                >
                  <div className="icon">
                    <AddressCard/>
                  </div>
                  Địa chỉ đã lưu
                </Link>
              </li>
              <li className="account_col-item">
                <Link
                  to="/account/payment"
                  className={`account_col-link ${
                    activeTab === 2 ? "active" : ""
                  }`}
                  onClick={() => handleTabClick(2)}
                >
                  <div className="icon">
                    <Payment/>
                  </div>
                  Cài đặt thanh toán
                </Link>
              </li>
              <li className="account_col-item">
                <Link
                  to="/account/his_follow"
                  className={`account_col-link his_track ${
                    activeTab === 3 ? "active" : ""
                  }`}
                  onClick={() => handleTabClick(3)}
                >
                  Lịch sử mua hàng & theo dõi đơn hàng
                </Link>
              </li>
              <li className="account_col-item">
                <Link
                  to="/account/history"
                  className={`account_col-link history_table ${
                    activeTab === 4 ? "active" : ""
                  }`}
                  onClick={() => handleTabClick(4)}
                >
                  Lịch sử mua hàng 
                </Link>
              </li>
              <li className="account_col-item">
                <Link
                  to="/account/follow"
                  className={`account_col-link tracking_table ${
                    activeTab === 5 ? "active" : ""
                  }`}
                  onClick={() => handleTabClick(5)}
                >
                  Theo dõi đơn hàng 
                </Link>
              </li>
              <li className="account_col-item">
                <Link
                  to="/account/history"
                  className={`account_col-link history ${
                    activeTab === 4 ? "active" : ""
                  }`}
                  onClick={() => handleTabClick(4)}
                >
                  <div className="icon">
                    <Puchase/>
                  </div>
                  Lịch sử mua hàng 
                </Link>
              </li>
              <li className="account_col-item">
              <Link
                  to="/account/follow"
                  className={`account_col-link tracking ${
                    activeTab === 5 ? "active" : ""
                  }`}
                  onClick={() => handleTabClick(5)}
                >
                  <div className="icon">
                  <Order/>
                  </div>
                  Theo dõi đơn hàng 
                </Link>
              </li>
            </ul>
          </div>

          <div className="account_info-col col_2">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
