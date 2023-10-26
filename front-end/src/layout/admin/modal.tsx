import React from "react";
import "../../assets/scss/layout/admin/modal.scss";
import UserIcon from "../../assets/svg/userIcon";
import GearsIcon from "../../assets/svg/gearsIcon";
import LogoutIcon from "../../assets/svg/logOut";

type Props = {};

const ModalUser = (props: Props) => {
  return (
    <div className="model-user">
      <div className="model-user-title">
        <div className="model-user-title-image">
          <img
            src="https://sneat-vuetify-admin-template.vercel.app/assets/avatar-1-19a9226d.png"
            alt=""
          />
        </div>
        <div className="model-user-title-text">
          <div className="name">John Doe</div>
          <div className="role">Quản trị viên</div>
        </div>
      </div>
      <hr />
      <div className="model-user-content">
        <div className="model-user-content-item">
          <div>
            <UserIcon />
          </div>
          <div>Hồ sơ</div>
        </div>
      </div>
      <hr />
      <div className="model-user-logout">
        <div>
          <LogoutIcon />
        </div>
        <div>Đăng xuất</div>
      </div>
    </div>
  );
};

export default ModalUser;