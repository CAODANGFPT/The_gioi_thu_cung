import React, { FC } from "react";
import "../../assets/scss/page/account.scss";
import { useState } from "react";
import { Link } from "react-router-dom";

type PurchaseItem = {
  id: number;
  name: string;
  phone: string;
  address: string;
  products: {
    id: number;
    name: string;
    price: number;
    soluong: number;
  }[];
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

const History: FC = () => {
  const [bookingHistory, setBookingHistory] =
    useState<BookingItem[]>(bookingHistoryDB);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<PurchaseItem>();
  const [bookingItem, setBookingItem] = useState<BookingItem>();

  const handleChiTietClick = (item: PurchaseItem) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleChiTietClickBook = (item: BookingItem) => {
    setBookingItem(item);
    setShowModal(true);
  };
  const handleModalClose = () => {
    setShowModal(false);
    setSelectedItem(undefined);
    setBookingItem(undefined);
  };

  let totalSum = 0;
  const confirmDelete = (id: number) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa không?")) {
      const updatedData = bookingHistory.filter((item) => item.id !== id);
      setBookingHistory(updatedData);
      alert("Xóa thành công");
    }
  };

  return (
    <>
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
                        onClick={() => handleChiTietClick(item)}
                      >
                        Chi tiết
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {showModal && selectedItem && (
              <div className="modal">
                <div className="modal-content">
                  <span
                    className="close"
                    onClick={() => handleModalClose()}
                    style={{ cursor: "pointer" }}
                  >
                    &times;
                  </span>

                  <table>
                    <thead>
                      <tr>
                        <th>Sản Phẩm đã mua</th>
                        <th>Giá tiền từng sản phẩm</th>
                        <th>Số Lượng</th>
                        <th>Tổng giá sản phẩm</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedItem.products.map((item) => {
                        const totalPrice = item.price * item.soluong;
                        totalSum += totalPrice;

                        return (
                          <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td>x{item.soluong}</td>
                            <td>{totalPrice}</td>
                          </tr>
                        );
                      })}
                      <tr className="done_pay">
                        <td>Thành tiền</td>
                        <td></td>
                        <td></td>
                        <td>{totalSum}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            <br />
            <label>Lịch sử đặt lịch</label>
            <div className="container-table">
              <div className="datlich">
                <table>
                  <thead>
                    <tr>
                      <th>STT</th>
                      <th>Thông tin người đặt</th>
                      <th>Loại thú cưng</th>
                      <th>Nhân viên thực hiện</th>
                      <th>Phòng</th>
                      <th>Trạng thái</th>
                      <th>Thao tác</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookingHistory.map((item) => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.customerInfo}</td>
                        <td>{item.petType}</td>
                        <td>{item.staff}</td>
                        <td>{item.room}</td>
                        <td>{item.status}</td>
                        <td>
                          <button onClick={() => confirmDelete(item.id)}>
                            Hủy
                          </button>
                        </td>
                        <td>
                          <Link
                            to={""}
                            className="chitiet"
                            onClick={() => handleChiTietClickBook(item)}
                          >
                            Chi tiết
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {showModal && bookingItem && (
              <div className="modal_history">
                <div className="modal-content-history">
                  <span
                    className="close"
                    onClick={() => handleModalClose()}
                    style={{ cursor: "pointer" }}
                  >
                    &times;
                  </span>
                  <ul>
                      <li>
                        <p className="title">Stt</p>
                        <p className="value">{bookingItem.id}</p>
                      </li>
                      <li>
                        <p className="title">Thông tin người đặt</p>
                        <p className="value">{bookingItem.customerInfo}</p>
                      </li>
                      <li>
                        <p className="title">Loại dịch vụ</p>
                        <p className="value">{bookingItem.serviceType}</p>
                      </li>
                      <li>
                        <p className="title">Nhân viên thực hiện</p>
                        <p className="value">{bookingItem.staff}</p>
                      </li>
                      <li>
                        <p className="title">Phòng</p>
                        <p className="value">{bookingItem.room}</p>
                      </li>
                      <li>
                        <p className="title">Ca</p>
                        <p className="value">{bookingItem.shift}</p>
                      </li>
                      <li>
                        <p className="title">Thời gian đặt</p>
                        <p className="value">{bookingItem.time}</p>
                      </li>
                      <li>
                        <p className="title">Trạng thái</p>
                        <p className="value">{bookingItem.status}</p>
                      </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
      {showModal && (
        <div
          onClick={() => {
            handleModalClose();
          }}
          className="background"
        />
      )}
    </>
  );
};

export default History;

const purchaseHistory = [
  {
    id: 1,
    name: "Trần Văn Duy",
    phone: "0123456789",
    address: "Nam Định",
    products: [
      {
        id: 1,
        name: "Cát mèo",
        price: 1000,
        soluong: 1,
      },
      {
        id: 2,
        name: "Thức ăn",
        price: 2000,
        soluong: 1,
      },
      {
        id: 3,
        name: "Chổi chơi ",
        price: 1500,
        soluong: 1,
      },
      {
        id: 1,
        name: "Cát mèo",
        price: 1000,
        soluong: 1,
      },
      {
        id: 2,
        name: "Thức ăn",
        price: 2000,
        soluong: 1,
      },
      {
        id: 3,
        name: "Chổi chơi ",
        price: 1500,
        soluong: 1,
      },
      {
        id: 1,
        name: "Cát mèo",
        price: 1000,
        soluong: 1,
      },
      {
        id: 2,
        name: "Thức ăn",
        price: 2000,
        soluong: 1,
      },
      {
        id: 3,
        name: "Chổi chơi ",
        price: 1500,
        soluong: 1,
      },
      {
        id: 1,
        name: "Cát mèo",
        price: 1000,
        soluong: 1,
      },
      {
        id: 2,
        name: "Thức ăn",
        price: 2000,
        soluong: 1,
      },
      {
        id: 3,
        name: "Chổi chơi ",
        price: 1500,
        soluong: 1,
      },
    ],
  },
  {
    id: 2,
    name: "Trần Văn Duy 1",
    phone: "01234567891",
    address: "Nam Định 1",
    products: [
      {
        id: 2,
        name: "Thức ăn",
        price: 200,
        soluong: 1,
      },
    ],
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
