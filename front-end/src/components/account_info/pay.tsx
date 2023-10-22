import React from "react";
import "../../assets/scss/page/account.scss";

const Pay = () => {
  return (
    <div>
      <div className="col_2-heading">
        <h4>Cài đặt thanh toán</h4>
      </div>
      <form action="" className="col_2-form">
        <div className="account_email">
          <label>Chọn hình thức thanh toán</label>
          <div className="col_2-input">
            <input type="text" id="email" className="col_2-input-email" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Pay;
