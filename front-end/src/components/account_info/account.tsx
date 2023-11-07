import "../../assets/scss/page/account.scss";
import { useGetUserQuery } from "../../services/user";
import { FC, useState } from "react";
import ModalResetPassword from "../modal/resetPassword";

export const Account: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: user } = useGetUserQuery();
  const showModal = () => {
    setIsModalOpen(true);
  };
  return (
    <>
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
            <div className="fullname">{user?.name}</div>

            <div className="info">
              <div className="col-title text-secondary">Số điện thoại:</div>
              <div className="col-info ml-2">{user?.phone}</div>
            </div>
            <div className="info">
              <div className="col-title text-secondary">Email:</div>
              <div className="col-info ml-2">{user?.email}</div>
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
            <button type="submit" className="btn btn-edit" onClick={showModal}>
              Đổi mật khẩu
            </button>
            <ModalResetPassword
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              idUser={Number(user?.id)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;
