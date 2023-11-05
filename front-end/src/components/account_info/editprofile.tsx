// EditProfile.tsx
import React, { useState, ChangeEvent, useEffect } from "react";
import { Modal, Input, Radio, Button } from "antd";
import { TAccountEdit } from "../../schema/accountSchema";
import { RadioChangeEvent } from "antd/lib/radio/interface";

interface EditProfileProps {
  user: TAccountEdit;
}

const EditProfile: React.FC<EditProfileProps> = ({ user }) => {
  const [editedUser, setEditedUser] = useState<TAccountEdit>({ ...user });
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSave = () => {
    setIsModalVisible(false);
    // Gửi dữ liệu đã chỉnh sửa lên máy chủ hoặc xử lý dữ liệu tại đây
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement> | RadioChangeEvent
  ) => {
    if ("name" in e.target) {
      const { name, value } = e.target as HTMLInputElement;
      setEditedUser((prevUser) => ({
        ...prevUser,
        [name]:
          name === "phone" || name === "gender" ? parseInt(value, 10) : value,
      }));
    }
  };

  return (
    <div>
      <Button type="primary" onClick={showModal} className="btn btn-edit">
        Cập nhật thông tin
      </Button>
      <Modal
        title="Cập nhật thông tin"
        visible={isModalVisible}
        onOk={handleSave}
        onCancel={handleCancel}
      >
        <div className="info">
          <div className="col-title text-secondary">Họ và tên:</div>
          <Input
            type="text"
            name="name"
            value={editedUser.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="info">
          <div className="col-title text-secondary">Số Điện Thoại:</div>
          <Input
            type="text"
            name="phone"
            value={editedUser.phone}
            onChange={handleInputChange}
          />
        </div>
        <div className="info">
          <div className="col-title text-secondary">Email:</div>
          <Input
            type="email"
            name="email"
            value={editedUser.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="info">
          <div className="col-title text-secondary">Giới tính:</div>
          <Radio.Group onChange={handleInputChange} value={editedUser.gender}>
            <Radio value={1}>Nam</Radio>
            <Radio value={2}>Nữ</Radio>
          </Radio.Group>
        </div>
      </Modal>
    </div>
  );
};

export default EditProfile;
