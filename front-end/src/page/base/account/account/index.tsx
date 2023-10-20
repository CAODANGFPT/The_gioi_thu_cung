import "../../../../assets/scss/layout/account.scss";
import AddressCard from "../../../../assets/svg/account/AddressCard";
import Order from "../../../../assets/svg/account/Order";
import Payment from "../../../../assets/svg/account/Payment";
import Puchase from "../../../../assets/svg/account/Puchase";
import UserIcons from "../../../../assets/svg/account/User";

const AccountPage = () => {
  return (
    <div>
      <div className="container">
        <div className="account_info">
          <div className="account_info-row">
            <h4 className="account_info-heading">
              Tuan Bean's Acoount
              <a href="#" className="logout">
                (Logout)
              </a>
            </h4>
          </div>
          <div className="account_info-row">
            <div className="account_info-col col_1">
              <ul className="account_col-list">
                <li className="account_col-item">
                  <a href="#!" className="account_col-link">
                    <div className="icon">
                      <UserIcons />
                    </div>
                    Login information
                  </a>
                </li>
                <li className="account_col-item">
                  <a href="#!" className="account_col-link">
                    <div className="icon">
                      <AddressCard/>
                    </div>
                    Saved Addresses
                  </a>
                </li>
                <li className="account_col-item">
                  <a href="#!" className="account_col-link">
                    <div className="icon">
                      <Payment />
                    </div>
                    Payment Settings
                  </a>
                </li>
                <li className="account_col-item">
                  <a href="#!" className="account_col-link his_track">
                    Purchase History & Order Tracking
                  </a>
                </li>
                <li className="account_col-item">
                  <a href="#!" className="account_col-link history">
                    <div className="icon">
                      <Puchase />
                    </div>
                    Purchase History
                  </a>
                </li>
                <li className="account_col-item">
                  <a href="#!" className="account_col-link tracking">
                    <div className="icon">
                      <Order />
                    </div>
                    Order Tracking
                  </a>
                </li>
              </ul>
            </div>
            <div className="account_info-col col_2">
              <div className="col_2-heading">
                <h4>Login infomation</h4>
              </div>
              <form action="" className="col_2-form">
                <div className="account_email">
                  <label>Email</label>
                  <div className="col_2-input">
                    <input
                      type="text"
                      id="email"
                      className="col_2-input-email"
                    />
                    <div className="col_2-input-edit">
                      <a href="#!">Edit</a>
                    </div>
                  </div>
                </div>

                <div className="account_password">
                  <label>Password</label>
                  <div className="col_2-input">
                    <input
                      type="password"
                      id="password"
                      className="col_2-input-password"
                    />
                    <div className="col_2-input-edit">
                      <a href="#!">Edit</a>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
