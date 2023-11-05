import { useState } from "react";
import "../../assets/scss/page/account.scss";
import { useGetUserQuery } from "../../services/user";

import EditProfile from "./editprofile";
export const Account = () => {
  const { data: user } = useGetUserQuery();

  const [editedUser, setEditedUser] = useState({
    // Giá trị mặc định hoặc thay bằng giá trị user.id
    name: "",
    email: "",
    phone: "",
    gender: 0,
  });

  return (
    <div>
      <div className="col_2-heading">
        <h4>Hồ sơ</h4>
      </div>
      <div className="profile">
        <div className="profile-tile">
          <div className="avatar-container">
            <img src={user?.img && user.img} className="avatar" alt="user" />
            <i className="fa fa-2x fa-camera img-upload" aria-hidden="true"></i>
          </div>

          <div className="profile-detail">
            <div className="fullname">{user?.name && user.name}</div>

            <div className="info">
              <div className="col-title text-secondary">Số điện thoại:</div>
              <div className="col-info ml-2">{user?.phone && user.phone}</div>
            </div>
            <div className="info">
              <div className="col-title text-secondary">Email:</div>
              <div className="col-info ml-2">{user?.email && user.email}</div>
            </div>
            <div className="info">
              <div className="col-title text-secondary">Giới tính:</div>
              <div className="col-info ml-2">
                <div>{user?.gender === 1 && "Nam"}</div>
                <div>{user?.gender === 2 && "Nữ"}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="profile-edit">
          <div>
            <div>
              <EditProfile user={editedUser} />
            </div>
          </div>
          <div>
            <button type="submit" className="btn btn-edit">
              Đổi mật khẩu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
