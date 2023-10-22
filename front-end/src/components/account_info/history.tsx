import React from "react";
import "../../assets/scss/page/account.scss";

const History = () => {
  return (
    <div>
      <div className="col_2-heading">
        <h4>Lịch sử mua hàng</h4>
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
                <th>Sp đã mua</th>
                <th>Giá trị từng đơn hàng</th>
                <th>Tổng giá trị đơn hàng</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Trần Văn Duy</td>
                <td>0123456789</td>
                <td>Nam Định</td>
                <td>
                  <select name="" id="">
                    <option value="">Cát</option>
                    <option value="">Mèo</option>
                  </select>
                </td>
                <td>1.000.000</td>
                <td>2.000.000</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Trần Văn Duy 1</td>
                <td>01234567891</td>
                <td>Nam Định 1 </td>
                <td>
                  <select name="" id="">
                    <option value="">Thức Ăn</option>
                    <option value="">Quần Áo</option>
                  </select>
                </td>
                <td>1.000.000</td>
                <td>3.000.000</td>
              </tr>
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
              <tr>
                <td>1</td>
                <td>Trần Văn Duy</td>
                <td>Chó</td>
                <td>Tắm</td>
                <td>Nhân viên 1</td>
                <td>Ca 1</td>
                <td>Phòng vip</td>
                <td>Thời gian 1</td>
                <td>Chờ xử lý</td>
                <td>
                  <button>Hủy</button>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>Trần Văn Duy 2</td>
                <td>Mèo</td>
                <td>Tỉa lông</td>
                <td>Nhân viên 2</td>
                <td>Ca 2</td>
                <td>Phòng thường</td>
                <td>Thời gian 2</td>
                <td>Chờ xử lý</td>
                <td>
                  <button>Hủy</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </form>
    </div>
  );
};

export default History;
