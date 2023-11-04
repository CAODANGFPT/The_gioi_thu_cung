import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Upload, UploadFile, message } from "antd";
import { useState } from "react";
import "../../assets/scss/page/account.scss";
import { useGetUserQuery } from "../../services/user";
export const Account = () => {
  const [loading, setLoading] = useState(false);
  const { data: user } = useGetUserQuery();
  if (user) {
    console.log(user);
  }

  const image: string =
    "https://res.cloudinary.com/dksgvucji/image/upload/v1699086188/duantotnghiep/ux6huuf7jf5ot4vqxvlj.jpg";
  return (
    <div>
      <div className="col_2-heading">
        <h4>Hồ sơ</h4>
      </div>
      <div className="profile">
        <div className="profile-tile">
          <div className="avatar-container">
            <img src={image} className="avatar" alt="user" />
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
            <button type="submit" className="btn btn-edit">
              Cập nhật thông tin
            </button>
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
