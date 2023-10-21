import React from "react";
import "../../assets/scss/layout/account.scss";

const Historyfollow = () => {
  return (
    <div>
      <div className="col_2-heading">
        <h4>Lịch sử mua hàng & theo dõi đơn hàng</h4>
      </div>
      <form action="" className="col_2-form">
        <div className="account_email">
          <label>Lịch sử mua hàng và theo dõi đơn hàng</label>
          <div className="col_2-input">
            <input type="text" id="email" className="col_2-input-email" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Historyfollow;
