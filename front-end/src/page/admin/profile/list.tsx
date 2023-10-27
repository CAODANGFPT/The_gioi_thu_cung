import { Button, Popconfirm, message, Image } from "antd";
import type { ColumnsType } from "antd/es/table";
import React from "react";
import { Link } from "react-router-dom";
import TableAdmin from "../../../components/table";
import { TProfile } from "../../../schema/profile";
import { useProfileQuery } from "../../../services/profile";

const confirm = () => {
  message.success("Xóa thành công.");
};

const cancel = () => {
  message.error("Xóa không thành công.");
};

const columns: ColumnsType<TProfile> = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    width: 50,
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
    render: (id) => (
      <div>
        <Link to="URL">
          <Button className="btn-edit" style={{ marginRight: "1rem" }}>
            Sửa
          </Button>
        </Link>
        <Popconfirm
          title="Xóa trạng thái."
          description="Bạn có muốn xóa không?"
          onConfirm={confirm}
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

const ProfileAdmin: React.FC = () => {
  const { data, isLoading, refetch } = useProfileQuery();
  return <TableAdmin columns={columns} data={data} />;
};

export default ProfileAdmin;
