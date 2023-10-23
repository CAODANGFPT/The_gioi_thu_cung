import React from "react";
import { Button, Popconfirm, Table, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";

interface RoleType {
  key: string;
  name: string;
}
const confirm = () => {
  message.success("Xóa thành công.");
};

const cancel = () => {
  message.error("Xóa không thành công.");
};

const columns: ColumnsType<RoleType> = [
  {
    title: "ID",
    dataIndex: "key",
    key: "key",
  },
  {
    title: "Vai trò",
    dataIndex: "name",
    key: "name",
    render: (text) => <div>{text}</div>,
  },
  {
    title: "Thao tác",
    key: "action",
    render: (text) => (
      <div>
        <Link to="URL">
          <Button className="btn-edit" style={{ marginRight: "1rem" }}>
            Sửa
          </Button>
        </Link>
        <Popconfirm
          title="Xóa vai trò."
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

const data: RoleType[] = [
  {
    key: "1",
    name: "ADMIN",
  },
  {
    key: "2",
    name: "MEMBER",
  },
  {
    key: "3",
    name: "STAFF",
  },
];

const RoleAdmin: React.FC = () => <Table columns={columns} dataSource={data} />;

export default RoleAdmin;
