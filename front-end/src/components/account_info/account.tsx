import { useState } from "react";
import React from "react";
import "../../assets/scss/page/account.scss";


export const Account = () => {
  const [data, setData] = useState({
    name: "Duy",
    email: "duytvph19916@fpt.edu.vn",
    address: "Nam Định",
    password: "12345",
  });

  const handleEditClick = (fieldName: string) => {
    const inputElement = document.getElementById(fieldName) as HTMLInputElement;
    if (inputElement) {
      inputElement.disabled = false;
      inputElement.focus();
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const newValue = e.target.value;
    const newData = { ...data, [field]: newValue };
    setData(newData);
    console.log(newValue);
  };
  return (
    <div>
      <div className="col_2-heading">
        <h4>Thông tin đăng nhập</h4>
      </div>
      <form action="" className="col_2-form">
        <div className="account_email">
          <label>Email</label>
          <div className="col_2-input">
            <input
              type="text"
              id="email"
              className="col_2-input-email"
                value={data.email}
                onChange={(e) => handleInputChange(e, "email")}
            />
            <div className="col_2-input-edit">
              <a href="#!" onClick={() => handleEditClick("email")}>Edit</a>
            </div>
            <hr />
          </div>
        </div>
        <div className="account_password">
          <label>Password</label>
          <div className="col_2-input">
            <input
              type="password"
              id="password"
              className="col_2-input-password"
                value={data.password}
              onChange={(e) => handleInputChange(e, "password")}
            />
            <div className="col_2-input-edit">
              <a href="#!" onClick={() => handleEditClick("password")}>
                  Edit
                </a>
              {/* <a href="#!">Edit</a> */}
            </div>
            <hr />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Account;
