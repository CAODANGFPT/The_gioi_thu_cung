import React, { useState } from 'react';
import "../../assets/scss/page/account.scss";

const Address = () => {
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
      <h4>Địa chỉ đã lưu</h4>
    </div>
    <form action="" className="col_2-form">
      <div className="account_email">
        <label>Nơi ở</label>
        <div className="col_2-input">
          <input
            type="text"
            id="email"
            className="col_2-input-email"
            value={data.address}
            onChange={(e) => handleInputChange(e, "address")}
          />
          <div className="col_2-input-edit">
          <a href="#!" onClick={() => handleEditClick("address")}>Sửa</a>
          </div>
            <hr />
        </div>
      </div>
    </form>
  </div>
  )
}

export default Address