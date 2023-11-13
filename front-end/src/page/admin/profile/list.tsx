import { Button, Popconfirm, message, Image } from "antd";
import type { ColumnsType } from "antd/es/table";
import React from "react";
import { Link } from "react-router-dom";
import TableAdmin from "../../../components/table";
import { TProfile } from "../../../schema/profile";
import {
  useProfileQuery,
  useRemoveProfileMutation,
} from "../../../services/profile";
const ProfileAdmin: React.FC = () => {
  const [removeProfile] = useRemoveProfileMutation();
  const confirm = (id: number) => {
    removeProfile(id)
      .then((response: any) => {
        if (response.error) {
          message.error("Bạn không thể xóa vì có liên quan khóa ngoại");
        } else {
          message.success("Xóa thành công.");
        }
      })
      .catch((error: any) => {
        message.error("Có lỗi xảy ra khi xóa.");
      });
  };

  const cancel = () => {
    message.error("Xóa không thành công.");
  };

  const columns: ColumnsType<TProfile> = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      fixed: "right",
      width: 50,
      render: (text, record, index) => index + 1,
    },
    {
      title: "Avata",
      dataIndex: "logo",
      key: "logo",
      width: 150,
      render: (logo) => <Image width={100} src={logo} />,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 150,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      width: 150,
    },
    {
      title: "Facebook",
      dataIndex: "fb",
      key: "fb",
      width: 150,
    },
    {
      title: "Thao tác",
      key: "action",
      width: 100,
      render: (profile: TProfile) => (
        <div>
          <Link to="URL">
            <Button className="btn-edit" style={{ marginRight: "1rem" }}>
              Sửa
            </Button>
          </Link>
          <Popconfirm
            title="Xóa trạng thái."
            description="Bạn có muốn xóa không?"
            onConfirm={() =>
              profile.id !== undefined ? confirm(profile.id) : undefined
            }
            onCancel={cancel}
            okText="Đồng ý"
            cancelText="Không"
          >
            <Button danger className="btn-delete">
              Xóa
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const { data } = useProfileQuery();
  return <TableAdmin columns={columns} data={data} />;
};

export default ProfileAdmin;
