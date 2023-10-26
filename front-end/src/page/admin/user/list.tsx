import { Button, Popconfirm, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import React from "react";
import { Link } from "react-router-dom";
import TableAdmin from "../../../components/table";
import { TStatus } from "../../../schema/status";
import { useStatusQuery } from "../../../services/status";
import { useUserQuery } from "../../../services/user";

const confirm = () => {
  message.success("Xóa thành công.");
};

const cancel = () => {
  message.error("Xóa không thành công.");
};

const columns: ColumnsType<TStatus> = [
  {
    title: "TT",
    dataIndex: "id",
    key: "id",
    width: 150,
  },
  {
    title: "Tên",
    dataIndex: "name",
    key: "name",
    width: 150,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    width: 150,
  },
  {
    title: "Ảnh",
    dataIndex: "img",
    key: "img",
    width: 150,
  },
  {
    title: "SĐT",
    dataIndex: "phone",
    key: "phone",
    width: 150,
  },
  {
    title: "Địa chỉ",
    dataIndex: "address",
    key: "address",
    width: 150,
  },
  {
    title: "Vai trò",
    dataIndex: "nameRole",
    key: "nameRole",
    width: 150,
  },
  {
    title: "Thao tác",
    key: "action",
    width: 100,
    render: (id) => (
      <div>
        <Popconfirm
          title="Xóa trạng thái."
          description="Bạn có muốn xóa không?"
          onConfirm={confirm}
          onCancel={cancel}
          okText="Đồng ý"
          cancelText="Không"
        >
          <Button danger className="btn-delete">
            Khóa
          </Button>
        </Popconfirm>
      </div>
    ),
  },
];

const UserAdmin: React.FC = () => {
  const { data, isLoading, refetch } = useUserQuery();
  return <TableAdmin columns={columns} data={data} />;
};

export default UserAdmin;
