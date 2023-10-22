import React, { FC } from "react";
import "../../assets/scss/page/account.scss";
import { useState } from "react";
import { Link } from "react-router-dom";

type PurchaseItem = {
  id: number;
  name: string;
  phone: string;
  address: string;
  products: string[];
  price: number[];
};

type BookingItem = {
  id: number;
  customerInfo: string;
  petType: string;
  serviceType: string;
  staff: string;
  room: string;
  shift: string;
  time: string;
  status: string;
};

const Historyfollow: FC = () => { 
  const [bookingHistory, setBookingHistory] =
    useState<BookingItem[]>(bookingHistoryDB);
  

  const confirmDelete = (id: number) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa không?")) {
      const updatedData = bookingHistory.filter((item) => item.id !== id);
      setBookingHistory(updatedData);
      alert("Xóa thành công");
    }
  };

  return (
    <div>
      <div className="col_2-heading">
        <h4>Lịch sử mua hàng & theo dõi đơn hàng</h4>
      </div>
      <form action="" className="col_2-form">
        <div className="account_email">
          <label>Lịch sử mua hàng</label>
          <table className="table">
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên người mua</th>
                <th>Sdt</th>
                <th>Địa chỉ</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {purchaseHistory.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.phone}</td>
                  <td>{item.address}</td>
                  <td>
                    <Link
                      to={""}
                      className="chitiet"
                      
                    >
                      Chi tiết
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <br />
          <label>Lịch sử đặt lịch</label>
          <table className="table">
            <thead>
              <tr>
                <th>STT</th>
                <th>Thông tin người đặt</th>
                <th>Loại thú cưng</th>
                <th>Loại dịch vụ</th>
                <th>Nhân viên thực hiện</th>
                <th>Phòng</th>
                <th>Ca</th>
                <th>Thời gian đặt</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {bookingHistory.map((item, index) => (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.customerInfo}</td>
                  <td>{item.petType}</td>
                  <td>{item.serviceType}</td>
                  <td>{item.staff}</td>
                  <td>{item.room}</td>
                  <td>{item.shift}</td>
                  <td>{item.time}</td>
                  <td>{item.status}</td>
                  <td>
                    <button onClick={() => confirmDelete(item.id)}>Hủy</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </form>
    </div>
  );
};

export default Historyfollow;

const purchaseHistory = [
  {
    id: 1,
    name: "Trần Văn Duy",
    phone: "0123456789",
    address: "Nam Định",
    products: ["Cát", "Sỏi", "Đá"],
    price: [100, 200, 300],
  },
  {
    id: 2,
    name: "Trần Văn Duy 1",
    phone: "01234567891",
    address: "Nam Định 1",
    products: ["Cát", "Sỏi", "Đá"],
    price: [100, 200, 300],
  },
];
const bookingHistoryDB = [
  {
    id: 1,
    customerInfo: "Trần Văn Duy",
    petType: "Chó",
    serviceType: "Tắm",
    staff: "Nhân viên 1",
    room: "Phòng vip",
    shift: "Ca 1",
    time: "Thời gian 1",
    status: "Chờ xử lý",
  },
  {
    id: 2,
    customerInfo: "Trần Văn Duy 2",
    petType: "Mèo",
    serviceType: "Tỉa lông",
    staff: "Nhân viên 2",
    room: "Phòng thường",
    shift: "Ca 2",
    time: "Thời gian 2",
    status: "Chờ xử lý",
  },
];
